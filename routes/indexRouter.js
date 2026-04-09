const { Router } = require("express");
const indexRouter = Router();
const pool = require("../data/pool");

indexRouter.get("/", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM messages");
        const messages = result.rows;
        res.render("home", { user: req.user, messages });
    } catch (err) {
        next(err);
    }
});

indexRouter.post("/delete-message/:id", async (req, res, next) => {
    try {
        if (!req.user || !req.user.is_admin) {
            return res.status(403).send("You don't have permission to delete messages");
        }

        const { id } = req.params;

        const result = await pool.query("DELETE FROM messages WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).send("Message not found");
        }

        res.redirect("/");
    } catch (err) {
        next(err);
    }
});

module.exports = indexRouter;