const Router = require("express").Router();
const todoModel = require("../model/todoModel");
const Repo = require("../services/baseRepo");
const baseRepo = new Repo(todoModel);
const claimCheck = require("../middlewares/accessControl");

Router.route("/todo")
  .get(claimCheck("can-view-all"), async (req, res, next) => {
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

Router.route("/todo/:Id")
  .get(claimCheck("can-view-one"), async (req, res, next) => {
    try {
      const { Id } = req.params;
      const record = await baseRepo.findOne(Id);
      res.status(200).json(record);
    } catch (error) {}
    next(error);
  })
  .put(async (req, res, next) => {
    try {
      const { Id } = req.params;
      await baseRepo.update(Id, data);
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      next(error);
    }
  })
  .delete(claimCheck("can-delete"), async (req, res, next) => {
    try {
      const { Id } = req.params;
      const record = await baseRepo.deleteById(Id);
      res.status(200).json(record);
    } catch (error) {
      next(error);
    }
  });

module.exports = Router;
