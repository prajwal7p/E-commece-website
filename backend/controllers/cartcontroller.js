const cartmodel = require("../modules/cartschema");
const productmodel = require("../modules/productschema");

function formatCart(cart) {
  if (!cart) {
    return [];
  }

  return cart.items
    .filter((item) => item.product)
    .map((item) => ({
      _id: item.product._id,
      title: item.product.title,
      image: item.product.image,
      description: item.product.description,
      price: item.product.price,
      quantity: item.quantity,
    }));
}

async function getCart(req, res) {
  try {
    const cart = await cartmodel
      .findOne({ userEmail: req.user.email })
      .populate("items.product");

    return res.status(200).json({
      status: "Cart fetched successfully",
      data: formatCart(cart),
    });
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
}

async function addToCart(req, res) {
  const productId = req.body.productId || req.body._id;

  try {
    const product = await productmodel.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "Product not found",
      });
    }

    let cart = await cartmodel.findOne({ userEmail: req.user.email });

    if (!cart) {
      cart = await cartmodel.create({
        userEmail: req.user.email,
        items: [{ product: product._id, quantity: 1 }],
      });
    } else {
      const item = cart.items.find(
        (cartItem) => cartItem.product.toString() === product._id.toString()
      );

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ product: product._id, quantity: 1 });
      }

      await cart.save();
    }

    const updatedCart = await cartmodel
      .findOne({ userEmail: req.user.email })
      .populate("items.product");

    return res.status(200).json({
      status: "Product added to cart",
      data: formatCart(updatedCart),
    });
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
}

async function updateCartItem(req, res) {
  const { action } = req.body;

  try {
    const cart = await cartmodel.findOne({ userEmail: req.user.email });

    if (!cart) {
      return res.status(404).json({
        status: "Cart not found",
      });
    }

    const item = cart.items.find(
      (cartItem) => cartItem.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        status: "Product not found in cart",
      });
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      item.quantity -= 1;
    }

    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    await cart.save();

    const updatedCart = await cartmodel
      .findOne({ userEmail: req.user.email })
      .populate("items.product");

    return res.status(200).json({
      status: "Cart updated successfully",
      data: formatCart(updatedCart),
    });
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
}

async function removeCartItem(req, res) {
  try {
    const cart = await cartmodel.findOne({ userEmail: req.user.email });

    if (!cart) {
      return res.status(404).json({
        status: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (cartItem) => cartItem.product.toString() !== req.params.productId
    );

    await cart.save();

    const updatedCart = await cartmodel
      .findOne({ userEmail: req.user.email })
      .populate("items.product");

    return res.status(200).json({
      status: "Product removed from cart",
      data: formatCart(updatedCart),
    });
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
