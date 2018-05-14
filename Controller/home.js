var nodeMailer = require('nodemailer');

exports.index = function (req, res) {
    res.render('index.ejs', {});
}
exports.sendMail = function (req, res) {
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
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.send('sent');
    });
}