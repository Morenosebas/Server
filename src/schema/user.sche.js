const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    pass: {
        type: String,
        required: true,
        trim: true,
    },
    store: { default: false, type: Boolean }

}, { timestamps: true });

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(10))
}
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password.toString(), this.pass)
}

const User = mongoose.model("User", UserSchema);
module.exports = User;