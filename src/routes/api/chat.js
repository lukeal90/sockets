const { ChatController } = require('../../controllers');


module.exports = router => {
    router.post('/', ChatController.save);
    return router;
};