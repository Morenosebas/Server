const router = require('express').Router();
const { getProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
const multer = require('multer')



const storageProducts = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../Image/Products');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `Products-${Date.now()}.${ext}`);
    }
})


const uploadProduct = multer({ storage: storageProducts })

//rutas de productos
router.route('/products')
    .get(getProducts)
router.route('/:storeid/products/:id')
    .get(getOneProduct)
    .put(updateProduct)
    .delete(deleteProduct)

router.post('/:id/addprod/', uploadProduct.single('image'),  createProduct);

module.exports = router;