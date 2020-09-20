const { registerValidation, loginValidation } = require('./../validations/user');
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinaryConfig');
const { handleErr } = require('../utils');

const signUp = async (req, res) => {

  const { name, email, password } = req.body;

  const { error } = registerValidation(req.body);

  if (error) {
    return res.json({
      success: false,
      message: error.details[0].message
    });
  }
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return handleErr(res, 'Email đã tồn tại');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashPassword
  });

  try {
    await user.save();
    res.json({
      success: true,
      message: 'Đăng ký thành công',
    });
  } catch (err) {
    handleErr(res, err);
  }

}

const signIn = async (req, res) => {
  const { email, password, typeLogin, imageUrl, name } = req.body;
  let error;
  if (typeLogin.toString() === "1") {
    const validation = loginValidation(req.body);
    error = validation.error;
  }
  // email
  if (error) {
    return handleErr(res, error.details[0].message);
  }

  //checking if the user is already in the database
  let user = await User.findOne({ email: email })
  if (typeLogin.toString() === '2') {
    if (!user) {
      const userData = new User({
        name,
        email,
        avatar: imageUrl
      });

      try {
        user = await userData.save();
      } catch (err) {
        handleErr(res, err);
      }
    }
  }
  if (!user) {
    return handleErr(res, 'Email hoặc mật khẩu sai!');
  }

  if (typeLogin.toString() === '1') {
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) {
      return handleErr(res, 'Mật khẩu không hợp lệ');
    }

  }
  const token = jwt.sign({
    _id: user.id,
    name: user.name
  }, process.env.JWT_SECRET);

  res.header('authorization').send({
    success: true,
    message: 'Đăng nhập thành công',
    user: {
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    },
    token
  });

}

const editInfo = async (req, res) => {
  try {
    const imgRes = req.files.length > 0
      ? await cloudinary.uploads(req.files[0].path)
      : '';
    imgRes
      ? await User.updateOne({ _id: req.user._id }, {
        $set: {
          name: req.body.name,
          avatar: imgRes.url
        }
      })
      : await User.updateOne({ _id: req.user._id }, {
        $set: {
          name: req.body.name
        }
      })
    const infoUser = await User.findById(req.user._id);
    infoUser.password = undefined;
    infoUser.__v = undefined;
    res.json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      user: infoUser
    })
  } catch (err) {
    handleErr(res, err);
  }
}

const followUser = async (req, res) => {
  try {
    const { user_followed } = req.body; //user sẽ được follow
    const { _id } = req.user;
    const userFollowed = await User.findById(user_followed);
    const follower = await User.findById(_id);
    const existUserFollowed = userFollowed.followers.includes(_id);
    const existFollower = follower.following.includes(userFollowed._id);
    existUserFollowed
      ? await User.updateOne({ _id: userFollowed._id }, {
        $pull:
          { followers: _id }
      })
      : await User.updateOne({ _id: userFollowed._id }, {
        $addToSet:
          { followers: _id }
      });

    existFollower
      ? await User.updateOne({ _id: _id }, {
        $pull:
          { following: userFollowed._id }
      })
      : await User.updateOne({ _id: _id }, {
        $addToSet:
          { following: userFollowed._id }
      });
    res.json({
      success: true,
      message: (existUserFollowed && existFollower)
        ? 'Hủy theo dõi thành công'
        : 'Theo dõi thành công'
    })
  } catch (err) {
    handleErr(res, err);
  }
}

const getAllUser = async (_, res) => {
  try {
    const users = await User
      .aggregate([
        {
          $project: {
            name: "$name",
            avatar: "$avatar",
            followers: { $size: "$followers" },
            following: { $size: "$following" }
          }
        },
        {
          $sort: {
            followers: -1,
            following: 1
          }
        }
      ]);

    res.json({
      success: true,
      users
    })
  } catch (err) {
    handleErr(res, err)
  }
}

module.exports = { signIn, signUp, editInfo, followUser, getAllUser };