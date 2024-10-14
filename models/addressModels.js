const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    yourName: {
        type: String,
        require: true
    },
    yourPhoneNumber: {
        type: String,
        require: true
    },
    saveAddressAs: {
        type: String,
        enum: ['Home', "Work", "Hotel", "other"]
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('address', addressSchema);