import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
var posted = [];




app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.render("index.ejs"
    )
})

app.get("/posts", (req, res) => {

    if (posted.length>0){
        res.render("posts.ejs", { postedItems: posted })
    }else{
        res.render("posts.ejs")
    }
})

app.get("/create", (req, res) => {
    res.render("create.ejs")
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})

app.post("/submit", (req, res) => {

    posted.push(req.body)
    console.log(posted.length);
    res.render("posts.ejs", { postedItems: posted })

})


app.listen(port, () => {
    console.log(`app is running in port ${port}`);

})