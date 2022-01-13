const router = require("express").Router();

const auth = require("../middlerware/auth");
const Task = require("../model/task");

// create task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// read all tasks
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });

    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

// read a task
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a task
router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedUpdatedKeys = ["description", "completed"];
  const reqKeys = Object.keys(req.body);

  const isValidUpdate = reqKeys.every((key) =>
    allowedUpdatedKeys.includes(key)
  );

  if (!isValidUpdate) return res.status(400).json({ msg: "Invalid Update " });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    reqKeys.forEach((update) => (task[update] = req.body[update]));

    task.save();

    res.json(task);
  } catch (error) {
    res.status(400).json(error);
  }
});

// delete a task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
