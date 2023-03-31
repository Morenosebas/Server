const  Shop  = require('../schema/shop.sche');
const  User  = require('../schema/user.sche');
const Product = require('../schema/product.sche')
const fs = require('fs')
const sharp = require('sharp')
const  helperImgLogo = (filePath, fileName, size) => {
    return sharp(filePath)
        .resize(size)
        .toFile(`./src/Image/optimize/Logo/${fileName}.webp`)
}
const storeController = {}


storeController.createAccount = async function (req, res) {
    try {
        console.log(req.file)
        const { name,descripcion,direccion,categoriaStore } = req.body;
        const userStore = await Shop.findOne({ name: name })
        const userSh = await User.findOne({ username: req.user?.username })
        helperImgLogo(req.file.path,`${name.split(" ").join("_")}-logo`, 200)
        const createShop = new Shop({
            name: name,
            userBoss: userSh.id,
            description: descripcion,
            direccion: direccion,
            category: categoriaStore,
            image: {
                filename : req.file.filename,
                path: `/optimize/Logo/${name.split(" ").join("_")}-logo.webp`,
                originalname : req.file.originalname,
                mimetype : req.file.mimetype,
                size : req.file.size,
            }
        })
        console.log(createShop)
        await User.updateOne({ _id: userSh.id }, { store: true }  );
        await createShop.save();
        res.json({
            created:true
        })
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
        let message = "sin tiendas";
        if (store) {
            await Shop.deleteOne({ _id: store._id });
            const stores = await Shop.find({ userBoss: store.userBoss })
            await Product.deleteMany({ shop: store._id });
            !stores ? await User.updateOne({ _id: store.userBoss },
                { $push: { store: false } }) : message = "Store deleted";
            res.json({
                message
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

storeController.getStoresByUser = async function (req, res)  {
    try {
        const store = await Shop.find({ userBoss: req.user?._id });
        if (store) {
            res.json({
                data:store
            })
        }


    } catch (error) {
            console.warn(error)
    }
    }



module.exports = storeController;
