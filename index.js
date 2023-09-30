const express = require('express');
const cors = require('cors');
const app=express()

app.use(cors())
app.use(express.json())
require('dotenv').config()

const port=process.env.PORT || 5000 

// muntajat
// nsxmDYw08zmr8EGu


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://muntajat:nsxmDYw08zmr8EGu@cluster0.xuxoczf.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const laptopCollction = client.db('Muntajat').collection('Laptop')
    const mobileCollction = client.db('Muntajat').collection('Mobile')
    const tabCollction = client.db('Muntajat').collection('Tab')
    const AllproducCollction = client.db('Muntajat').collection('AllProduct')
    const AllCatagoreyproducCollction = client.db('Muntajat').collection('AllCatagoryProduct')


    app.get('/allproduct',async (req,res)=>{
      const qurey={}
      const result=await AllproducCollction.find(qurey).toArray()
      res.send(result)
  })
  app.get('/catagoryproduct',async (req,res)=>{


   

    const catagory=req.query.catagory
      const qurey={category:catagory}
      const result=await (await AllCatagoreyproducCollction.find(qurey).sort({price:1}).toArray())
      res.send(result)
  })



    // app.get('/laptop',async (req,res)=>{
    //     const qurey={}
    //     const result=await laptopCollction.find(qurey).toArray()
    //     res.send(result)
    // })
    
    // app.get('/mobile',async(req,res)=>{
    //   const qurey={}
    //   const result= await mobileCollction.find(qurey).toArray()
    //   res.send(result)
    // })
    // app.get('/tab',async(req,res)=>{
    //   const qurey={}
    //   const result= await tabCollction.find(qurey).toArray()
    //   res.send(result)
    // })
    
    
  } finally {
    
  }
}
run().catch(error => console.error(error));



app.get('/',(req,res)=>{
    res.send("HELLO WORD")
})
app.listen(port,()=>{
    console.log('server is running')
})

