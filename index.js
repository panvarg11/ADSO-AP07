import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
var posted = [];

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
    
    res.render("posts.ejs", { postedItems: posted });
})

app.post("/edit", (req, res) => {
    console.log(req.body);
    posted.push(req.body);
    res.render("edit.ejs", {postedItems: posted})
    
   
})

app.post("/delete", (req, res) => {

    console.log(req.body.choice);
    posted.splice(req.body.choice - 1, 1)
    res.render("posts.ejs", { postedItems: posted })
})



//Start testing area

var test = []
var testI = 0;

app.post("/functiontest", (req, res) => {

    
    switch (req.body.choice) {
        case "test1": console.log("you have pressed test 1");


            //actions of test button 1
            test.push({
                title:"Title",
                content:"content",
                author:"author"
            })
            console.log(test);

            break;


        case "test2": console.log("you have pressed test 2");
            //actions of test button 1 
            test[1].title="New title of test #2";
            test[1].content="New content of test #2"

            break;

        default:
            break;
    }

})


app.listen(port, () => {
    console.log(`app is running in port ${port}`);

});