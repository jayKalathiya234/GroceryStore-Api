const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    },
    productImage: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productDetails: {
        type: String,
        require: true
    },
    NutrientValueAndBenefits: {
        type: String,
        require: true
    },
    StorageTemperature: {
        type: String,
        require: true
    },
    Decription: {
        type: String,
        require: true
    },
    disclaimer: {
        type: String,
        require: true
    },
    FSSAILicense: {
        type: String,
        require: true
    },
    customerCareDetails: {
        type: String,
        require: true
    },
    returnPolicy: {
        type: String,
        require: true
    },
    expiryDate: {
        type: String,
        require: true
    },
    SellerFSSAI: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('product', productSchema)