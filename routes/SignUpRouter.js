const { Router } = require("express")
const SignUpRouter = Router()
const pool = require("../data/pool")
const bcrypt = require("bcryptjs")
const { body, validationResult, matchedData } = require("express-validator")

const validateUser = [
    body("first_name")
        .trim()
        .isAlpha()
        .withMessage("First name must contain only letters")
        .isLength({ min: 2, max: 20 }),
    body("last_name")
        .trim()
        .isAlpha()
        .withMessage("Last name must contain only letters")
        .isLength({ min: 2, max: 20 }),
    body("username").trim().isEmail().withMessage("Not a valid email address"),
    body("confirm-password").custom((value, {req}) => {
        if (value !== req.body.password) throw new Error("Passwords do not match");
        return true;
    })
]

SignUpRouter.get("/", (req, res) => res.render("sign-up"))
SignUpRouter.post("/", validateUser, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("sign-up", { errors: errors.array(), data: req.body })
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [
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