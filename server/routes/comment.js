const router = require('express').Router();
const {
  addCommnet,
  updateComment,
  deleteComment
} = require('./../controllers/comment');
router.post('/add', addCommnet)

router.put('/update', updateComment)

router.delete('/delete', deleteComment)

module.exports = router;
