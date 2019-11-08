const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const Repo = require("../services/baseRepo");

const baseRepo = new Repo(User);

// const { tokenGen, hashOperation } = require("../validation/auth");
function basechecker(claim = "") {
  return async (req, res, next) => {
    //Get token from header
    const token = req.header("user-token");

    if (!token) {
      return res.status(401).json({ message: "You are not authorized" });
    }

    try {
      //Validate Token
      const userId = jwt.verify(token, process.env.SECRET);

      //making sure userId is valid
      if (!userId) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      //check for claim before performing an action
      const loggedUser = await baseRepo.findAll(
        { $and: [{ _id: userId._id }, { claim: { $in: [claim] } } ] }
      );
      console.log(loggedUser);
      if (loggedUser.length <= 0) {
        return res
          .status(401)
          .json({ message: "you cannot perform this action" });
      } else {
        return next();
      }
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = basechecker;
