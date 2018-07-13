exports.setup = function (app) {
    var home = require('./Controller/home');
    var blog = require('./Controller/blog');
    app.get('/', home.index);
    app.get('/blog',blog.index);
    app.post('/send-email', home.sendMail);
}
