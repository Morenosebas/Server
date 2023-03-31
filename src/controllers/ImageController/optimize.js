const sharp = require('sharp')

const = helperImgLogo = (filePath, fileName, size) => {
    sharp(filePath).resize(size).toFile(`../../Image/optimize/Logo/${fileName}.webp`)
}
const = helperImgProduct = (filePath, fileName, size) => {
    sharp(filePath).resize(size).toFile(`../../Image/optimize/Product/${fileName}.webp`)
}

