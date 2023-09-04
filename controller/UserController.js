const {Users, Books, Records} = require("../sequelize")

class UserController{
    static async register(req,res,next){
        console.log("masuk sini")
        if(!req.body.name){
            res.status(400).json({
                message : "data can't be empty"
            })
        } else {
            Users.findOne({
                where : req.body
            }).then (user =>{
                if(user) {
                    res.status(404).json({message : "name has been registered"})
                } else {
                    console.log("username belum ada")
                    Users.create(req.body)
                    .then(response => {
                        res.status(201).json({
                            message : "User created",
                            data : {
                                name : response.name
                            }
                        })
                    })
                    .catch(err=> {
                        res.status(500).json({
                            error : err
                        })
                    })
                }
            })
            .catch(err=> {
                res.status(500).json({
                    error : err
                })
            })
        }

    }

    static findAll(req,res,next){
        Users.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err=> {
            res.status(500).json({
                error : err
            })
        })
    }

    static findOne(req,res,next){
        Users.findOne({
            where : req.params,
            include: [
                {
                    model: Records,
                    include : Books
                },
            ]
        })
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err=> {
            res.status(500).json({
                error : err
            })
        })
    }

    static delete(req,res,next){
        console.log("masuk deleteUser")
        Users.findOne({
            where : req.params
        }).then (user =>{
            console.log(user)
            if(!user) {
                res.status(404).json({message : "user is not registered"})
            } else {
                console.log("deleting "+user.userId)
                Users.destroy({
                    where : req.params
                })
                .then(response => {
                    console.log(response)
                    res.status(201).json({
                        message : "User deleted",
                        data : {
                            userId : user.userId,
                            bookId : user.bookId
                        }
                    })
                })
                .catch(err=> {
                    res.status(500).json({
                        error : err
                    })
                })
            }
        })
        .catch(err=> {
            res.status(500).json({
                error : err
            })
        })
    }

    static update(req,res,next){
        console.log("masuk updateUser")
        Users.findOne({
            where : req.params
        }).then (user =>{
            if(!user) {
                res.status(404).json({message : "user is not registered"})
            } else {
                console.log("updating "+user.userId)
                Users.update(req.body, 
                    {where : req.params}
                )
                .then(response => {
                    res.status(201).json({
                        message : "User updated",
                        data : {
                            name : req.body.name
                        }
                    })
                })
                .catch(err=> {
                    res.status(500).json({
                        error : err
                    })
                })
            }
        })
        .catch(err=> {
            res.status(500).json({
                error : err
            })
        })
    }
}

module.exports = UserController