const express = require('express');

const TaskModel = require('../models/task.model');
const TaskController = require('../controllers/task.controller');

const router = express.Router();

router.get('/', async (req, res) => {
    return new TaskController(req, res).getTasks();
})

router.get('/:id', async (req, res) => {
    try {
        const taskId = req.params.id

        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send('Task not found')
        }

        return res.status(200).send(task)

    } catch (e) {
        res.status(500).send(e.message);
    }
})


router.post('/', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save()

        res.status(201).send(newTask);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const taskId = req.params.id
        const taskData = req.body

        const taskToUpdate = await TaskModel.findById(taskId)

        const allowedUpdates = ['isCompleted']
        const requestedUpdates = Object.keys(taskData)

        for (update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update]
            } else {
                return res.status(400).send('One or more fields are not allowed to be updated')
            }
        }

        await taskToUpdate.save()

        return res.status(200).send(taskToUpdate)




    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id

        const taskToDelete = await TaskModel.findById(taskId)

        if (!taskToDelete) {
            return res.status(404).send('Task not found')
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId)

        res.status(200).send(deletedTask)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router;