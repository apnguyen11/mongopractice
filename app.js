const express = require('express');
const mongoose = require('mongoose');
const Players = require('./player.js')
const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost:3000/mongoWorkshop', {useNewUrlParser:true})
.then(()=> console.log('Mangoose connectd'))
//CRUD
app.get('/', (req, res) => {
   Players.find()
   .then(data=>res.json(data))
   .catch(err=>console.log(err))
})
app.post('/', (req, res) => {
    res.send('posting')
 })
 app.patch('/', (req, res) => {
    res.send('patching')
 })
 app.delete('/', (req, res) => {
    res.send('deleting')
 })













app.listen(port, ()=>{console.log(`listeing on ${port}`)});