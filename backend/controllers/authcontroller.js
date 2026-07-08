const bcrypt = require("bcrypt")
const usermodel = require("../modules/userschema")
const jwt = require("jsonwebtoken")

//creating routers 
const register = async (req, res) => {
    const { username, email, password, role } = req.body
    try {

        const hidepassword = await bcrypt.hash(password, 10)

        const checkuser = await usermodel.findOne({
            email

        })
        if (checkuser) {
            return res.status(400).json({
                status: "user already exist"
            })
        }
        const userinfo = await usermodel.create({
            username,
            email,
            password: hidepassword,
            role

        })
        return res.status(200).json({
            status: "data collected"
        })

    }
    catch (e) {
        console.log(e)
        res.status(400).json({
            status: "server error"
        })
    }

}
//login

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const checkuserexist = await usermodel.findOne({
            email
        })
        if (!checkuserexist) {
            return res.status(401).json({
                status: "firstly  register"
            })

        }
        const passwordvalidation = await bcrypt.compare(password, checkuserexist.password)
        if (passwordvalidation) {

            const token = jwt.sign({
                email: checkuserexist.email,
                role: checkuserexist.role
            }, process.env.secret)
            res.cookie("user1", token)

           return res.status(200).json({
    status: "Logged in successfully",
    user: {
        username: checkuserexist.username,
        email: checkuserexist.email,
        role: checkuserexist.role
    }
})





        }
        else {
            return res.status(400).json({
                status: "invalid password"
            })

        }


    }
    catch (e) {
        console.log("internal server error")
    }
}


const logout = (req, res) => {
    res.clearCookie("user1")
    return res.status(200).json({
        status: "logged out success",
    })
}


const getCurrentUser = (req, res) => {
    try {
        const token = req.cookies.user1;

        if (!token) {
            return res.status(401).json({
                status: "Not Logged In",
            });
        }

        const user = jwt.verify(token, process.env.secret);

        return res.status(200).json(user);
    } catch (err) {
        return res.status(401).json({
            status: "Invalid Token",
        });
    }
};



module.exports = {
    register,
    login,
    logout,
    getCurrentUser,
};