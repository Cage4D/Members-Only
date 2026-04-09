const { Router } = require("express")
const CreateNewMessage = Router()
const ensureAuthenticated = require("./JoinClubRouter").ensureAuthenticated
const pool = require("../data/pool")

CreateNewMessage.get("/", (req, res) => res.render("new-message"))
CreateNewMessage.post("/", ensureAuthenticated, async (req, res, next) => {
    try {
        const result = await pool.query("INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)", [
            req.user.username, req.body.messageTitle, req.body.newMessage
        ])
        console.log(req.user.id)
        console.log(result)
        res.redirect("/")
    } catch(err) {
        console.log("An error occured")
        return next(err);
    }
})

module.exports = CreateNewMessage;