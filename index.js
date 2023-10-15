const express = require('express');
const cors = require('cors');
const app=express()

app.use(cors())
app.use(express.json())
require('dotenv').config()

const port=process.env.PORT || 5000 

// muntajat
// nsxmDYw08zmr8EGu


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const usersCollction=client.db('Muntajat').collection("Users")
    const OrderCollction=client.db('Muntajat').collection("Orders")

    app.get('/allproduct',async (req,res)=>{
      const qurey={}
      const result=await AllproducCollction.find(qurey).toArray()
      res.send(result)
  })

  app.get('/catagoryproduct',async (req,res)=>{

    const catagory=req.query.catagory;
    const sorting= req.query.sorting;
    const minValue=req.query.minValue;
    const maxValue=req.query.maxValue;
      //  console.log(sorting,minValue,maxValue)

       const sellerName=req.query.sellerName;
       console.log(sellerName)
       const querysort =sorting === 'Sort by price: hight to low'?{price:-1} :{} && sorting=== 'Sort by price: low to hight'?{price:1}:{} && sorting ==='Sort by name: A to Z'?{name:1}:{}&& sorting==='Sort by name: Z to A'?{name:-1}:{}
       
      const qurey1={SellerName:sellerName}
      const qurey2={category:catagory}
      const qurey3 =catagory?qurey2:qurey1
      const result=await  AllCatagoreyproducCollction.find(qurey3).sort(querysort).toArray()
      
      
      res.send(result)
  })

  app.post('/catagoryproduct', async(req,res)=>{
    const qurey=req.body;
    const result=await AllCatagoreyproducCollction.insertOne(qurey)
    res.send(result)
  })


  app.post('/users',async(req,res)=>{
    const users =req.body;
    const result =await usersCollction.insertOne(users)
    res.send(result)
  })
  app.get('/users',async (req,res)=>{
    const qurey={}
    const result=await usersCollction.find(qurey).toArray()
    res.send(result)
})

app.post('/orders',async(req,res)=>{
  const order =req.body;
  const result= await OrderCollction.insertOne(order)
  res.send(result)
})

app.get("/orders/:id",async(req,res)=>{
  const id =req.params.id;
  const query={_id:ObjectId(id)}
  const result= await OrderCollction.findOne(query)
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

