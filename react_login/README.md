# Making of

1. Run `npx create-react-app react_auth --template typescript` - makes the default react app template with typescript

1a. Flow starts from rendering the static webpage `index.html`, then upon reaching `<div id="root">` goes into `src/index.tsx`.

1b. In `index.tsx`, `<App />` references `App.tsx` which returns all the html code needed to render the page.

2. Create Login/Register/Forget.tsx components as pages; they return html with associated js code. (.tsx extension enables JSX, a templating language)

3. Add in a lambda with the same name as the component, then make it return your desired html rendering. Name this component `Login`. eg.

```
const Login = () => {
	console.log("asdsd");

	return (
    <div>
      <h1>asdasd</h1>
    </div>);
}

export default Login;

```

4. Decide on page routing. Add routing to App.tsx, which routes to the correct components. Also do `npm install react-router-dom`.

```
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
```

5. Run `npm start` to start the server on http://localhost:3000

6. A good flow to make sites: (1) Use static pages to replicate an outline, (2) decide on, hook up state and interactions, (3) prettify
See https://reactjs.org/docs/thinking-in-react.html

7. The current status of the project is that you route to the loging page, and after you login, it sets an "authenticated" key in and redirects you to the `/restricted` page where it prints 'RESTRICTED INFO HERE'

# 100. The React Code Flow and Metagame

- React renders static webpages through `ReactDOM.render(<components>)` once per refresh. Most dynamic interactions are done through pre-setup callbacks. https://reactjs.org/docs/state-and-lifecycle.html

- Since we run a program to each time, globals/statics in javascript might not persist between pages. Alternatives would be to use React Hooks, or `localStorage` or [JS Sessions](https://stackoverflow.com/questions/1981673/persist-javascript-variables-across-pages), note that all of them have different bindings and lifetimes.

101. React Hooks and state management

- Provides utilities to help persist states between components, web pages and while interacting with them. See https://reactjs.org/docs/hooks-intro.html

- Use `React.useState` in a component for persistent states while only using it in the component locally. 

- To propogate/update state throughout the component heirarchy, use  `React.useContext` along with `useState`, then provide scoped tags `<ContextName.Provider>` in your root `<App/>` tag and it will be passed down to child components. This is the closest thing to globals within the site's pages. https://reactjs.org/docs/context.html. Downsides are that the state disappears on page refreshes, and there's a good amount of boilerplate.
  
- If all else doesnt suit your needs, use localStorage or server side storage (per user), but beware of staleness of the data.

- You can store data in cookies, but it'll be sent every HTTP request. The recommended types of data to store are auth data(eg. jwt), and language settings.
https://en.wikipedia.org/wiki/HTTP_cookie

- Recommendations for state mgt: (zustand)[https://github.com/pmndrs/zustand] 

# 200. Prettifying with css

- Generally use div with style attribute https://stackoverflow.com/a/50796306. `<div>` causes a line break, use `<span>` otherwise. See http://learnwebdesignonline.com/span-div/ or https://www.youtube.com/watch?v=d2bzap43cNQ&list=PL4-IK0AVhVjM0xE0K2uZRvsM7LkIhsPT-&index=10

` <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}> `

- If you want items stacked/newlined, start with a parent div and add child divs.

- Use control-space to prop up intellisense on the options available!

- Then use css with the class attribute

- Use web developer tools 'Inspector' to see how your stuff is aligned. 

# 300. React Perf and server costs

- Define `NODE_ENV=production` to increase throughput https://malloc.fi/performance-cost-of-server-side-rendered-react-node-js

- Put `about:performance` in the url bar to see how much memory is being used by the tab.

## Sample Websites/Tutorials

1) Basic Informational Website with basic layout by Kevin Powell https://www.youtube.com/watch?v=TAJnJCry6_4&list=PL4-IK0AVhVjM0xE0K2uZRvsM7LkIhsPT-&index=22

2) React Admin Panel for SASS with control panel-like UI https://www.youtube.com/watch?v=aTPkos3LKi8

3) Comparison of webdev frameworks: https://www.youtube.com/watch?v=cuHDQhDhvPE
