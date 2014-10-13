/**
 * Created by ejborges on 10/6/2014.
 */

var express = require('express'),  // uses express version defined in package.json

    // http://socket.io/docs/#using-with-express-3/4
    app = module.exports = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),

    // http://en.wikipedia.org/wiki/Port_(computer_networking)
    // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
    portNum = 3000; // change to whatever, try to keep the number high though, most other processes use up ports with lower value
    // if you try to run the server on this port when it is already in use by another operation, you'll get an error: listen EADDRINUSE

    // to connect to this port (view the web page this server is serving) from another computer/mobile device on the same network
    // open up a terminal/command prompt and run: ipconfig     look for the IPv4 Address and type that into your browser's search
    // bar followed by  :3000  (colon is needed, replace 3000 with whatever other port number you're using)

app.configure(function() {
    "use strict";
    // http://expressjs.com/3x/api.html#app.use
    app.use(express.bodyParser());  // http://expressjs.com/3x/api.html#bodyParser
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/client'));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

var tagsPackage = {
    id: Math.floor(Math.random()*10000), // unique ID for this package every time the server starts, value between 0 and 9999
                                         // scenario: if server restarts and some clients are still emitting messages with the old package (they haven't updated yet),
                                         // they could be referring to values that don't exist in this package. We first do an ID check to prevent this and a crash.
    count: 3,    // initial count
    tags: {}
    },
    newTag = function(id) {
        return {
            id: 'tag' + id,
            name: 'Tag ' + id,
            value: 0
        }
    };

// initial tags created using initial count
for(var i = 1; i <= tagsPackage.count; i++){
    tagsPackage
        .tags
            ['tag' + i] = {
                id: 'tag' + i,
                name: 'Tag ' + i,
                value: 0
    };
}


// 'server.listen', NOT 'app.listen' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ಠ_ಠ
// socket.io will NOT work when using 'app.listen'
server.listen(portNum, function () {
    "use strict";
    console.log("Express server listening on port %d in %s mode.",
        this.address().port, app.settings.env);
});


// http://socket.io/docs/#using-with-express-3/4
// http://stackoverflow.com/a/10099325/3873384
io.on('connection', function(socket) {
    "use strict";

    // do this when a new client connects
    console.log("\nSending initial tagsPackage to new client: " + socket.id + "\n");
    socket.emit('welcome kit', {socketId: socket.id, tagsPackage: tagsPackage});

    socket.on('get tagsPackage', function() {
        console.log("\nSending another tagsPackage to new client: " + socket.id + "\n");
        socket.emit('welcome kit', {socketId: socket.id, tagsPackage: tagsPackage});
    });

    // when a client says they've changed a tag's value, update it here and tell everyone else this tag's value changed
    socket.on('tag value changed', function(change) {
        if(change.id == tagsPackage.id){ // if the ID of the package the client sent does not match the ID of the package this server has
            console.log("\n" + tagsPackage.tags[change.tagId].name + " checkbox clicked. Value changed from " + tagsPackage.tags[change.tagId].value + " to " + change.value + "\n");
            tagsPackage.tags[change.tagId].value = change.value;
            console.log("\nBroadcasting: update tag value\n");
            socket.broadcast.emit('update tag value', change); // emits to everyone, not just the sender
        }
        else {
            console.log("\ntagsPackage ID mismatch with client: " + socket.id + ". Client tagsPackage ID: " + change.id +
                ", Server tagsPackage ID: " + tagsPackage.id + "\nSending client new tagsPackage.\n");
            socket.emit('welcome tagsPackage', tagsPackage);
        }
    });

    socket.on('tag count changed', function(count) {
        if(count.id == tagsPackage.id) {
            var difference;
            console.log("\nTag count value changed from " + tagsPackage.count + " to " + count.value + "\n");
            if (count.value < tagsPackage.count) {
                difference = tagsPackage.count - count.value;
                do {
                    console.log("\nDeleted " + tagsPackage.tags['tag' + (count.value + difference)].name + "\n");
                    delete tagsPackage.tags['tag' + (count.value + difference)];
                    difference--;
                } while (difference);
            }
            else if (count.value > tagsPackage.count) {
                difference = count.value - tagsPackage.count;
                do {
                    tagsPackage.tags['tag' + (count.value - difference + 1)] = newTag((count.value - difference + 1));
                    console.log("\nCreated " + tagsPackage.tags['tag' + (count.value - difference + 1)].name + "\n");
                    difference--;
                } while (difference);
            }
            tagsPackage.count = count.value;
            console.log("\nBroadcasting: update tag count\n");
            socket.broadcast.emit('update tag count', count);
        }
        else {
            console.log("\ntagsPackage ID mismatch with client: " + socket.id + ". Client tagsPackage ID: " + count.id +
                ", Server tagsPackage ID: " + tagsPackage.id + "\nSending client new tagsPackage.\n");
            socket.emit('welcome tagsPackage', tagsPackage);
        }
    });
});