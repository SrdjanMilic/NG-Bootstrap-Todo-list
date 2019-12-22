const router = require('express').Router()

const controller = require('./controller');

// Todos routes
router.route('/')
  .get(controller.index)
  .post(controller.new);

router.route('/:id')
  .get(controller.view)
  .patch(controller.update)
  .put(controller.update)
  .delete(controller.delete);

// Export API routes
module.exports = router;