const { Router } = require("express")
const AdminRouter = Router()
const pool = require("../data/pool")
const adminPasscode = "24680";
const ensureAuthenticated = require("./JoinClubRouter").ensureAuthenticated

AdminRouter.get("/", (req, res) => {
    if (req.user.is_admin) return res.redirect("/")
    res.render("make-admin", { error: null })
})
AdminRouter.post("/", ensureAuthenticated, async (req, res, next) => {
    try {
        if (req.body.adminPwd !== adminPasscode) return res.render("make-admin", { error: "Wrong Passcode" }) 
        
        const result = await pool.query("UPDATE users SET is_admin = $1 WHERE id =$2 RETURNING *", [
           true, req.user.id
        ])

        if (result.rowCount === 0) {
            res.send("Cannot make admin")
        }
        res.send("You're now an Admin")
        res.redirect("/")
    } catch (err) {
        return next(err)
    }
})

module.exports = AdminRouter;