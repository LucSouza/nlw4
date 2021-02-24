import express from 'express';

import "reflect-metadata";
import "./database"

const app = express();


app.get("/", (request, response) =>{
    return response.json({message: "Hello world NLW4"});
})

app.post("/", (request,response)=>{
    return response.json({message: "Dados inseridos com sucesso!"})
})

app.listen(3333,() => console.log("Server is Running"));

