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

app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'aidevelopercommunity@gmail.com',
              pass: 'thisistherealpassword@123'
          }
      });
      let mailOptions = {
          from: req.body.name+" <"+req.body.email+">", // sender address
          to: "aidevelopercommunity@gmail.com", // list of receivers
          subject: "Message from "+req.body.name, // message
          text: req.body.message+"\n\n---\nReply to "+req.body.email,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              res.send('error');
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.send('sent');
          });
      });

app.set('port', process.env.PORT || 80);
var server = app.listen(app.get('port'), function () {
    console.log('AIDC Server start on port ' + server.address().port);
});
