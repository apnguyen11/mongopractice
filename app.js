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
mongoose.set('useFindAndModify', false);
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
 app.patch('/players/:id', (req, res) => {
    let {id} = req.params
    console.log('GETTING ONE', req.params)
    Players.findOneAndUpdate({_id: id},
        req.body)
    .then(data => res.json(data))
    .catch(err => res.json(err))
 })
 app.delete('/', (req, res) => {
    Players.remove(
        {_id: req.params.id}
    )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.json(err))
 })













app.listen(port, ()=>{console.log(`listeing on ${port}`)});