var express = require('express');
var debug = require('debug');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');
var nodeMailer = require('nodemailer');


var app = express();

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Public')));

routes.setup(app);

app.get('/', function (req, res) {
  res.render('index');
});
app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'soham.marik@gmail.com',
              pass: '<CONFIDENTIAL>'
          }
      });
      let mailOptions = {
          from: req.body.name+'<'+req.body.email+'>', // sender address
          to: "soham.marik@gmail.com", // list of receivers
          message: req.body.message, // message
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      });

app.set('port', process.env.PORT || 80);
var server = app.listen(app.get('port'), function () {
    console.log('AIDC Server start on port ' + server.address().port);
});
