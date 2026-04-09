const express = require("express");
const app = express();
const PORT = 3000;
const path = require("node:path")
const indexRouter = require("./routes/indexRouter")
const LogInRouter = require("./routes/LogInRouter")
const SignUpRouter = require("./routes/SignUpRouter")
const JoinClubRouter = require("./routes/JoinClubRouter").JoinClubRouter
const LocalStrategy = require("passport-local").Strategy
const passport = require("passport")
const pool = require("./data/pool")
const session = require("express-session")
const bcrypt = require("bcryptjs");
const AdminRouter = require("./routes/AdminRouter");
const CreateNewMessageRouter = require("./routes/CreateNewMessageRouter")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: "dogs", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", indexRouter)
app.get("/log-out", (req, res, next) => {
    req.logOut((err) => {
        if (err) next(err);
        res.redirect("/log-in")
    })
})
app.use("/log-in", LogInRouter)
app.use("/sign-up", SignUpRouter)
app.use("/join-club", JoinClubRouter)
app.use("/make-admin", AdminRouter)
app.use("/new-message", CreateNewMessageRouter)

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username])
            const user = rows[0]
            
            if (!user) {
                return done(null, false, {message: "Incorrect username" })
            }
            
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return done(null, false, { message: "Incorrect password" })
            }
            return done(null, user)
        } catch(err) {
            return done(err)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]) 
        const user = rows[0]

        done(null, user)
    } catch(err) {
        done(err);
    }
})

app.listen(PORT, error => {
    if (error) {
        throw error;
    }

    console.log(`Express app listening on PORT ${PORT}`)
})