import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
var posted = [];
var chosenItem;

function deleter() {
    console.log(this);
}

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/posts", (req, res) => {

    if (posted.length > 0) {
        res.render("posts.ejs", { postedItems: posted })
    } else {
        res.render("posts.ejs")
    }
})

app.get("/edit", (req, res) => {

    res.render("edit.ejs", {postedItems: posted})

})

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})

//post section
app.post("/create", (req, res) => {
    posted.push(req.body);
    
    res.render("posts.ejs", { postedItems: posted});
})

app.post("/edit", (req, res) => {
    
    
    chosenItem = req.body.choice
    res.render("edit.ejs",  {postedItems: posted, chosenItem:chosenItem} )

    
    
})

app.post("/edit-confirm", (req,res)=>{

    
    posted[chosenItem-1].postTitle=req.body.postTitle;
    posted[chosenItem-1].postContent=req.body.postContent;
    chosenItem ="";
    res.render("posts.ejs", {postedItems: posted, chosenItem:chosenItem} )
  

})

app.post("/delete", (req, res) => {

   
    posted.splice(req.body.choice - 1, 1)
    res.render("posts.ejs", { postedItems: posted })

})




app.listen(port, () => {
    console.log(`app is running in port ${port}`);

});