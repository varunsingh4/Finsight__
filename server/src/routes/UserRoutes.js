const express = require('express');
const router = express.Router();
const User = require('../models/User');
const protect = require('../middlewares/authMiddleware');

// Apply middleware globally
router.use(protect);

// PUT /api/users/:id/risk-profile
router.put('/:id/risk-profile', async (req, res) => {
    try {
        const { riskProfile } = req.body;
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { riskProfile },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

module.exports = router;
