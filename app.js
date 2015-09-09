var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload_middleware = multer({
	storage: multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, '../questionnaire_uploads');
		},
		filename: function(req, file, cb) {
			var tmp_arr = file.originalname.split('.');
			cb(null, Date.now() + '.' + tmp_arr[(tmp_arr.length - 1 < 0 ? 0 : tmp_arr.length - 1)]);
		}
	})
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
	limit: '64mb'
}));
app.use(bodyParser.urlencoded({
	extended: true,
	limit: '64mb'
}));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

// routers
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

app.use('/questions', require('./routes/questions'));

app.use('/aspects', require('./routes/aspects'));

app.use('/groups', require('./routes/groups'));

app.use('/mail', require('./routes/mail'));

app.use('/upload', upload_middleware.single('excel'), require('./routes/uploads'));

app.use('/download', require('./routes/downloads'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
