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
    description: {
        type: String,
        required: true,
    },
    image: {
        filename: { type: String },
        path: { type: String },
        originalname: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    }
    ,
    products: [{
        name: {
            type: String,
            
        },
        description: {
            type: String,
            
        },
        stock: {
            type: Number,
            min: 0
        },
        price: {
            type: Number,
            min: 0
        },
        category: {
            
            type:String
        },
        img: {
            type: String,
            
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    category: {
        required: true,
        type: String
    },
    direccion: { required: true, type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: null });

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop; 

