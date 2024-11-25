
const TaskModel = require('../models/task.model');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({})
            this.res.status(200).send(tasks);
        } catch (e) {
            this.res.status(500).send(e.message);
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id

            const task = await TaskModel.findById(taskId);

            if (!task) {
                return this.res.status(404).send('Task not found')
            }

            return this.res.status(200).send(task)

        } catch (e) {
            this.res.status(500).send(e.message);
        }
    }

    async createTask() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save()

            this.res.status(201).send(newTask);
        } catch (e) {
            this.res.status(500).send(e.message);
        }
    }

    async updateTask() {
        try {
            const taskId = this.req.params.id
            const taskData = this.req.body

            const taskToUpdate = await TaskModel.findById(taskId)

            const allowedUpdates = ['isCompleted']
            const requestedUpdates = Object.keys(taskData)

            for (let update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update]
                } else {
                    return this.res.status(400).send('One or more fields are not allowed to be updated')
                }
            }

            await taskToUpdate.save()

            return this.res.status(200).send(taskToUpdate)




        } catch (e) {
            this.res.status(500).send(e.message)
        }
    }

    async deleteTask() {
        try {
            const taskId = this.req.params.id

            const taskToDelete = await TaskModel.findById(taskId)

            if (!taskToDelete) {
                return this.res.status(404).send('Task not found')
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId)

            this.res.status(200).send(deletedTask)
        } catch (e) {
            this.res.status(500).send(e.message)
        }
    }
}


module.exports = TaskController;