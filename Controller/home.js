var nodeMailer = require('nodemailer');
var fs = require('fs');

exports.index = function (req, res) {
    res.render('index.ejs', {});
}

exports.sendMail = function (req, res) {
    var fs = require('fs');
    var credentials  = JSON.parse(fs.readFileSync('config.js', 'utf8'));
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: credentials.emailconfig.username,
            pass: credentials.emailconfig.password
        }
    });

    let mailOptions = {
        from: req.body.name + " <" + req.body.email + ">",
        to: "aidevelopercommunity@gmail.com",
        subject: "Message from " + req.body.name,
        text: req.body.message + "\n\n---\nReply to " + req.body.email,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send('error');
            return console.log(error);
        }
        res.send('sent');
    });
}