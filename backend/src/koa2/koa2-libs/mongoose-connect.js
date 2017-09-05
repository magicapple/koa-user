/**
 * Mongodb Mongoose Connection
 *
 * http://theholmesoffice.com/mongoose-connection-best-practice/
 *
 * https://docs.mongodb.com/manual/reference/connection-string/
 *
 */


const mongodbUri = require('mongodb-uri');
const debug  = require('debug')('koa2-user:Mongodb');

// https://docs.mongodb.com/manual/reference/connection-string/
const DBUrl = mongodbUri.format(GConfig.mongodb);



// http://mongoosejs.com/docs/connections.html#use-mongo-client
GMongoose.connect(DBUrl, {
    useMongoClient: true,
    /* other options */
}, function (err) {
    if (err) {
        GLogger.error('===== Mongodb mongoose Error : ', err);
        debug('===== Mongodb mongoose Error : ', err);

        // process.exit(1);
    }
});



// GMongoose.connect(DBUrl);

const db = GMongoose.connection;



db.once('open', function () {
    debug('Mongoose Successfully open Mongodb: ', DBUrl);

    // var socketio = require('socket.io').listen(server);
    // global.gsocketio = socketio;
    // require('./common/socketio').init(socketio);
});

db.on('connected', function () {
    debug('Successfully connected to Mongodb by Mongoose: ', DBUrl);
});

db.on('error', function (err) {
    GLogger.error('===== Mongodb mongoose connection Error : ', err);
    debug('===== Mongodb mongoose connection Error : ' + err);
});

db.on('disconnected', function () {
    GLogger.error('===== Mongodb mongoose default connection disconnected. ');
    debug('===== Mongodb mongoose default connection disconnected');
});




const gracefulExit = function() {
    db.close(function () {
        GLogger.error('===== Mongoose default connection closed through Koa2 Server termination!');
        debug('===== Mongoose default connection closed through Koa2 Server termination!');
        process.exit(0);
    });
}


// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

