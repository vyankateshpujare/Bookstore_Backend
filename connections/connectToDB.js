const mongoose = require("mongoose");

const connectToDB = async (uri) => {
  mongoose.connect(uri);
};

module.exports = { connectToDB };
