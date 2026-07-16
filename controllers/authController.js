exports.getLogin = (req, res, next) => {
    res.render('auth/login/login', {
        pageTitle: "Login",
        isLoggedIn: false,
    })
}

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    res.cookie("isLoggedIn", true);
    // req.isLoggedIn = true;
    res.redirect("/");
}

exports.postLogout = (req, res, next) => {
    res.cookie("isLoggedIn", false);
    res.redirect("/login");
}