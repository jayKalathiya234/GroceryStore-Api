const user = require('../models/user.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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