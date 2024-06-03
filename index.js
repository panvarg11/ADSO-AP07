import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const db = new pg.Client({
    user:"postgres",
    host: "localhost",
    database:"tienda",
    password: "sulmar2001",
    port: 5432
})

db.connect();


var posted = [];

var chosenItem;



app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", async (req, res) => {

    
  const result =  await db.query("SELECT * FROM Productos");
   
    let results =[]

    result.rows.forEach((product)=>{
        results.push(product);
    });

    posted =results;
    

    res.render("index.ejs");
   

    
})

app.get("/posts", async (req, res) => {

    const result =  await db.query("SELECT * FROM Productos");
   
    let results =[]

    result.rows.forEach((product)=>{
        results.push(product);
    });

    posted =results;

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
app.post ("/create", async (req, res) => {

    let titulo = req.body.titulo;
    let descripcion = req.body.descripcion;
    let precio = Number(req.body.precio);

    await db.query(`INSERT INTO productos (titulo, descripcion, precio) VALUES ('${titulo}', '${descripcion}', ${precio})`)

    posted.push(req.body);
    
    res.redirect("/posts");

    
})

app.post("/edit", (req, res) => {
    
    
    chosenItem = req.body.choice
    res.render("edit.ejs",  {postedItems: posted, chosenItem:chosenItem} )

    
    
})

app.post("/edit-confirm", async (req,res)=>{

    
  
    let titulo=req.body.titulo;
    let descripcion=req.body.descripcion;
    let precio= Number(req.body.precio);
    let id = Number(chosenItem)
    chosenItem ="";
    
    await db.query(`UPDATE Productos SET (Titulo, Descripcion, Precio) = ('${titulo}', '${descripcion}', ${precio}) WHERE Id = ${id}`)
    res.redirect("/posts")
  
  

})

app.post("/delete", async (req, res) => {

   
    let deleted = Number(req.body.choice)

    await db.query(`DELETE FROM Productos WHERE Id = ${deleted}`)
    
    res.redirect("/posts")

    
0
})




app.listen(port, () => {
    console.log(`app is running in port ${port}`);

});