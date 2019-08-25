const axios = require('axios')
const Dev = require('../models/Dev')

module.exports={
    async index(req, res){
        const { user } = req.headers       

        const loggedDev = await Dev.findById(user)
        
        if (! loggedDev){
            return res.status(400).json({ error: 'Logged Dev not exists'})
        }

        const users = await Dev.find({
            $and:[
                {_id: { $ne:  user } },
                {_id: { $nin: loggedDev.likes } },
                {_id: { $nin: loggedDev.dislikes } },
            ]
        })
        res.json(users)
    },
    async store(req, res){        
        const { username } = req.body
        
        if( username == undefined ){
            return res.status(400).json({ error: 'Dev user undefined'})
        }

        const userExists = await Dev.findOne({user: username})
        
        if (userExists){
            return res.json(userExists)
        }
        
        const respose = await axios.get(`https://api.github.com/users/${username}`)
        
        const { name, bio, avatar_url: avatar } = respose.data
        
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar,
        })
        
        return res.json(dev)
    }
} 