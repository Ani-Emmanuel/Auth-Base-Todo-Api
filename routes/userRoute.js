const Router = require("express").Router();
const userModel = require("../model/userModel");
const Repo = require("../services/baseRepo");
const baseRepo = new Repo(userModel);
const claimCheck = require("../middlewares/accessControl");

Router.route("/user")
  .get(claimCheck("can-view-users"), async (req, res, next) => {
    try {
      const result = await baseRepo.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = req.body;
      await baseRepo.create(data);
      res.status(201).json({ message: "Todo created successfully" });
    } catch (error) {
      next(error);
    }
  });

Router.route("/user/:Id")
  .get(async (req, res, next) => {
    try {
      const { Id } = req.params;
      const record = await baseRepo.findOne(Id);
      res.status(200).json(record);
    } catch (error) {}
  })
  .put(async (req, res, next) => {
    try {
      const { Id } = req.params;
      const data = req.body;
      const { claim } = data;
      if (claim) {
        const user = await baseRepo.findOne(Id);

        //Checking if claim already exits
        if (user.claim.indexOf(claim) !== -1) {
          // user.claim.push(claim);
          delete data.claim;
          let newpayload = Object.assign(user, data);
          await baseRepo.update(Id, newpayload);
          res.status(200).json({ message: "Updated successfully" });
        } else {
          user.claim.push(claim);
          delete data.claim;
          let newpayload = Object.assign(user, data);
          await baseRepo.update(Id, newpayload);
          res.status(200).json({ message: "Updated successfully" });
        }
      } else {
        await baseRepo.update(Id, data);
        res.status(200).json({ message: "Updated successfully" });
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(claimCheck("can-delete-user"), async (req, res, next) => {
    try {
      const { Id } = req.params;
      const record = await baseRepo.deleteById(Id);
      res.status(200).json(record);
    } catch (error) {
      next(error);
    }
  });

Router.route("/login").post(baseRepo.login());
Router.route("/register").post(baseRepo.register());

module.exports = Router;
