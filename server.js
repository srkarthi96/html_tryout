const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
let path = require('path');
let User = require('./models/users')
const csrfMiddleware = csrf({ cookie: true });

const PORT = process.env.PORT || 5000;
const app = express();
require('./mongoose')

app.engine("html", require("ejs").renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", function (req, res) {
  res.render("h1.html");
});

app.get('/user_list', async (req, res) => {
  console.log("let get the user")
  let data = await User.find()
  console.log("the data is ",data)
  if (data.length > 0) {
    console.log("the data is ",data)
    res.render("user",{userData:data})
    //res.render('user',{userData:data})
  }
})

app.post("/addName", async (req, res) => {
  console.log("The api will trigger")
  let user = await User.findOne({ email: req.body.email })
    if (!user) {
        await User.create(req.body, async(err, data) => {
           if (err) {
                res.send(err)
            }
           else {
             console.log("result of db is", data)
             let arrayData = new Array(data)
             res.render("user",{userData:arrayData})
             //  res.status(200).json({message : data}) 
            } 
        })
    }
    else {
        res.status(200).json({message :`User already Exit`})
    }
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});