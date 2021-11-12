const express = require("express");
const router = express.Router();
const droneModel = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones

  droneModel
    .find()
    .then((drones) => {
      res.render("drones/list.hbs", { drones });
    })
    .catch(() => {
      next("Display list failed");
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  droneModel
    .create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      next("Add new drone failed");
    });
});

router.get("/drones/:droneId/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { droneId } = req.params;
  droneModel
    .findById(droneId)
    .then((drone) => {
      res.render("drones/update-form.hbs", { drone });
    })
    .catch(() => {
      next("Update fetch failed");
    });
});

router.post("/drones/:droneId/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { name, propellers, maxSpeed } = req.body;
  const { droneId } = req.params;
  droneModel
    .findByIdAndUpdate(droneId, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      next("Updated drone failed");
    });
});

router.get("/drones/:droneId/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { droneId } = req.params;
  droneModel
    .findByIdAndDelete(droneId)
    .then(() => {
      console.log("Delete successful!");
    })
    .catch(() => {
      next("Drone delete failed");
    });
});

router.post("/drones/:droneId/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { droneId } = req.params;
  droneModel
    .findByIdAndDelete(droneId)
    .then(() => {
      console.log("Delete successful!");
    })
    .catch(() => {
      next("Drone delete failed");
    });
});

module.exports = router;
