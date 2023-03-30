const mongoose = require("mongoose");
const { Schema } = mongoose;

//a este esquema falta definirle la categoria

const ProductSchema = new Schema({
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
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: null });


const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;