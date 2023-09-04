const {Books, Users, Records} = require("../sequelize")
const {Op} = require("sequelize")

class BookController{
    static async addBook(req,res,next){
        console.log("masuk addBook")
        console.log(req.body)
        if(!req.body.title || !req.body.author){
            res.status(400).json({
                message : "data can't be empty"
            })
        } else {
            Books.findOne({
                where : {
                    [Op.and] : [
                        {title : req.body.title},
                        {author : req.body.author}
                    ]
                }
            }).then (book =>{
                if(book) {
                    res.status(404).json({message : "book has been registered"})
                } else {
                    console.log("buku belum ada")
                    Books.create(req.body)
                    .then(response => {
                        res.status(201).json({
                            message : "Book registered",
                            data : {
                                title : response.title,
                                author : response.author
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
        Books.findAll()
        .then(books => {
            res.status(200).json(books)
        })
        .catch(err=> {
            res.status(500).json({
                error : err
            })
        })
    }

    static findOne(req,res,next){
        Books.findOne({
            where : req.params,
            include: [
                {
                    model: Records,
                    include : Users
                },
            ]
        })
        .then(books => {
            res.status(200).json(books)
        })
        .catch(err=> {
            res.status(500).json({
                error : err
            })
        })
    }

    static delete(req,res,next){
        console.log("masuk editBook")
        Books.findOne({
            where : req.params
        }).then (book =>{
            if(!book) {
                res.status(404).json({message : "book is not registered"})
            } else {
                console.log("deleteing "+book.title)
                Books.destroy({
                    where : req.params
                })
                .then(response => {
                    res.status(201).json({
                        message : "Book deleted",
                        data : {
                            title : book.title,
                            author : book.author
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
        console.log("masuk updateBook")
        Books.findOne({
            where : req.params
        }).then (book =>{
            if(!book) {
                res.status(404).json({message : "book is not registered"})
            } else {
                console.log("deleteing "+book.title)
                Books.update(req.body, 
                    {where : req.params}
                )
                .then(response => {
                    res.status(201).json({
                        message : "Book updated",
                        data : {
                            title : book.title,
                            author : book.author
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

module.exports = BookController