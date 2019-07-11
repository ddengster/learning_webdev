Login/authentication project using vuejs for frontend and go backend for authentication
# Register page is unfinished.

Install:
https://cli.vuejs.org/guide/installation.html

Frontend:

Open up cmd line
Navigate to project directory
vue ui
in the browser, run Tasks -> serve -> Open App

Backend:

Open up cmd line
Navigate to project go backend src directory
create your ssl keys (check the source for the commands)
go build
go_backend_src.exe


Program FLOW:

VUEJS FLOW:
- start from public/index.html, vue detects <div id="app"></div>
- somewhere, there a <script> injected that calls new Vue({...})
- then router.js links to the Home Component
- The Home component then goes to ./views/Home.vue
- src/App.vue is attached, and ./views/Home.vue is attached

JWT authentication:
- JWT is created on the backend, and sent to the frontend as a Set-Cookie header. 
- The browser keeps the cookie (check WebDev Tools->Storage) due to the credentials: 'include' header.
- The browser also sends the cookie along for future requests to the same domain

For a next project, vue-auth would be a better choice.
