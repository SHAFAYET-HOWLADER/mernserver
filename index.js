const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
//---------do not use in production---------//
app.use(cors());
app.use(express.json());
require('dotenv').config();
app.get('/', (req,res)=>{
    res.send("hello server");
})
const uri ="mongodb+srv://dbUser:P2BsgBqrKLdtbL2j@cluster0.9imf0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
   await client.connect();
   const serviceCollection = client.db("Free-Thoughts").collection("Service");
   /*--------get all service from database---------*/
  app.get("/get-service",  async(req,res)=>{
    const query = {};
    const service = serviceCollection.find(query);
    const result = await service.toArray();
    res.send(result);
  })
  app.post("/post-service", async(req,res)=>{
    const service = req.body;
    const result = await serviceCollection.insertOne(service);
    res.send(result);
  })
  }
  finally{
    // await client.close();
  }     
}
run().catch(console.dir)

app.listen(port, ()=>{
    console.log('server is runing', port);
})