import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import flash from "express-flash";
import connection from "./src/config/connection.js";
import multer from "multer";
import {
    Sequelize,
    QueryTypes
} from "sequelize";

const app = express()
const port = 3000
const sequelizeConfig = new Sequelize(connection.development);

const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
})
const upload = multer({
    storage: multerConfig
})
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/assets", express.static("src/assets"));
app.use("/uploads", express.static("src/uploads"));

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

app.get("/", home);
app.get("/project", project);
app.get("/projectDetail/:id", projectDetail);
app.get("/testimonial", testimonial);
app.get("/contact-me", contact);
app.get("/register", formRegister);
app.get("/login", formLogin);
app.get("/logout", logout);
app.get("/addProject", addProject);
app.get("/editProject/:id", editProject);
app.get("/delete-project/:id", handleDeleteProject);
app.post("/register", register);
app.post("/login", login);
app.post("/addProject", upload.single("image"), handleProject);
app.post("/editProject/:id", upload.single("image"), handleEditProject);

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
                res.redirect("/login");
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function formRegister(req, res) {
    res.render("register");
}

async function editProject(req, res) {
    try {
        const id = req.params.id;
        const QueryName = `SELECT * FROM projects where id=${id}`

        const project = await sequelizeConfig.query(QueryName, {
            type: QueryTypes.SELECT
        })
        const obj = project.map((data) => {
            return {
                ...data
            }
        })
        console.log(obj);


        res.render("editProject", {
            data: obj[0],
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
}

function formLogin(req, res) {
    res.render("login");
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
                    req.session.idUser = isCheckEmail[0].id;
                    req.flash("succes", "login succes");
                    return res.redirect("/");
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

async function home(req, res) {
    try {
        const QueryName = "SELECT * FROM projects ORDER BY id DESC"
        const project = await sequelizeConfig.query(QueryName, {
            type: QueryTypes.SELECT
        })

        res.render("index", {
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
}

async function project(req, res) {
    try {
        if (req.session.isLogin === true) {
            const QueryName = `SELECT a.id, a.name, a.start_date, a.end_date, a.image, a.description, a.distance_date, a.node, a.react, a.golang, a.nextjs, a."updatedAt", u.name AS author 
            FROM projects a 
            LEFT JOIN "users" u 
            ON a.author = u.id 
            WHERE a.author = ${req.session.idUser}
            ORDER BY a.id DESC`;
            const project = await sequelizeConfig.query(QueryName, {
                type: QueryTypes.SELECT
            })
            const object = project.map((data) => {
                return {
                    ...data,
                    startDate: new Date(data.start_date).toLocaleDateString(),
                    endDate: new Date(data.end_date).toLocaleDateString()
                }
            })
            res.render("project", {
                data: object,
                isLogin: req.session.isLogin,
                user: req.session.user
            });
        } else {
            const QueryName = `SELECT a.id, a.name, a.start_date, a.end_date, a.distance_date, a.image, a.description, a.node, a.react, a.golang, a.nextjs, a."updatedAt", u.name AS author FROM projects a LEFT JOIN "users" u ON a.author = u.id ORDER BY id DESC`;
            const project = await sequelizeConfig.query(QueryName, {
                type: QueryTypes.SELECT
            })
            const obj = project.map((dataa) => {
                return {
                    ...dataa,
                    startDate: new Date(dataa.start_date).toLocaleDateString(),
                    endDate: new Date(dataa.end_date).toLocaleDateString()
                }
            })
            res.render("project", {
                dataa: obj,
                isLogin: req.session.isLogin,
                user: req.session.user
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function addProject(req, res) {
    res.render("addProject", {
        isLogin: req.session.isLogin,
        user: req.session.user
    });
}
const getDistanceTime = (start_date, end_date) => {
    const startDateTime = new Date(start_date).getTime();
    const endDateTime = new Date(end_date).getTime();
    let durationTime = endDateTime - startDateTime;

    let milisecond = 1000 // milisecond
    let secondInHour = 3600 // 1 jam = 3600 detik
    let hourInDay = 24 // 1 hari - 24 jam
    let dayInMonth = 30 // 30 hari dalam 1 bulan

    let durationMonth = Math.floor(
        durationTime / (milisecond * secondInHour * hourInDay * dayInMonth)
    );
    let durationDay = Math.floor(
        durationTime / (milisecond * secondInHour * hourInDay)
    );
    if (durationMonth > 0) {
        return `${durationMonth} Month`;
    } else if (durationDay > 0) {
        return `${durationDay} Day`;
    }
}
async function handleProject(req, res) {
    try {
        const {
            name,
            start_date,
            end_date,
            description,
            node,
            react,
            golang,
            nextjs,
        } = req.body;
        const author = req.session.idUser;
        const image = req.file.filename;
        if (!name || !description || !image) {
            req.flash('danger', 'input cannot be empty')
            return res.redirect("/addProject")
        }
        if (start_date == '') {
            req.flash('danger', 'Please input start date')
            return res.redirect("/addProject")
        }
        if (end_date == '') {
            req.flash('danger', 'Please input end date')
            return res.redirect("/addProject")
        }
        if (end_date <= start_date) {
            req.flash('danger', 'End Date must beer Start Date')
            return res.redirect("/addProject")
        }
        const distance_date = getDistanceTime(start_date, end_date);
        const nexts = nextjs ? true : false;
        const nodes = node ? true : false;
        const reacts = react ? true : false;
        const golangs = golang ? true : false;
        const QueryName = `INSERT INTO projects(
            name, start_date, end_date, image, description, distance_date, node,  react, golang, nextjs, author, "createdAt", "updatedAt")
            VALUES ('${name}','${start_date}','${end_date}','${image}','${description}','${distance_date}', '${nodes}', '${reacts}','${golangs}','${nexts}', '${author}', NOW(), NOW())`;
        await sequelizeConfig.query(QueryName)
        req.flash('success', 'Project added successfully');
        res.redirect("/project");
    } catch (error) {
        console.log(error)
    }
}
async function handleEditProject(req, res) {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            description,
            start_date,
            end_date,
            node,
            react,
            golang,
            nextjs
        } = req.body;

        if (!name || !description) {
            req.flash('danger', 'Input form must be filled in');
            return res.redirect(`/editProject/${id}`);
        }

        if (start_date == '') {
            req.flash('danger', 'Please input start date');
            return res.redirect(`/editProject/${id}`);
        }
        if (end_date == '') {
            req.flash('danger', 'Please input end date');
            return res.redirect(`/editProject/${id}`);
        }

        if (end_date <= start_date) {
            req.flash('danger', 'End Date must be after Start Date');
            return res.redirect(`/editProject/${id}`);
        }
        const nodes = node ? true : false;
        const reacts = react ? true : false;
        const golangs = golang ? true : false;
        const nexts = nextjs ? true : false;
        let image = '';

        if (req.file) {
            image = req.file.filename;
        }

        const QueryName = `
            UPDATE projects 
            SET 
                name = '${name}',
                start_date = '${start_date}',
                end_date = '${end_date}',
                ${image ? `image = '${image}',` : ''}
                description = '${description}',
                node = '${nodes}',
                react = '${reacts}',
                golang = '${golangs}',
                nextjs = '${nexts}',
                "updatedAt" = NOW()
            WHERE 
                id = ${id}
        `;

        await sequelizeConfig.query(QueryName);
        req.flash('success', 'Project edit successfully');
        res.redirect("/project");

    } catch (error) {
        console.log(error);
    }
}

async function projectDetail(req, res) {
    try {
        const id = req.params.id;
        const QueryName = `SELECT * FROM projects where id=${id}`
        const project = await sequelizeConfig.query(QueryName, {
            type: QueryTypes.SELECT
        })
        const obj = project.map((data) => {
            return {
                ...data,
                author: "M Fadhil",
                startDate: new Date(data.start_date).toLocaleDateString(),
                endDate: new Date(data.end_date).toLocaleDateString()
            }
        })
        res.render("projectDetail", {
            data: obj[0],
            isLogin: req.session.isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
}

function testimonial(req, res) {
    res.render("testimonial", {
        isLogin: req.session.isLogin,
        user: req.session.user
    });
}

function contact(req, res) {
    res.render("contact-me");
}

async function handleDeleteProject(req, res) {
    try {
        const {
            id
        } = req.params;
        const QueryName = `DELETE FROM projects WHERE id = ${id}`;
        await sequelizeConfig.query(QueryName)
        req.flash('success', 'Project deleted successfully');
        res.redirect("/project");
    } catch (error) {
        console.log(error);
    }
}

function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login");
        }
    });
}

app.listen(port, () => {
    console.log(` Project ${port}`);
});