const router = require('express').Router();
const upload = require('../middlewares/multerConfig');
const verify = require('../middlewares/verify');
const {
  signIn,
  signUp,
  editInfo,
  followUser,
  getAllUser
} = require('./../controllers/user');

router.post('/signup', signUp);

router.post('/signin', signIn);

router.put('/edit-info', verify, upload.any(), editInfo);

router.post('/follow', verify, followUser);

router.get('/all', verify, getAllUser);
module.exports = router;