const cartmodel = require("../modules/cartschema");
const ordermodel = require("../modules/orderschema");

function formatOrder(order) {
  return {
    _id: order._id,
    items: order.items,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
  };
}

async function createOrder(req, res) {
  try {
    const cart = await cartmodel
      .findOne({ userEmail: req.user.email })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        status: "Cart is empty",
      });
    }

    const items = cart.items
      .filter((item) => item.product)
      .map((item) => ({
        product: item.product._id,
        title: item.product.title,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      }));

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await ordermodel.create({
      userEmail: req.user.email,
      items,
      total,
    });

    cart.items = [];
    await cart.save();

    return res.status(201).json({
      status: "Order placed successfully",
      data: formatOrder(order),
    });
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await ordermodel
      .find({ userEmail: req.user.email })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "Orders fetched successfully",
      data: orders.map(formatOrder),
    });
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
}

module.exports = {
  createOrder,
  getOrders,
};
