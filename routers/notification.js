const express = require('express');

const router = express.Router({ mergeParams: true });

const service = require('../services')

router.route('/')
    .get(async (req, res) => {
        const title = req.query.title || 'No title';
        const body = req.query.body || 'No Body';
        try {
            const data = await service.sendNotification({ title, body });
            if (data) return res.json({ status: 200, message: 'ok' });
    
            return res.json({ status: 500, message: 'something problem!' });
        } catch (error) {
            return res.json({ status: 500, message: error });
        }
    })
    .post(async (req, res) => {
        const title = req.body.title || 'No title';
        const body = req.body.body || 'No Body';
        try {
            const data = await service.sendNotification({ title, body });
            if (data) return res.json({ status: 200, message: 'ok' });
    
            return res.json({ status: 500, message: 'something problem!' });
        } catch (error) {
            return res.json({ status: 500, message: error });
        }
    });

module.exports = router;