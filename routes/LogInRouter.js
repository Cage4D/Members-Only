const { Router } = require("express")
const LogInRouter = Router()
const passport = require("passport")

LogInRouter.get("/", (req, res) => res.render("log-in"))
LogInRouter.post("/",  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
}))

module.exports = LogInRouter;