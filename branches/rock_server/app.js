/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , phone = require('./routes/phone')
	, user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3030);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/phone/regist', phone.regist);
app.post('/phone/unregist', phone.unregist);

app.post('/user/regist', user.regist);
app.post('/user/unregist', user.unregist);
//app.post('/send', main.send);
//app.post('/location', main.location);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
