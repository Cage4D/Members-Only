const { Router } = require("express")
const indexRouter = Router()

indexRouter.get("/", (req, res) => {
    res.render("home", { user: req.user })
})

module.exports = indexRouter;