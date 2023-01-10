var mongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://duc:duc1234@cluster0.6cdtvun.mongodb.net/test'
const { ObjectId } = require('bson')

async function insertNewProduct(newProduct) {
    let db = await getDB()
    let id = await db.collection("products").insertOne(newProduct)
    return id
}
async function getDB() {
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1003")
    return db
}
async function getAllProducts() {
    let db = await getDB()
    let results = await db.collection("products").find().toArray()
    return results
}
async function updateProduct(id, name, quantity, price, picUrl, category) {
    let db = await getDB()
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "quantity":quantity, "price": price, "picture": picUrl, "category": category } })
}
async function findProductById(id) {
    let db = await getDB()
    const productToEdit = await db.collection('products').findOne({ _id: ObjectId(id) })
    return productToEdit
}
async function deleteProductById(id) {
    let db = await getDB()
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}
async function findProductByName(nameSearch){
    let db = await getDB()
    const result = await db.collection("products").find({name: new RegExp(nameSearch, 'i')}).toArray()
    return result;
}
module.exports = {findProductByName, insertNewProduct,getAllProducts,updateProduct,findProductById,deleteProductById }