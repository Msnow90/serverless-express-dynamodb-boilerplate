const router = require('express').Router();
const faker = require('faker');

// actions
const userActions = require('../../database/actions/users');

// utils
const reportError = require('../../utils/baseError');
const validateSchema = require('../../middleware/validateSchema');
const sanitizeBody = require('../../middleware/sanitizeBody');


// Get user by id
router.get('/:userId', async (req, res) => {
    
    const userId = req.sanitize(req.params.userId);
    
    try {

        const user = await userActions.getUser(userId);
        return res.status(200).json(user);
    
    } catch(err) {
    
        reportError(`Failed to fetch user with id of ${userId}.`, err);
        res.status(400).json(err); // just for purposes of the demo I'm allowing the full err to be reported
    }
})

// get all users
router.get('/', async (req, res) => {
    
    try {

        const users = await userActions.getUsers();
        return res.status(200).json(users);
    
    } catch(err) {
    
        reportError(`Failed to fetch user with id of ${userId}.`, err);
        res.status(400).json(err); // just for purposes of the demo I'm allowing the full err to be reported
    }
})

// Create a new user via req.body payload
router.post('/', validateSchema('userSchema'), async (req, res) => {
    
    try {

        const user = await userActions.createUser(req.body);
        return res.status(200).json(user);
    
    } catch(err) {
    
        reportError(`Failed to create user of payload: ${JSON.stringify(req.body)}.`, err);
        res.status(400).json(err);
    
    }
})


// generate random user
router.post('/generate-random', async (req, res) => {

    try {
        const payload = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            gender: faker.name.gender(),
            middleInitial: faker.name.middleName().substr(0,1).toUpperCase()
        }
        const user = await userActions.createUser(payload);
        return res.status(200).json(user);
    
    } catch(err) {
    
        reportError(`Failed to create random user.`, err);
        res.status(400).json(err);
    
    }

})


// update user by id
router.put('/:userId', sanitizeBody, async (req, res) => {
    const userId = req.sanitize(req.params.userId);

    try {
        const updatedRes = await userActions.updateUser(userId, req.body);
        return res.status(200).json(updatedRes);
    
    } catch(err) {
    
        reportError(`Failed to update user of id ${userId} with payload: ${JSON.stringify(req.body)}.`, err);
        res.status(400).json(err);
    
    }
    
})


// delete user by id
router.delete('/:userId', async (req, res) => {
    const userId = req.sanitize(req.params.userId);

    try {
        const user = await userActions.deleteUser(userId);
        return res.status(200).json(user);
    
    } catch(err) {
    
        reportError(`Failed to delete user of id ${userId}.`, err);
        res.status(400).json(err);
    
    }
    
})


module.exports = router;