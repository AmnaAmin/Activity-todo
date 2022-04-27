const router = require("express-promise-router")();
const uuid = require('uuid');
const database = require('../database/db');

router.get('/', async (req, res) => {
    const result = await database.getAllActivities();
    res.status(200).json(result)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await database.getActivity(id);
    if (result)
        res.status(200).json(result);
    else
        res.sendStatus(404)
});

router.post('/', async (req, res) => {

    const activity = { ...req.body, status: req.body.status === true ? 1 : 0, id: uuid.v4() };
    await database.addActivity(activity)
    res.status(200).json(activity);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    await database.updateActivity({ id, ...update });
    res.status(200).json({ message: 'success' })
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await database.removeActivity(id);
    res.status(200).json({ message: 'success' });
});

module.exports = router;