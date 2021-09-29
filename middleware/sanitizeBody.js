// Should only be used after a req.body payload has been validated schema wise
// This will scrub any malicious xss attempts from each field

module.exports = (req, res, next) => {

    const bodyKeys = Object.keys(req.body);
    
    bodyKeys.forEach(key => {
        req.body[key] = req.sanitize(req.body[key]);
    })

    next();

}