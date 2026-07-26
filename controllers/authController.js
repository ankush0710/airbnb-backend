const { check } = require("express-validator")

exports.getLogin = (req, res, next) => {
    res.render('auth/login/login', {
        pageTitle: "Login",
        isLoggedIn: false,
    })
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup/signup', {
        pageTitle: "signup",
        isLoggedIn: false,
    })
}

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
}

exports.postSignup = [
    // validation for first name 
    check("fname")
    .trim()
    .isLength({min: 2})
    .withMessage("first name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("first name should contains only letters"),

     // validation for last name 
    check("lname")
    .trim()
    .isLength({min: 2})
    .withMessage("last name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("last name should contains only letters"),

    //validation for email
    check("email")
    .trim()
    .isEmail()
    .withMessage("Please enter your valid email")
    .normalizeEmail(),

    //vaidate for password
    check("password")
    .trim()
    .isLength({min: 8})
    .withMessage("Password should be atleast 8 character long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@#$%^&*.,/?';:]/)
    .withMessage("Password should contain atleast one special character"),

    //validate for confirm password
    check("cpassword")
    .trim()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error("Password do not match");
        }
        return true
    }),

    //validate user type
    check("role")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(['guest', 'admin'])
    .withMessage("Invalid user type"),

    //validate terms and conditions
    check("terms")
    .custom((value) => {
        if( value !== 'on'){
            throw new Error("you must accept terms and conditions");
        }
        return true
    }),

(req, res, next) => {
    console.log(req.body);
    res.redirect("/login");
}] 

exports.postLogout = (req, res, next) => {
    // res.cookie("isLoggedIn", false);
    req.session.destroy(() => {
        res.redirect("/login");
    })
}