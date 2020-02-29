const express = require('express');

const router = express.Router({ mergeParams: true });

const service = require('../services')

router.route('/')
    .get(async (req, res) => {
        try {
            const data = await service.saveData();
            if (data) return res.json({ status: 200, message: 'ok' });

            return res.json({ status: 500, message: 'something problem!' });
        } catch (error) {
            return res.json({ status: 500, message: error });
        }
    });

module.exports = router;