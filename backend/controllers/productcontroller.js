const jwt=require("jsonwebtoken")
const productmodel = require("../modules/productschema")

const jwtSecret = () => process.env.JWT_SECRET || process.env.SECRET || process.env.secret

const addproduct=async (req,res) => {
    const {title,image,description,price}=req.body

    try{
      let token=req.cookies.user1
      if (!token) {
  return res.status(401).json({
    status: "Please login",
  });
}
      let tdata=jwt.verify(token,jwtSecret())
     if(tdata.role=="user"){
        return res.status(403).json({
            status:"unautharized access"
        })
     }
    await productmodel.create({
        title,
        image,
        description,
        price
    })   
    return res.status(200).json({
        status:"products added successsfully"
    }) 
      
    }
    catch(e){
res.status(400).json({
    status:"internal server error"
})
    }
}
const viewproducts = async (req, res) => {
  try {
    const allproducts = await productmodel.find();

    return res.status(200).json({
      status: "Fetched Successfully",
      data: allproducts,
    });
  } catch (e) {
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
};
const viewSingleProduct = async (req, res) => {
  try {
    const product = await productmodel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: "Product not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
};
module.exports={addproduct,viewproducts,viewSingleProduct};
