const { hashOperation, tokenGen, comparePass } = require("../validation/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class baseRepo {
  constructor(model) {
    this.model = model;
    // this.register = this.register.bind(this);
  }

  findAll(doc={}) {
    return this.model.find(doc);
  }

  findOne(id) {
    return this.model.findById({ _id: id });
  }

  create(name) {
    const todo = new this.model(name);
    return todo.save();
  }

  deleteById(id) {
    return this.model.findByIdAndDelete({ _id: id });
  }

  update(id, data) {
    return this.model.findByIdAndUpdate({ _id: id }, { $set: data });
  }

  login() {
    return async (req, res, next) => {
      try {
        const { username, password } = req.body;
        const user = await this.model.findOne({ username: username });
        const newpassword = await comparePass(password, user.password);

        if (!newpassword) {
          return res
            .status(404)
            .json({ message: "Wrong Username Or Password" });
        } else {
          const token = await tokenGen({ _id: user.id }, process.env.SECRET);
          res.header({ "user-token": token });
          return res.status(200).json({ message: "you are loggedin" });
        }
      } catch (error) {
        return next(error);
      }
    };
  }

  register() {
    return async (req, res, next) => {
      console.log("this is it " + req.body.password);
      try {
        const hashedPass = await hashOperation(req.body.password);
        const user = new this.model(req.body);
        delete user.password;
        user.password = hashedPass;
        await user.save();
        return res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        return next(error);
        POST;
      }
    };
  }
}

module.exports = baseRepo;
