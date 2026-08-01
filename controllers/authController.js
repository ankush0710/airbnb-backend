const { check, validationResult } = require("express-validator");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login/login", {
    pageTitle: "Login",
    isLoggedIn: false,
    errorMessage: [],
    oldInput: { email: "" },
    user: {},
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup/signup", {
    pageTitle: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: { fname: "", lname: "", email: "", password: "", role: "" },
    user: {},
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login/login", {
      pageTitle: "Login",
      isLoggedIn: false,
      errorMessage: ["User does not exist"],
      oldInput: { email: email || "" },
      user: {},
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login/login", {
      pageTitle: "Login",
      isLoggedIn: false,
      errorMessage: ["Invalid password"],
      oldInput: { email: email || "" },
      user: {},
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };

  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.postSignup = [
  // validation for first name
  check("fname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should contains only letters"),

  // validation for last name
  check("lname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last name should contains only letters"),

  //validation for email
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please enter your valid email")
    .normalizeEmail(),

  //vaidate for password
  check("password")
    .trim()
    .isLength({ min: 8 })
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
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  //validate user type
  check("role")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "admin"])
    .withMessage("Invalid user type"),

  //validate terms and conditions
  check("terms").custom((value) => {
    if (value !== "on") {
      throw new Error("You must accept terms and conditions");
    }
    return true;
  }),

  (req, res, next) => {
    const { fname, lname, email, password, role } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup/signup", {
        pageTitle: "Sign Up",
        isLoggedIn: false,
        errorMessage: errors.array().map((err) => err.msg),
        oldInput: {
          fname,
          lname,
          email,
          password,
          role,
        },
        user: {},
      });
    }

    //hashing the password by using bcrypt hashing mechanism
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new Users({
          firstName: fname,
          lastName: lname,
          email,
          password: hashedPassword,
          role,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup/signup", {
          pageTitle: "Sign Up",
          isLoggedIn: false,
          errorMessage: [err.message],
          oldInput: {
            fname,
            lname,
            email,
            role,
          },
          user: {},
        });
      });
  },
];

exports.postLogout = (req, res, next) => {
  // res.cookie("isLoggedIn", false);
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
