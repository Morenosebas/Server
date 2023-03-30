const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserBuySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    purchases: {
        type: Number,
        default: 0
    },
    favoriteProducts: [{
        type: mongoose.Schema.Types.String,
        ref: 'Product'
    }],
    listProducts: [{
        type: mongoose.Schema.Types.String,
        ref: 'Product'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: null });


const UserBuyer = mongoose.model("UserBuyer", UserBuySchema);
module.exports = UserBuyer;
