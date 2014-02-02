var express = require('express.io'),
    swig = require('swig'),
    _ = require('underscore'),
    RedisStore = require('connect-redis')(express),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

var server = express();
server.http().io();

server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', path.join(
    path.dirname(fs.realpathSync(__filename)), 'app/views'));

server.use(express.static(path.join(
    path.dirname(fs.realpathSync(__filename)), 'public')));

server.configure('development', function() {
    server.use(express.logger());
    server.use(express.cookieParser());
    server.use(express.bodyParser());

    server.use(express.session({
        secret: process.env.REDIS_SECRET,
        store: new RedisStore()
    }));
});

var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log('Listening on ' + port);
});