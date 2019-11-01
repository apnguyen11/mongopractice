const express = require('express');
const mongoose = require('mongoose');
const Players = require('./player.js')
var bodyParser = require('body-parser')
const mustache = require('mustache')
const app = express();
const fs = require('fs');
const port = 3000;
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mongoWorkshop')
.then(()=> console.log('Mangoose connectd'))

const teamTemplate = fs.readFileSync('./templates/team.mustache', 'utf8')
//CRUD
function getAllPlayers(){
    return Players.find()
    // .then(data => res.json(data))
    // .catch(err=> console.log(err))
}

function renderPlayer (player) {
    return `<li>${player}</li>`
  }

function renderAllPlayers(allPlayers){
    return '<ul>' + allPlayers.map(renderPlayer).join('') + '</ul>'
}


//get all players
app.get('/', (req, res) => {
   getAllPlayers()
    .then(function(allPlayers){
        res.send(mustache.render(teamTemplate, {baseballteam: renderAllPlayers(allPlayers)}))
    })
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
 app.delete('/:id', (req, res) => {
    Players.deleteOne(
        {_id: req.params.id}
    )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.json(err))
 })













app.listen(port, ()=>{console.log(`listeing on ${port}`)});