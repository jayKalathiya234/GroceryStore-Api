const user = require('../models/user.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Order = require('../models/orderModels')
const Product = require('../models/productModels')

exports.userLogin = async (req, res) => {
    try {
        let { uid, username, image, email } = req.body

        let imageUrl = req.file ? req.file.path : undefined

        let checkUser = await user.findOne({ email })

        if (!checkUser) {
            checkUser = await user.create({
                uid,
                username,
                image: imageUrl,
                email
            })
        }

        if (req.file) {
            checkUser.image = imageUrl
        }

        let token = jwt.sign({ _id: checkUser._id }, process.env.SECRET_KEY, { expiresIn: '1D' })

        return res.status(200).json({ status: 200, success: true, message: "User Login SuccessFully....", data: { image: checkUser.image, id: checkUser._id, email: checkUser.email, username: checkUser.username }, token: token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        let chekEmail = await user.findOne({ email: email });

        if (!chekEmail) {
            return res.json({ status: 400, message: "Email Not Found " })
        }

        let passwordComapre = await bcrypt.compare(password, chekEmail.password);

        if (!passwordComapre) {
            return res.json({ status: 400, message: "Password Not Match" })
        }

        let token = await jwt.sign({ _id: chekEmail._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.json({ status: 200, message: "User Login SuccessFully...", user: chekEmail, token: token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.changePassword = async (req, res) => {
    try {
        let id = req.params.id

        let getUserIdData = await user.findById(id)

        let { currentPassword, newPassword, confirmPassword } = req.body

        let passwordCompare = await bcrypt.compare(currentPassword, getUserIdData.password);

        if (!passwordCompare) {
            return res.status(400).json({ status: 400, message: "Current Password Not Match" })
        }

        if (newPassword != confirmPassword) {
            return res.status(400).json({ status: 400, message: "newPassword and confirmPassword Not Match" })
        }

        let salt = await bcrypt.genSalt(10);
        let hasPassword = await bcrypt.hash(newPassword, salt)

        getUserIdData = await user.findByIdAndUpdate(id, { password: hasPassword }, { new: true });

        return res.status(200).json({ status: 200, message: "Password Changed SuccessFully..." });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.adminDashboard = async (req, res) => {
    try {
        const totalRevenueResult = await Order.aggregate([
            { $match: { orderStatus: 'Completed' } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' }
                }
            }
        ]);

        const dailyOrders = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalDailyOrders: { $sum: 1 }
                }
            }
        ]);

        const dailySales = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0))
                    },
                    orderStatus: 'Completed'
                }
            },
            {
                $group: {
                    _id: null,
                    totalDailySales: { $sum: '$totalAmount' }
                }
            }
        ]);

        const totalProducts = await Product.countDocuments({ status: true });

        const productList = await Product.aggregate([
            { $match: { status: true } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    productName: 1,
                    price: 1,
                    quantity: 1,
                    unit: 1,
                    categoryName: '$category.categoryName',
                    productImage: { $arrayElemAt: ['$productImage', 0] }
                }
            },
        ]);

        return res.status(200).json({ status: 200, totalRevenue: totalRevenueResult[0]?.totalRevenue || 0, dailyOrders: dailyOrders[0]?.totalDailyOrders || 0, dailySales: dailySales[0]?.totalDailySales || 0, totalProducts, productList: productList });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}