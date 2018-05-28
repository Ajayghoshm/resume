const express=require("express");
const router=express.Router();


//resumelist
router.get("/",(req,res) =>{
  res.render("resume/resumelist");
})

//resume creation form
router.get("/create",(req,res) =>{
  res.render("resume/rcreate");
})

//resume create submission
router.post("/create",(req ,res) =>{
  console.log(req.body);
  res.send("ok");
})

//resume view
router.get("/view",(req,res) =>{
  res.render("resume/resume");
})

module.exports=router;