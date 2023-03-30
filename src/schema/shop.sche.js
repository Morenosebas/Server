const mongoose = require("mongoose");
const { Schema } = mongoose;
//este esquema es para definir la estructura de la Tienda la cual esta referida al esquema de usuario
//a este esquema falta definirle la categoria
const ShopSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,

    },
    userBoss: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            min: 0
        },
        price: {
            type: Number,
            min: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: null });

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop; 

