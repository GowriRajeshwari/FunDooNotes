const jwt = require("jsonwebtoken");

GenerateToken = data_id => {
  {
    const token = jwt.sign({ data_id }, process.env.KEY, { expiresIn: "1h" }); // expires in 1 hour
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  }
};
module.exports = { GenerateToken };
