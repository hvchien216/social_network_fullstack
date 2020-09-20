const router = require('express').Router();
const upload = require('../middlewares/multerConfig');
const {
  createPost,
  getAllPost,
  getMyPost,
  likePost,
  deletePost
} = require('./../controllers/post');
router.post('/create', upload.any(), createPost)

router.get('/all/:page', getAllPost)

router.get('/my-post', getMyPost)

router.post('/like', likePost)

router.post('/delete', deletePost)

module.exports = router;