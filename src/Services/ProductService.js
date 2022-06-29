const ProductModel = require("../Models/ProductModel");
const { verifyAdminPermission } = require("./PermissionService");

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

const addNewProduct = async (req, res, next) =>{
  try {
    verifyAdminPermission(req);
    
    // Get the product data from the
    const productData = req.body.productData;
    
    
    const newProductDocument = new ProductModel(productData);
    
    await newProductDocument.save();
    
    res.send({ product: { ...newProductDocument.toObject(), id: newProductDocument._id }});
  } catch (error) {
   console.log(error) ;
  }
}

module.exports = {
  getProducts,
  addNewProduct,
};