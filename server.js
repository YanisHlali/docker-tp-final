require('dotenv').config();
const express = require("express");
const multer = require("multer");
const session = require("express-session");
const path = require("path");
const Routeur = require("./routes/route.js");

const PORT = process.env.PORT || 3001;
const app = express();

const ALLOWED_TYPES = /jpeg|jpg|png|gif/;
const FILE_SIZE_LIMIT = 5000000;

const imageFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;
    const isAllowed = ALLOWED_TYPES.test(extension) && ALLOWED_TYPES.test(mimeType);

    cb(null, isAllowed || new Error("Format de fichier non autorisé"));
};

const generateFileName = (req, res, next) => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}${String(now.getMilliseconds()).padStart(3, '0')}`;
    req.generatedFileName = timestamp;
    next();
};

const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `${req.generatedFileName}${extension}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: FILE_SIZE_LIMIT },
    fileFilter: imageFilter
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(generateFileName);
app.use(upload.any());
app.use("/", Routeur);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
