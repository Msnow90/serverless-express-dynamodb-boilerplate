const router = require('express').Router();
const userActions = require('../../database/actions/users');

// utils
const reportError = require('../../utils/baseError');
const validateSchema = require('../../middleware/validateSchema');

router.get('/user/:userId', async (req, res) => {
    
    const userId = req.sanitize(req.params.userId);
    
    try {

        const user = await userActions.getUser(userId);
        return res.status(200).json(user);
    
    } catch(err) {
    
        reportError(`Failed to fetch user with id of ${userId}.`, err);
        res.status(400).json(err); // just for purposes of the demo I'm allowing the full err to be reported
    }
})


router.post('/user', validateSchema('userSchema'), async (req, res) => {
    
    
    
    try {

        const user = await userActions.createUser(req.body);
        return res.status(200).json(user);
    
    } catch(err) {
    
        reportError(`Failed to create user of payload: ${JSON.stringify(req.body)}.`, err);
        res.status(400).json(err);
    
    }
})


module.exports = router;