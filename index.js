import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import flash from "express-flash";
import connection from "./src/config/connection.js";
import {
    Sequelize,
    QueryTypes
} from "sequelize";

const app = express()
const port = 3000
const sequelizeConfig = new Sequelize(connection.development);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(flash());
app.use(
    session({
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false, // https => http
        },
        store: new session.MemoryStore(),
        saveUninitialized: true,
        resave: false,
        secret: "pinjamduluseratus",
    })
);


app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));

app.get("/", home);
app.get("/project", project);
app.get("/testimonial", testimonial);
app.get("/contact-me", contact);
app.get("/register", formRegister);
app.post("/register", register);
app.get("/login", formLogin);
app.post("/login", login);


function home(req, res) {
    res.render("index");
}

function project(req, res) {
    res.render("project");
}

function testimonial(req, res) {
    res.render("testimoniall");
}

function contact(req, res) {
    res.render("contact-me");
}



async function register(req, res) {
    try {
        let {
            name,
            email,
            password
        } = req.body;

        bcrypt.hash(password, 10, async function (err, dataHash) {
            if (err) {
                res.redirect("/register");
            } else {
                await sequelizeConfig.query(
                    `INSERT INTO users(name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${dataHash}', NOW(), NOW())`
                );
                res.redirect("/");
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function formRegister(req, res) {
    res.render("register");
}

async function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body;
        const queryName = `SELECT * FROM users WHERE email = '${email}'`;

        const isCheckEmail = await sequelizeConfig.query(queryName, {
            type: QueryTypes.SELECT,
        });

        if (!isCheckEmail.length) {
            req.flash("danger", "Email has not been registered");
            return res.redirect("/login");
        }

        await bcrypt.compare(
            password,
            isCheckEmail[0].password,
            function (err, result) {
                if (!result) {
                    req.flash("danger", "Password wrong");
                    return res.redirect("/login");
                } else {
                    req.session.isLogin = true;
                    req.session.user = isCheckEmail[0].name;
                    req.flash("succes", "login succes");

                    return res.redirect("/");
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

app.listen(port, () => {
    console.log(` Project ${port}`);
});