const router = require('express').Router();
const passport = require('passport');
const { getUser, getAllUsers, updateUser } = require('../controllers/userController.js');

router.get('/users', getAllUsers)
router.get('/user', isAuthenticated, getUser)
router.put('/user/:userid', isAuthenticated, updateUser)

router.route('/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect: '/api/user',
        failureRedirect: '/api/',
        failureFlash: true
    }))


router.route('/signin')
    .post(passport.authenticate('local-signin', {
        successRedirect: '/api/user',
        failureRedirect: '/api/signin',
        failureFlash: true
    }))
    .get((req, res) => {
        res.json({
            message: "Usuario o contraseña incorrectos."
        })
    })



router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ status: "logout" })
        console.log("logout");
    });
});

//no me esta guardando el usuario ni autenticandeo
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("isAuthenticated");
        return next();
    }
    console.log("No autenticado")
    res.status(500).json({
        isAuthenticated: false,
    })
}



module.exports = router;