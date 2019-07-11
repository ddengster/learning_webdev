package main

import (
  "fmt"
  "net/http"
  "crypto/rsa"
  "log"
  "io/ioutil"
  "github.com/dgrijalva/jwt-go"
  "time"
  "strings"
  "encoding/json"
)


var privKeyPath = "./keys/app.rsa"  //openssl genrsa -out app.rsa keysize
var pubKeyPath = "./keys/app.rsa.pub"   //openssl rsa -in app.rsa -pubout > app.rsa.pub
var privKeyBytes, pubKeyBytes []byte
var privKey *rsa.PrivateKey
var pubKey *rsa.PublicKey

type Response struct {
	Data	string	`json:"data"`
}
type Token struct {
	Token 	string    `json:"token"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
  //headers to keep firefox happy
  headers := w.Header()
  headers.Add("Access-Control-Allow-Origin", "http://localhost:8080") 
  headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
  headers.Add("Access-Control-Allow-Credentials", "true")
  headers.Add("Access-Control-Allow-Methods", "POST,OPTIONS")
  headers.Add("Vary", "Origin")
  headers.Add("Vary", "Access-Control-Request-Method")
  headers.Add("Vary", "Access-Control-Request-Headers")
  if (r.Method == "OPTIONS") {
      //to keep firefox happy
      //handle preflight in here
      log.Print("preflight detected: ", r.Header)
      w.WriteHeader(http.StatusOK)
      return
  } else if (r.Method != "POST") {
      w.WriteHeader(http.StatusBadRequest)
      return
  }
  if (r.Header.Get("Content-Type") != "application/json") {
      w.WriteHeader(http.StatusBadRequest)
      return
  }

  body, _ := ioutil.ReadAll(r.Body)
  //log.Printf("%s", body)
  //log.Printf("%T", body)
  
  var cred map[string]interface{}
  
  err := json.Unmarshal(body, &cred)
  if (err != nil) {
    w.WriteHeader(http.StatusForbidden)
    log.Printf("login failed")
    return
  }
  
  var username = cred["username"].(string)
  var pass = cred["password"].(string)
  //fmt.Printf("%s %s\n", cred["username"], cred["password"])

  //validation of user credentials. todo: Use record with database, and bcrypt the password with salt
	if (strings.ToLower(username) != "asd" || pass != "asd123") {
    w.WriteHeader(http.StatusForbidden)
    fmt.Println("Error logging in for user: ", username)
    fmt.Fprint(w, "Invalid credentials")
    return
  }
  
  //setup some data to be signed as our jwt
  signer := jwt.New(jwt.GetSigningMethod("RS256"))
  signer.Claims = jwt.MapClaims {
    "iss": "admin",
    "exp": time.Now().Add(time.Minute * 120).Unix(), //expiry
    "iat": time.Now().Unix(),
    "custom": struct {
      name string
      role string
    } {username, "member"},  //make a new struct and initialize it with the inputs in this line
  }
  
  tokenString, err := signer.SignedString(privKey)
  if (err != nil) {
    w.WriteHeader(http.StatusInternalServerError)
    log.Printf("error signing: %v", err)
    return
  }
  
  //@reference: all about cookies https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
  http.SetCookie(w, &http.Cookie{
      Name:       "AccessToken",
      Value:      tokenString,
      Path:       "/",
      RawExpires: "0",
      //Secure: true, //enable this to ensure the cookie is sent over only https
      HttpOnly: true, 
    })
  w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)

  fmt.Println("Logging successful for user: ", username)
  fmt.Println("\n", w)
}


func RestrictedHandler(w http.ResponseWriter, r *http.Request) {
  //headers to keep firefox happy
  headers := w.Header()
  headers.Add("Access-Control-Allow-Origin", "http://localhost:8080") 
  headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
  headers.Add("Access-Control-Allow-Methods", "GET,OPTIONS")
  headers.Add("Access-Control-Allow-Credentials", "true")
  headers.Add("Vary", "Origin")
  headers.Add("Vary", "Access-Control-Request-Method")
  headers.Add("Vary", "Access-Control-Request-Headers")
  if (r.Method == "OPTIONS") {
      //to keep firefox happy
      //handle preflight in here
      log.Print("preflight detected: ", r.Header)
      w.WriteHeader(http.StatusOK)
      return
  }
  
  // check if we have a cookie with out tokenName
	tokenCookie, err := r.Cookie("AccessToken")
	switch {
	case err == http.ErrNoCookie:
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Println(w, "No Token, no fun!")
		return
	case err != nil:
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(w, "Error while Parsing cookie!")
		log.Printf("Cookie parse error: %v\n", err)
		return
  }
  
  // just for the lulz, check if it is empty.. should fail on Parse anyway..
	if (tokenCookie.Value == "") {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

  // validate the token
	token, err := jwt.Parse(tokenCookie.Value, func(token *jwt.Token) (interface{}, error) {
		return pubKey, nil
  })
  
  // branch out into the possible error from signing
	switch err.(type) {

	case nil: // no error
		if (!token.Valid) { // but may still be invalid
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintln(w, "Invalid token")
			return
		}

		// see stdout and watch for the CustomUserInfo, nicely unmarshalled
		log.Printf("Someone accessed resricted area! Token:%+v\n", token)
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(http.StatusOK)
		//fmt.Fprintln(w, restrictedHtml)
    fmt.Fprintln(w, "HERE IS YOUR RESTRICTED DATA")
    var s = token.Claims.(jwt.MapClaims)["iss"]
    
    log.Printf("token issuer: %s\n", s)

	case *jwt.ValidationError: // cant do if (err.(type) == *jwt.ValidationError), golang doesnt allow it
		vErr := err.(*jwt.ValidationError)

		switch vErr.Errors {
		case jwt.ValidationErrorExpired:
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintln(w, "Token Expired, get a new one.")
			return

		default:
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintln(w, "Error while Parsing Token!")
			log.Printf("ValidationError error: %+v\n", vErr.Errors)
			return
		}

	default: // something else went wrong
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, "Error while Parsing Token!")
		log.Printf("Token parse error: %v\n", err)
		return
  }
}

func main() {
	fmt.Printf("backend init..\n")
  
  privkeyBytes, err := ioutil.ReadFile(privKeyPath)
  if (err != nil) {
    log.Fatal("error reading private key")
    return
  }
  privKey, err = jwt.ParseRSAPrivateKeyFromPEM(privkeyBytes)
  if (err != nil) {
    log.Fatal("error parsing private key")
    return
  }
  
  pubkeyBytes, err := ioutil.ReadFile(pubKeyPath)
  if (err != nil) {
    log.Fatal("error reading public key")
    return
  }
  pubKey, err = jwt.ParseRSAPublicKeyFromPEM(pubkeyBytes)
  if (err != nil) {
    log.Fatal("error parsing public key")
    return
  }
  
  //fmt.Printf("%s\n", privkeyBytes)
  //fmt.Printf("%s\n", pubkeyBytes)
  
  //start http server, be sure to put it behind ssl
  http.HandleFunc("/login", LoginHandler)
  http.HandleFunc("/restricted", RestrictedHandler)
  
  fmt.Printf("starting server..\n")
  http.ListenAndServe(":7500", nil)
}
