const User = require("../models/user");
const Order = require("../models/order");

const handleGetOrderHistoryOfUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const userData = await User.findById(userid).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = await userData.orders.reverse();
    return res.status(200).json({ data: orderData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetAllOrders = async (req, res) => {
  try {
    const orderData = await Order.find()
      .populate("user")
      .populate("book")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: orderData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handlePlaceOrder = async (req, res) => {
  try {
    const { userid } = req.params;
    const { orders } = req.body;
    for (const order of orders) {
      const newOrder = await new Order({ user: userid, book: order._id });
      const response = await newOrder.save();
      //saving order in user model
      await User.findByIdAndUpdate(userid, {
        $push: { orders: response._id },
      });
      //clearing cart
      await User.findByIdAndUpdate(userid, {
        $pull: { cart: order._id },
      });
    }
    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateOrderStatus = async (req, res) => {
  try {
    const { orderid } = req.params;
    const order = await Order.findByIdAndUpdate(orderid, {
      status: req.body.status,
    });
    return res.status(200).json({data:order, message: "Status  updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handlePlaceOrder,
  handleGetOrderHistoryOfUser,
  handleGetAllOrders,
  handleUpdateOrderStatus,
};
