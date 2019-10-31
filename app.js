const express = require('express');
const mongoose = require('mongoose');
const Players = require('./player.js')
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mongoWorkshop')
.then(()=> console.log('Mangoose connectd'))
//CRUD

//get all players
app.get('/players', (req, res) => {
   Players.find()
   .then(data=>res.json(data))
   .catch(err=>console.log(err))
})

//create player
app.post('/players/new', (req, res) => {
    console.log(req.body)
    Players.create(req.body)
    .then(data => res.json(data))
    .catch(err => console.log(err))
 })
 app.patch('/', (req, res) => {
    res.send('patching')
 })
 app.delete('/', (req, res) => {
    res.send('deleting')
 })













app.listen(port, ()=>{console.log(`listeing on ${port}`)});