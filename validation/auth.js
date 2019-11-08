const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashOperation = async passwords => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassed = await bcrypt.hash(passwords, salt);
  return hashedPassed;
};

const comparePass = async (password, hashedPass) => {
  const checker = await bcrypt.compare(password, hashedPass);
  return checker;
};

const tokenGen = async id => {
  const token = jwt.sign(id, process.env.SECRET);
  return token;
};

module.exports = { hashOperation, tokenGen, comparePass };
