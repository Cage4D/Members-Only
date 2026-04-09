const { Router } = require("express")
const indexRouter = Router()
const pool = require("../data/pool")

indexRouter.get("/", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM messages")
        const messages = result.rows
        res.render("home", { user: req.user, messages, })
    } catch(err) {
        next(err)
    }
})

module.exports = indexRouter;