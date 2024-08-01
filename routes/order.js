const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");
const isAdmin = require("../middlewares/isAdmin");
const {
  handlePlaceOrder,
  handleGetOrderHistoryOfUser,
  handleGetAllOrders,
  handleUpdateOrderStatus,
} = require("../controllers/order");

router.get(
  "/get-order-history/:userid",
  authenticateToken,
  handleGetOrderHistoryOfUser
);

router.get("/get-all-orders", authenticateToken, handleGetAllOrders);

router.post("/place-order/:userid", authenticateToken, handlePlaceOrder);

router.put(
  "/update-status/:orderid",
  authenticateToken,
  isAdmin,
  handleUpdateOrderStatus
);

module.exports = router;
