const user = require('../models/user.models')
const jwt = require('jsonwebtoken')

exports.userLogin = async (req, res) => {
    try {
        let { uid, username, image, email } = req.body
        console.log(req.body);

        let imageUrl = req.file ? req.file.path : undefined

        let checkUser = await user.create({
            uid,
            username,
            image: imageUrl,
            email
        })

        await checkUser.save();

        let loginUser = await user.findOne({ email })
        console.log(loginUser);

        if (!loginUser) {
            return res.status(404).json({ status: 404, success: false, message: "User Not Found" })
        }

        let token = jwt.sign({ _id: loginUser._id }, process.env.SECRET_KEY, { expiresIn: '1D' })

        return res.status(200).json({ status: 200, success: true, message: "User Login SuccessFully....", data: { email: checkUser.email, username: checkUser.username }, token: token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}