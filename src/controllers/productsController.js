const  Shop  = require('../schema/shop.sche');
const  User  = require('../schema/user.sche');
const  Product  = require('../schema/product.sche')
const ProductsController = {

};
//esta funcion es para obtener uno de los productos
ProductsController.getOneProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            $or: [{ _id: req.params.id }, { shop: req.params.storeid }]
        });
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
//esta funcion es para obtener todos los productos de cualquier tienda en el cliente

ProductsController.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        if (products) {
            res.json({
                products
            })
        } else {
            return res.json({ error: "error getting products" })
        }


    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }

}


ProductsController.createProduct = async function (req, res) {
    try {
        const { id } = req.params;
        const store = await Shop.findById(id);
        if (store) {
            const product = new Product({
                name: "Saborizante",
                description: "Color Rojo con verde especializado",
                stock: 322,
                price: 232,
                shop: store._id
            });
            await Shop.updateOne({ _id: store._id }, { $push: { products: product } });
            await product.save()
        } else {
            res.status(404).json({ error: "not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "message.error" })
    }
}


ProductsController.updateProduct = async function (req, res) {
    try {
        const { id } = req.params;
        const { name, stock, description, price } = req.body;
        const product = await Product.findByIdAndUpdate(id,
            {
                name: name,
                stock: stock,
                description: description,
                price: price

            });
        return res.json({
            message: 'Product updated',
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


ProductsController.deleteProduct = async function (req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.json({
            message: 'Product deleted',
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = ProductsController;