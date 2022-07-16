

window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');


  // Create a new WebSocket.
  //var socket = new WebSocket('ws://echo.websocket.org');
  //var socket = new WebSocket('ws://ipaddress:port/');


  // Handle any errors that occur.
  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
  };


  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
    socketStatus.className = 'open';
  };


  // Handle messages sent by the server.
  socket.onmessage = function(event) {
    var message = event.data;
    messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
                               message + '</li>';
  };


  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Disconnected from WebSocket.';
    socketStatus.className = 'closed';
  };

  var count = 0;
  // Send a message when the form is submitted.
  form.onsubmit = function(e) {
    e.preventDefault();
/*
    // Retrieve the message from the textarea.
    var message = messageField.value;

    // Send the message through the WebSocket.
    socket.send(message);
*/
	var message;
	if (count == 0)
	{
		
		message = JSON.stringify({"method":"server.auth","params":["Bearer eyJ<copypaste bearer token here>","web"],"id":51952});
		
		//userid 2
		/*message = JSON.stringify({"method":"server.auth","params":["Bearer eyJ<copypaste bearer token here>","web"],"id":33951});*/
		socket.send(message);
	}
	else if (count == 1)
	{
		//message = JSON.stringify({method:"kline.subscribe", params:["BTCBCH", 30], id:56}); //!working, gives you the price every 30s interval
		//message = JSON.stringify({method:"price.subscribe", params:["BTCBCH"], id:56}); //!working! should receive price.update when trades are made
		//message = JSON.stringify({method:"state.subscribe", params:["BTCBCH"], id:56}); //!working, gives you the low/highs, updates only when trades are made
		//message = JSON.stringify({method:"today.subscribe", params:["BTCBCH"], id:56});   //!working, updates only when trades are made
		//message = JSON.stringify({method:"deals.subscribe", params:["BTCBCH"], id:56}); //!working, initial update + more updates when trades are made
		//message = JSON.stringify({method:"depth.subscribe", params:["BTCBCH", 10, "0"], id:56}); //!working, interval is either "1" for unit interval, "0" for no interval (check http order.depth)
		//message = JSON.stringify({method:"order.subscribe", params:["BTCBCH"], id:56}); //!working, updates when a deal is made
		message = JSON.stringify({method:"asset.subscribe", params:["BTC"], id:56}); //!working, be sure to check the asset type! updates when asset type is added
		
		socket.send(message);
	}
	else //if (count == 2)
	{
		//message = JSON.stringify({method:"deals.update", params:["BTC"], id:56});
		//socket.send(message);
	}
	count = count + 1;
	
    // Add the message to the messages list.
    messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
                              '</li>';

    // Clear out the message field.
    messageField.value = '';
	

    return false;
  };


  // Close the WebSocket connection when the close button is clicked.
  closeBtn.onclick = function(e) {
    e.preventDefault();

    // Close the WebSocket.
    socket.close();

    return false;
  };

};
