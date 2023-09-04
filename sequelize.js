require("pg").defaults.parseInt8 = true
const Sequelize = require("sequelize")

const userModel = require("./models/user")
const bookModel = require("./models/books")
const recordModel = require("./models/records")

const sequelize = new Sequelize(
    "postgres",
    "postgres",
    "admin",
    {
        host : "127.0.0.1",
        dialect : "postgres",
        port : 5432
    }
)

const Users = userModel(sequelize, Sequelize.DataTypes)
const Books = bookModel(sequelize, Sequelize.DataTypes)
const Records = recordModel(sequelize, Sequelize.DataTypes)

Books.hasMany(Records, { foreignKey : "bookId" })
Users.hasMany(Records, { foreignKey : "userId" })
Records.belongsTo(Books, { foreignKey : "bookId" })
Records.belongsTo(Users, { foreignKey : "userId" })
// Books.belongsToMany(Users, {
//     as : "users",
//     through : Records,
//     foreignKey : "bookId"
// })
// Users.belongsToMany(Books, {
//     as : "books",
//     through : Records,
//     foreignKey : "userId"
// })

module.exports = {
    Users,
    Books,
    Records
}