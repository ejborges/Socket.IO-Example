BATCH README


NEVER   execute 'Server Keepalive.bat' directly. 
ALWAYS right click on 'Server Keepalive.bat' and click on 'Run as administrator'
OR           follow the instructions in the SHORTCUT section below to make a shortuct for the bat file
DON'T     tell me I didn't warn you... ‎( ͡° ͜ʖ ͡°)



SERVER START ON SYSTEM BOOT
-----------------------------------------------------
To make the server run automatically on system boot, place a shortcut for Server Keepalive.bat inside Window's Startup folder. If that doesn't work, the internet is your friend. ( ͡~ ͜ʖ ͡°)
That shortcut should be set up to execute Server Keepalive.bat with administrator privileges. For that, check out the SHORTCUT section below.
To prevent the window 'User Account Control' from always popping up, make it appear by opening the shortcut with administrator privileges. 
Click on the blue link towards the bottom 'Change when these notifications appear' and move the slider all the way to the bottom to 'Never notify'. Then click OK. 



SHORTCUT
-----------------
If you want to make a shortcut to the batch files, right click on any batch file and click on 'Create shortcut'. Then right click on the new shortcut created and click on 'Properties'.
Make sure you're on the 'Shortcut' tab and click on 'Advanced...'. Finally, check the box that says: 'Run as administrator' and click 'Ok'.



DESCRIPTIONS
-----------------------
Server Keepalive is a batch file that makes sure our node server is always running. 
Every second, it checks to see if the process 'node.exe' is running. 
If it's running, take a break. Sit down, have a drink. It's been a long day.
If it's not running, then start the server. It does this pretty much the same way you would do it through the command line:   grunt runServer
THIS FILE MUST RUN WITH ADMINISTRATOR PRIVILEGES!!!

Server Launcher is a simpler process that just simply starts our server the same way you would do it through the command line.
If our server crashes hard and node.exe terminates, this scipt will do nothing to save you. That's why we, I, made Server Keepalive.
THIS FILE MUST RUN WITH ADMINISTRATOR PRIVILEGES!!!
