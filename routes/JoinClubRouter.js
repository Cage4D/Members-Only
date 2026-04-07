const { Router } = require("express")
const pool = require("../data/pool")
const JoinClubRouter = Router()
const secretCode = "1234567890"

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect("/log-in")
}

JoinClubRouter.get("/", ensureAuthenticated, (req, res) => res.render("join-club"))
JoinClubRouter.post("/", ensureAuthenticated,  async (req, res, next) => {
    try {
        if (req.body.secretCode !== secretCode) return res.send("Invalid secret code")
        
        const result = await pool.query("UPDATE users SET membership_status  = $1 WHERE id = $2 RETURNING *", [
            true, req.user.id
        ])

        if (result.rowCount === 0) {
            return res.send("User not found!")
        }

        res.send("Membership activated")
    } catch (err) {
        return next(err);
    }
})

module.exports = JoinClubRouter;