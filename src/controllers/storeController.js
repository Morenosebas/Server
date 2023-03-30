const  Shop  = require('../schema/shop.sche');
const  User  = require('../schema/user.sche');
const  Product  = require('../schema/product.sche')
const storeController = {}




storeController.createAccount = async function (req, res) {
    try {
        const { name } = req.body;
        // const userStore = await Shop.findOne({ name: dataSearch })
        const userSh = await User.findOne({ username: "tienda2user" })
        console.log(userSh.username, userSh._id)
        const createShop = new Shop({
            name: userSh.username,
            userBoss: userSh.id,
            products: [
                {
                    name: "Producto 1 de tienda 3 del user 2",
                    description: "Descripción del producto 1 de tienda 3",
                    stock: 202,
                    price: 502,
                },
                {
                    name: "Producto 2 de tienda 3 del user 2",
                    description: "Descripción del producto 2 de tienda 3",
                    stock: 125,
                    price: 752,
                }
            ]
        })
        createShop.save();
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}


storeController.getAllStore = async function (req, res) {
    try {
        const store = await Shop.find();
        if (store) {
            res.json(store)
        } else {
            res.status(404).json({
                message: 'No store found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}


storeController.getStore = async function (req, res) {
    try {
        const { id } = req.params;
        console.log(id)
        const store = await Shop.findById(id);
        if (store) {
            res.json(store)
        } else {
            res.status(404).json({
                message: 'No store found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

storeController.deleteStore = async function (req, res) {
    try {
        const { id } = req.params;
        const store = await Shop.findById(id);
        if (store) {
            await Shop.deleteOne({ _id: store._id });
            await Product.deleteMany({ shop: store._id });

            res.json({
                message: 'Store deleted'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

storeController.updateStoreName = async function (req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const store = await Shop.findByIdAndUpdate(id, { name: name });
        return res.json({
            message: 'Store updated',
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = storeController;
