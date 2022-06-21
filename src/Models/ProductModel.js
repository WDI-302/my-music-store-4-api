// THis is the file where you are going to have the logic to fetch data and insert data in databases.
const mongoose = require('mongoose');
const uuid = require('uuid');


const productSchema = new mongoose.Schema({
  // id: { type: String, required: true, default: () => uuid.v4()},
  title: { type: String, required: true},
  description: { type: String, required: true},
  brand: { type: String, required: true},
  price: { type: Number, required: true},
  image: { type: String, required: true},
});

// THE MODEL IS THE OBJECT THATS GOING TO HAVE THE METHODS/functions TO READ AND CHANGE THE DB.
const ProductModel = mongoose.model('Product', productSchema);


module.exports = ProductModel;