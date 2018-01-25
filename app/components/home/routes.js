module.exports = router => {
    router.get('test1', (req, res, next) => res.send('its test 1 from home'));   
}