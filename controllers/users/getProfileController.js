const User = require("../../models/userModel");

const getProfile = async (req, res) => {
    if (!req.id) return res.status(404)
    const userId = req.id
    try {
        const foundUser = await User.findOne({ _id: userId })
        if (!foundUser) return res.status(404).json({ message: "User not found" })

        return res.status(200).json({
            username: foundUser.username,
            profilePic: foundUser.profilePic,
            bio: foundUser.bio,
            posts: foundUser.posts,
            email: foundUser.email,
            followers: foundUser.followers,
            followings: foundUser.followings,
            requestsSent: foundUser.requestsSent,
            requestsGot: foundUser.requestsGot
        })

    } catch (err) {
        return res.status(404).json({ message: "User not found" })
    }

};
module.exports = getProfile