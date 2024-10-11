const product = require('../models/productModels')

exports.createProduct = async (req, res) => {
    try {
        let { productName, categoryId, subCategoryId, quantity, totalPrice, productImage, weight, description, discount, productDetails, FSSAILicense, NutrientValueAndBenefits, StorageTemperature, disclaimer, customerCareDetails, returnPolicy, expiryDate, SellerFSSAI } = req.body;

        let existProduct = await product.findOne({ productName });

        if (existProduct) {
            return res.status(409).json({ status: 409, success: false, message: "Product Already Added..." });
        }

        if (!req.files || !req.files['productImage']) {
            return res.status(404).json({ status: 404, success: false, message: "Product Image Is Required" });
        }

        const files = req.files['productImage'];

        const price = totalPrice - discount;

        existProduct = await product.create({
            productName,
            categoryId,
            subCategoryId,
            productImage: files.map(file => file.path),
            description,
            price,
            weight,
            discount,
            totalPrice,
            quantity,
            productDetails,
            NutrientValueAndBenefits,
            StorageTemperature,
            disclaimer,
            FSSAILicense,
            customerCareDetails,
            returnPolicy,
            expiryDate,
            SellerFSSAI
        });

        return res.status(201).json({ status: 201, success: true, message: "Product Created Successfully...", data: existProduct });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, success: false, message: error.message });
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(404).json({ status: 404, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedProduct;

        paginatedProduct = await product.find()

        let count = paginatedProduct.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "Product Not Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedProduct = await paginatedProduct.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, success: true, totalProducts: count, message: "All Products Found SuccessFully...", data: paginatedProduct })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id

        let getProductId = await product.findById(id)

        if (!getProductId) {
            return res.status(404).json({ status: 404, success: false, message: "Product Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Product Found SuccessFully...", data: getProductId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateProductById = async (req, res) => {
    try {
        let id = req.params.id

        let updateProductId = await product.findById(id)

        if (!updateProductId) {
            return res.status(404).json({ status: 404, success: false, message: "Product Not Found" })
        }

        if (req.files) {
            req.body.productImage = req.files['productImage'].map(file => file.path);
        }

        updateProductId = await product.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, success: true, message: "Product Updated SuccessFully...", data: updateProductId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteProductById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteProductId = await product.findById(id)

        if (!deleteProductId) {
            return res.status(404).json({ status: 404, success: false, message: "Product Not Found" });
        }

        await product.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "Product Delete SuccessFully..." });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getProductByCategory = async (req, res) => {
    try {
        let id = req.params.id

        let checkProduct = await product.find({ categoryId: id })

        if (!checkProduct) {
            return res.status(404).json({ status: 404, success: false, message: "Product Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Product Found SuccessFully...", data: checkProduct })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}