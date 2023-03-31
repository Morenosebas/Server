const router = require('express').Router();
const multer = require('multer')
const { getAllStore, createAccount, deleteStore, getStore, getStoresByUser } = require('../controllers/storeController')


const storageLogo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/Image/Logos');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `store-${Date.now()}.${ext}`);
    }
})

const uploadLogo = multer({ storage: storageLogo })


//rutas de  shops
router.delete('/:id/deletestore/', deleteStore);
router.route('/shops')
    .get(getAllStore)
    .post(uploadLogo.single('image') ,createAccount)

router.get('/shops/:id', getStore)
router.get('/user/shops',getStoresByUser)


//rutas de sesion
module.exports = router;