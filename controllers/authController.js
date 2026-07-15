const getUser = (req, res, next) => {
    res.render('/login', {
        pageTitle: "Login",
        currentPage: "login",
    })

}