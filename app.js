const express = require("express");

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
    
const app = express();
  
const mongoClient = new MongoClient("mongodb://localhost:27017/");
 
app.use(express.static(__dirname ));
 
(async () => {
     try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("admin").collection("users");
        await app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }catch(err) {
        return console.log(err);
    } 
})();

app.post("/api/users/", jsonParser, async(req, res)=> {
        
    if(!req.body) return res.sendStatus(400);
        
    const userName = req.body.name;
    const userAge = req.body.age;
    let user = {name: userName, age: userAge};
        
    const collection = req.app.locals.collection;
     
    try{
        await collection.insertOne(user);
        res.send(user);
    }
    catch(err){return console.log(err);}
});
 
 
// app.get("/api/users/", async(req, res) => {
         
//     const collection = req.app.locals.collection;
//     try{
//         const users = await collection.find({}).toArray();
//         res.send(users);
//     }
//     catch(err){return console.log(err);}
      
// });
// app.get("/api/users/:id", async(req, res) => {
         
//     const id = new objectId(req.params.id);
//     const collection = req.app.locals.collection;
//     try{
//         const user = await collection.findOne({_id: id});
//         res.send(user);
//     }
//     catch(err){return console.log(err);}
// });
     
// app.delete("/api/users/:id", async(req, res)=>{
         
//     const id = new objectId(req.params.id);
//     const collection = req.app.locals.collection;
//     try{
//         const result = await collection.findOneAndDelete({_id: id});
//         const user = result.value;
//         res.send(user);
//     }
//     catch(err){return console.log(err);}
// });
    
// app.put("/api/users/", jsonParser, async(req, res)=>{
         
//     if(!req.body) return res.sendStatus(400);
//     const id = new objectId(req.body.id);
//     const userName = req.body.name;
//     const userAge = req.body.age;
        
//     const collection = req.app.locals.collection;
//     try{
//         const result = await collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
//          {returnDocument: "after" });
//         const user = result.value;
//         res.send(user);
//     }
//     catch(err){return console.log(err);}
// });
  
// // прослушиваем прерывание работы программы (ctrl-c)
// process.on("SIGINT", async() => {
     
//     await mongoClient.close();
//     console.log("Приложение завершило работу");
//     process.exit();
// });



