const ProductModel = require("../Models/ProductModel");

const getProducts = async (req, res, next) => {
  // All of the logic on how to get the products

  // fetches data from database:
  try{
    const foundProducts = await ProductModel.find({});
  
     const formattedProducts = foundProducts.map(product => ({...product.toObject(), id: product._id}));

     res.send(formattedProducts);

  } catch(e){
    console.log('error: ', error)
  }

};

module.exports = {
  getProducts,
};