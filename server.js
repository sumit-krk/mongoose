const express=require("express")

const mongoose = require("mongoose")

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment")
}

//step-1(create schema)
const userSchema = new mongoose.Schema({
    movie_id:{type:Number,required:true},
    movie_name: {type:String,required:true}, 
    movie_genre: {type:String,required:true},
    production_year: {type:Number,required:true},
    budget: {type:Number,required:true},
});

//step-2(connet the schema to collection)

const User = mongoose.model("user", userSchema); //users

const app=express();

app.use(express.json());

//CRUD api for users
//post
app.post("/users", async function (req, res) {
    const user = await User.create(req.body);
    return res.status(201).send({user})
})

//get
app.get("/users", async function (req, res) {
    const users = await User.find().lean().exec()
    return res.status(200).send({users})
})

//patch
app.patch("/users/:id", async function (req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.status(200).send({user})
})

//delete

app.delete("/users/:id", async function (req, res) {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.status(200).send({user})
})

//get single movi
app.get("/users/:id", async function (req, res) {
    const user = await User.findById(req.params.id).lean().exec();
    return res.send(user)
})

app.listen(2345, async function (){
    await connect();
    console.log("listing port 2345")
});