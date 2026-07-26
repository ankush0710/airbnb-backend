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

exports.postSignup = (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
}

exports.postLogout = (req, res, next) => {
    // res.cookie("isLoggedIn", false);
    req.session.destroy(() => {
        res.redirect("/login");
    })
}