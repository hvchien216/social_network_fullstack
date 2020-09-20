const Post = require('./../models/post');
const Comment = require('./../models/comment');
const { handleErr } = require('../utils');

const addCommnet = async (req, res) => {
  try {
    const { text, post_id } = req.body;
    const newCmt = new Comment({
      text: text,
      postId: post_id,
      userId: req.user._id
    });
    const savedCmt = await newCmt.save();
    await Post.updateOne(
      { _id: post_id },
      {
        $push: { comments: savedCmt._id }
      });
    const post = await Post
      .findById(post_id)
      .populate({
        path: "comments",
        populate: { path: "userId", select: ['name', 'email', 'avatar'] }
      });
    res.json({
      success: true,
      post
    })
  } catch (err) {
    handleErr(res, err);
  }
}

const updateComment = async (req, res) => {
  try {
    const { text, cmt_id } = req.body
    await Comment.updateOne({ _id: cmt_id }, { $set: { text: text } })
    res.json({
      success: true,
      message: 'Chỉnh sửa bình luận thành công'
    })
  } catch (err) {
    handleErr(res, err);
  }
}

const deleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.body.cmt_id });
    res.json({
      success: true,
      message: 'Xóa bình luận thành công'
    })
  } catch (err) {
    handleErr(res, err);
  }
}

module.exports = { addCommnet, updateComment, deleteComment };