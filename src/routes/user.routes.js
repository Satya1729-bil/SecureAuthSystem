const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth.middleware');

// All user routes require authentication
router.use(protect);

// Get own profile
router.get('/profile', (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
});

// Update own profile
router.patch('/profile', async (req, res, next) => {
  try {
    const User = require('../models/user.model');
    const allowedFields = ['name'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, message: 'Profile updated.', data: { user } });
  } catch (error) {
    next(error);
  }
});

// Deactivate own account
router.delete('/profile', async (req, res, next) => {
  try {
    const User = require('../models/user.model');
    await User.findByIdAndUpdate(req.user._id, { isActive: false });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message: 'Account deactivated successfully.' });
  } catch (error) {
    next(error);
  }
});

// Admin: Get all users
router.get('/', restrictTo('admin'), async (req, res, next) => {
  try {
    const User = require('../models/user.model');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit).sort('-createdAt');
    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: { users, total, page, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
