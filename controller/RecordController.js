const {Records} = require("../sequelize")
const {Op} = require("sequelize")
const {Users, Books} = require("../sequelize")

class RecordController{
    static async addRecord(req,res,next){
        console.log("masuk addRecord")
        console.log(req.body)
        if(!req.body.userId || !req.body.bookId || !req.body.status){
            res.status(400).json({
                message : "data can't be empty"
            })
        } else {
            Records.create(req.body)
            .then(response => {
                res.status(201).json({
                    message : "Record registered",
                    data : {
                        userId : response.userId,
                        bookId : response.bookId
                    }
                })
            })
            .catch(err=> {
                res.status(500).json({
                    error : err
                })
            })
        }

    }

    static findAll(req,res,next){
        console.log("masuk find all records")
        Records.findAll({
            include : [Users, Books]
        })
        .then(records => {
            res.status(200).json(records)
        })
        .catch(err=> {
            console.log(err)
            res.status(500).json({
                error : err
            })
        })
    }

    static findOne(req,res,next){
        Records.findOne({
            where : req.params
        })
        .then(records => {
            res.status(200).json(records)
        })
        .catch(err=> {
            res.status(500).json({
                error : err
            })
        })
    }

    static delete(req,res,next){
        console.log("masuk deleteRecord")
        Records.findOne({
            where : req.params
        }).then (record =>{
            if(!record) {
                res.status(404).json({message : "record is not registered"})
            } else {
                console.log("deleteing "+record.userId)
                Records.destroy({
                    where : req.params
                })
                .then(response => {
                    res.status(201).json({
                        message : "Record deleted",
                        data : {
                            userId : record.userId,
                            bookId : record.bookId
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
        console.log("masuk updateRecord")
        Records.findOne({
            where : req.params
        }).then (book =>{
            if(!book) {
                res.status(404).json({message : "book is not registered"})
            } else {
                console.log("deleteing "+book.userId)
                Records.update(req.body, 
                    {where : req.params}
                )
                .then(response => {
                    res.status(201).json({
                        message : "Record updated",
                        data : {
                            userId : book.userId,
                            bookId : book.bookId
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

module.exports = RecordController