const { User, Shop, Product, UserBuyer } = require("../schema/buyer.sche");

const user1 = new User({
    username: "tienda1user",
    pass: "contraseña123"
});

const shop1 = new Shop({
    name: "Tienda 1",
    userBoss: user1._id,
    products: [
        {
            name: "Producto 1 de tienda 1",
            description: "Descripción del producto 1 de tienda 1",
            stock: 10,
            price: 100,
        },
        {
            name: "Producto 2 de tienda 1",
            description: "Descripción del producto 2 de tienda 1",
            stock: 5,
            price: 200,
        }
    ]
});

const product1 = new Product({
    name: "Producto 1 de tienda 1",
    description: "Descripción del producto 1 de tienda 1",
    stock: 10,
    price: 100,
    shop: shop1._id,
    _id: shop1.products[0]._id,
});

const product2 = new Product({
    name: "Producto 2 de tienda 1",
    description: "Descripción del producto 2 de tienda 1",
    stock: 5,
    price: 200,
    shop: shop1._id,
    _id: shop1.products[1]._id,

});

const user2 = new User({
    username: "tienda2user",
    pass: "contraseña123"
});

const shop2 = new Shop({
    name: "Tienda 2",
    userBoss: user2._id,
    products: [
        {
            name: "Producto 1 de tienda 2",
            description: "Descripción del producto 1 de tienda 2",
            stock: 20,
            price: 50,
        },
        {
            name: "Producto 2 de tienda 2",
            description: "Descripción del producto 2 de tienda 2",
            stock: 15,
            price: 75,
        }
    ]
});

const product3 = new Product({
    name: "Producto 1 de tienda 2",
    description: "Descripción del producto 1 de tienda 2",
    stock: 20,
    price: 50,
    shop: shop2._id,
    _id: shop2.products[0]._id,

});

const product4 = new Product({
    name: "Producto 2 de tienda 2",
    description: "Descripción del producto 2 de tienda 2",
    stock: 15,
    price: 75,
    shop: shop2._id,
    _id: shop2.products[1]._id,
});

const user3 = new User({
    username: "tienda3user",
    pass: "contraseña123"
});

const buyer3 = new UserBuyer({
    user: user3._id,
    purchases: 4,
    favoriteProducts: shop1.products.map(product => product.name),
    listProducts: shop2.products.map(product =>product.name),
})

// Guardar los datos en la base de datos


async function createData(){

    await user1.save();
    await shop1.save();
    await product1.save();
    await product2.save();
    await user2.save();
    await user3.save();
    await shop2.save(); 
    await product3.save();
    await product4.save();
    await buyer3.save();
    console.log("Datos creados");
}

module.exports = createData;