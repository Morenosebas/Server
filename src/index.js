const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./db');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors')
const app = express();
const multer = require('multer')
const sharp = require('sharp')
const PORT = process.env.PORT || 5000;
const SECRET_SESSION = process.env.SESSION || 'secretsession';
const path = require('path')
const HOST_CLIENT = process.env.HOST_CLIENT
    ? process.env.HOST_CLIENT
    : 'http://localhost:3000';
// const chargeData = require("./helpers/createdata");
//settings
app.set('port', process.env.PORT || PORT);

//middlewares
app.use(morgan('dev'));
app.use(cors({
    origin: HOST_CLIENT,
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
}));
require('./passport/local-auth.js');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//statics
app.use(express.static(path.join(__dirname, 'Image')));
// // chargeData()

// mostrar el mensaje de validacion
app.use(async (req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    const username = app.locals.user?.username;
    const message = app.locals.signinMessage || app.locals.signupMessage;
    // res.json({ message: app.locals.signinMessage })
    // console.log('app-local  ', app.locals)
    next();
});

//route
app.use('/api', require('./routes/User.routes'));
app.use('/api', require('./routes/Shops.routes'));
app.use('/api', require('./routes/Products.routes'));


app.use((req, res, next) => {

    res.status(404).send('Lo siento, no puedo encontrar eso!');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});



// start server
const server = app.listen(app.get('port'), () => {
    console.log(path.join(__dirname, 'Images/optimize/Logo'))
    console.log(`Servidor ejecutándose en: `);
    console.log(`- Local:            http://localhost:${app.get('port')}`);
    console.log(`- En tu red local: http://${getLocalIPAddress()}:${app.get('port')}`);
});

function getLocalIPAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const interfaceName in interfaces) {
        const addresses = interfaces[interfaceName];
        for (const address of addresses) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
}