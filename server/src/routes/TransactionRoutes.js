const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const protect = require('../middlewares/authMiddleware');
router.use(protect);

// POST /api/transactions
router.post('/', async (req, res) => {
    try {
        const txn = new Transaction({ ...req.body, userId: req.user.id }); // use ID from token
        const saved = await txn.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/transactions
router.get('/', async (req, res) => {
    try {
        const txns = await Transaction.find({ userId: req.user.id });
        res.json(txns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/transactions/:id
router.put('/:id', async (req, res) => {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
});

module.exports = router;