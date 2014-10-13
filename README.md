Socket.IO-Example
=================
A simple example for demonstrating how to use and work with [socket.io](http://socket.io) alongside [AngularJS](http://angularjs.org/), [Node.JS](http://nodejs.org/), and [Express](http://expressjs.com/). 

##Getting Started
1. Clone or download this repository
2. Install [Node.JS](http://nodejs.org/) if you haven't already done so
3. Open a terminal/command prompt window into the Socket.IO-Example folder containing this repository
	- On Windows Vista and up, you can shift-right click on the folder and select `Open command window here`
4. (Optional) It is recommended that for development you run the server with [nodemon](http://nodemon.io/). To do so, run this command in the terminal window: `npm install -g nodemon`
5. In the terminal window inside the Socket.IO-Example folder, run: `npm install`. 
	- This command will look at the dependencies listed in the package.json file and automatically download them into a folder called `node_modules`. This is required for the server and site to work properly. 
6. In the terminal window within the same directory, go ahead and run `nodemon server.js` if you are using nodemon, or run `node server.js` if you are not using nodemon. This will start up the server.
	- If you encounter the error `listen EADDRINUSE`, this means that the server address on port 3000 is already in use. You can:
		- Close the process using port 3000
		- Edit `server.js` variable `portNum` on line 14 to be another value
7. With the server up and running, go ahead and open two or more browser windows (don't use tabs, the point of this is to be able to see multiple instances of this app at once). On each window's address bar, go to `localhost:` and type in the port number after the `:` colon.
	- Example with port number 3000 (default): [localhost:3000](http://localhost:3000)
8. The app should load on each page and the server terminal window should reflect the activity. 
9. Play around with it! Click on the checkboxes, colored boxes, or even change the tag count value. Watch as you change something in one window it will instantly change on all the other windows. This is the magic of [socket.io](http://socket.io)!

##Bonus
If you have multiple devices connected to the same network, i.e. if you have multiple computers or devices connected to the same router via LAN or Wifi, you can access this server too! To do so: 

1. Find the IPv4 address for the computer running the server
	1. On Windows, go to the start menu and type cmd.exe and press enter
	2. In the terminal window, run the command: `ipconfig`
	3. Look for your IPv4 Address
2. On another computer or device connected to the same network via LAN or Wifi, open a browser window and type that IPv4 address in the browser's address bar
3. If all worked correctly and the server is still running, you should have just loaded this app on another computer or mobile device! 

##Directory Structure

    .
    ├──README.md
    ├──package.json - describes this package and its dependencies
    ├──server.js - server code (JavaScript, Express, Socket.IO)
    ├──batch
    │    ├──README FIRST.txt - Explains the .bat files
    │    ├──Server Keepalive.bat
    │    └──Server Launcher.bat
    └──client
         ├──index.html - client code (HTML, CSS, JavaScript, AngularJS, Socket.IO)
         └──lib - libraries used to make this app work
