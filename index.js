import { error } from "console";
import Express from "express";
import fs, { read, write } from "fs";
import bodyParser from "body-parser";

const app= Express();
app.use(bodyParser.json());

const readData= () => {

    try{
    const data= fs.readFileSync("./db.json")
    return(JSON.parse(data));
    } catch(error){
        console.log(error);
    }
};

const writeData = (data) => {

    try{
    fs.writeFileSync("./db.json", JSON.stringify(data));
   
    } catch(error){
        console.log(error);
    }
};  

app.get("/", (req, res) =>{
    res.send("Welcome to my api")
});

app.get("/Autos", (req,res)=>{
    const data = readData();
    res.json(data.Autos)
});

app.get("/Autos/:id", (req, res) =>{
const data = readData();
const id = parseInt(req.params.id);
const auto = data.Autos.find((auto) => auto.id === id)
res.json(auto);
})

app.post("/Autos", (req, res)   =>{
    const data = readData();
    const body = req.body;
    const newAuto = {
        id: data.Autos.length + 1,
        ...body,
    };
    data.Autos.push(newAuto);
    writeData(data);
    res.json(newAuto);

})

app.put("/Autos/:id", (req,res) =>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const autoIndex = data.Autos.findIndex((auto)=> auto.id === id);
    data.Autos[autoIndex]={
        ...data.Autos[autoIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "Se han actualizado los datos de los autos."});
})

app.delete("/Autos/:id", (req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const autoIndex = data.Autos.findIndex((auto)=> auto.id === id);
    data.Autos.splice(autoIndex, 1)
    writeData(data);
    res.json({message:"Auto eliminado con exito"});
})

app.listen(3000, () =>{
    console.log("Se ha abierto el servidor en el puerto 3000");
});