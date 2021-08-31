const mod_express = require("express");
const db = require('./db');
const consign = require('consign');
// const body_parser = require('body-parser')
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// INITIALIZE FIREBASE
var admin = require("firebase-admin");

var serviceAccount = process.env.PORT ? {
    "type": process.env.SERVICE_ACCOUNT_TYPE,
    "project_id": process.env.SERVICE_ACCOUNT_PROJECT_ID,
    "private_key_id": process.env.SERVICE_ACCOUNT_PRIVATE_ID,
    "private_key": process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    "client_email": process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
    "client_id": process.env.SERVICE_ACCOUNT_CLIENT_ID,
    "auth_uri": process.env.SERVICE_ACCOUNT_AUTH_URI,
    "token_uri": process.env.SERVICE_ACCOUNT_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.SERVICE_ACCOUNT_CERT_URL,
    "client_x509_cert_url": process.env.SERVICE_ACCOUNT_CLIENT_CERT_URL
  } : require("./smart-clinic-pm-firebase-adminsdk.json");

console.log(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://smart-clinic-pm.appspot.com",
});

const adminStorage = admin.storage()
const bucket = adminStorage.bucket();
// END INITIALIZE FIREBASE

// CONFIGURE MULTER STORAGER HANDLING

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
        */
        cb(null, "./");
    },
    filename: (req, file, cb) => {
        /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
        */
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });

// END CONFIGURE MULTER STORAGE HANDLING

const app = mod_express();

app.db = db;
app.bucket = bucket;
app.upload = upload;

// POST WITH FILE EXAMPLE
// app.post('/', upload.single('selectedFile'), (req, res) => {
//     /*
//       We now have a new req.file object here. At this point the file has been saved
//       and the req.file.filename value will be the name returned by the
//       filename() function defined in the diskStorage configuration. Other form fields
//       are available here in req.body.
//     */
//     res.send();
//   });

app.use(cors())
app.use(mod_express.urlencoded({
    extended: false
}));
app.use(mod_express.json());

consign()
    .then('./functions')
    .then('./routes')
    .into(app)

let port = process.env.PORT ? process.env.PORT : 3001
console.log(port)

process.on('SIGINT', ()=>{
    admin.app().delete().then(function() {
        console.log("Admin App deleted successfully");
    }).catch(function(error) {
        console.log("Error deleting app:", error);
        process.exit()
    });
});

app.listen(port, ()=>{
    console.log("Server has started!");
});