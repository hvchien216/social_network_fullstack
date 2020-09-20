const Post = require('./../models/post');
const Comment = require('./../models/comment');
const cloudinary = require('../utils/cloudinaryConfig');
const { handleErr } = require('../utils');
const { populate } = require('./../models/post');
``
const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const imgRes = req.files.length > 0
      ? await cloudinary.uploads(req.files[0].path)
      : '';
    const post = new Post({
      text,
      photo: req.files.length > 0
        ? imgRes.url
        : "",
      postedBy: req.user._id,
    });
    await post.save();
    const postAfterPopulate = await Post.findById(post._id).populate(
      'postedBy',
      ['email', 'name', '_id']
    );
    return res.json({
      success: true,
      message: 'Tạo bài viết thành công',
      post: postAfterPopulate
    });

  } catch (err) {
    handleErr(res, err);
  }
}

const getAllPost = async (req, res) => {
  try {
    const perPage = 2;
    const numPage = req.params.page;
    const postListLength = await Post.estimatedDocumentCount();
    const totalPage = Math.ceil(postListLength / perPage);
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((perPage * numPage) - perPage)
      .limit(perPage)
      .populate(
        'postedBy',
        ['email', 'name', 'avatar', '_id']
      )
      .populate({
        path: "comments",
        populate: { path: "userId", select: ['name', 'email', 'avatar'] }
      });
    ;
    // .populate(
    //   "comments",
    //   []
    // )
    res.json({
      success: true,
      page: numPage,
      totalPage,
      posts,
    })
  } catch (err) {
    handleErr(res, err);
  }
}

const getMyPost = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate(
        'postedBy',
        ['email', 'name', '_id']
      )
      .populate('likes', ['name'])
      .populate('comments', populate('userId', ['name']));
    res.json({
      success: true,
      posts
    })
  } catch (err) {
    handleErr(res, err);
  }
}

const likePost = async (req, res) => {
  try {
    const { post_id } = req.body;
    const { _id } = req.user;
    const postSingle = await Post.findById(post_id);
    const exist = postSingle.likes.includes(_id);
    exist
      ? await Post.updateOne({ _id: post_id }, {
        $pull:
          { likes: _id }
      })
      : await Post.updateOne({ _id: post_id }, {
        $addToSet:
          { likes: _id }
      });
    const post = await Post.findById(post_id).populate({ path: 'comments.userId' });
    res.json({
      success: true,
      post
    })
  } catch (err) {
    handleErr(res, err);
  }
}

const deletePost = async (req, res) => {
  try {
    const { post_id } = req.body;
    const post = await Post.findById(post_id);
    await Comment.deleteMany({ _id: { $in: post.comments } })
    await Post.deleteOne({ _id: post_id });
    res.json({
      success: true,
      message: 'Xóa bài viết thành công',
    })
  } catch (err) {
    handleErr(res, err);
  }
}

module.exports = {
  createPost,
  getAllPost,
  getMyPost,
  likePost,
  deletePost
};