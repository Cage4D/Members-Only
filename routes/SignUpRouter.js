const { Router } = require("express")
const SignUpRouter = Router()
const pool = require("../data/pool")
const bcrypt = require("bcryptjs")

SignUpRouter.get("/", (req, res) => res.render("sign-up"))
SignUpRouter.post("/", async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3)", [
            req.body.first_name,
            req.body.last_name,
            req.body.username,
            hashedPassword
        ]);
        res.redirect("/")
    } catch(err) {
        return next(err)
    }
})

module.exports = SignUpRouter;