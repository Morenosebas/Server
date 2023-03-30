const UserController = {

};
const User = require("../schema/user.sche")
const flash = require('connect-flash')

UserController.getAllUsers = async function (req, res) {
    try {
        const Users = await User.find();
        Users ? res.json(Users) : res.json("no se encontraron usuarios");
    } catch (error) {
        res.status(500).json({ error: error })
    }

};

UserController.getUser = async (req, res) => {
    try {
        const requestUser = req.user;
        if (requestUser) {
            res.json({
                requestUser,
                isAuthenticated: true,
            })
        } else { return res.status(403).json({ error: "error getting" }) }

    } catch (error) {
        console.error(error)
    }
};

UserController.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        await User.updateOne({ username: req.user?.username }, { username: username });
        res.json({ status: "Update User" });
    } catch (error) {
        console.error(error)
    }
}


module.exports = UserController;