// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());


server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users)
    }
     catch(e) {
         res.status(500).json({ message: `could not find user`})
     }
});

server.get('/api/users/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const user = await Users.findById(id);
        if (!user) {
            res.status(404).json({message: `user ${id} does not exist`})
        } else {
            res.json(user);
        }
    } 
    catch(e) {
            res.status(500).json({message: 'could not find user'})
        }
});

server.post('/api/users/:id', async (req, res) => {
    try {
        const newUser = await Users.insert(req.body)
        if (!newUser.name || !newUser.bio) {
            res.status(400).json({message: 'name and bio required'})
        } else {
            res.status(201).json(newUser)
        }
    }
    catch(e) {
        res.status(500).json({message: 'could not submit user information'})
    }
});

server.delete('/api/users/:id', async (req, res) => {
    let { id } = req.params; 
    try {
        const deleteUser = await Users.remove(id);
        if(!deleteUser) {
            res.status(404).json({message: `user ${id} does not exist`})
        } else {
            res.json(deleteUser);
        }
    }
    catch (e) {
        res.status(500).json({message: 'cannot remove user'})
    }
});

server.put('/api/users/:id', async (req, res) =>{
    let { id } = req.params;
    const updatedUser = await Users.update(id, req.body)
    if (!updatedUser) {
        res.status(404).json({message: `user ${id} does not exist`})
    } else if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({message: `name and bio required`})
    } else {
        res.json(updatedUser)
    }
 });



module.exports = {}; // EXPORT YOUR SERVER instead of {}
