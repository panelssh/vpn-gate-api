const express = require('express');

const router = express.Router({ mergeParams: true });

const service = require('../services')

router.route('/')
    .get(async (req, res) => {
        const message = {};

        // try removeData
        try {
            const data = await service.removeData();
            if (data) message.delete = true;
            else message.delete = false;
        } catch (error) {
            return res.json({ status: 500, message: error });
        }

        // try saveData
        try {
            const data = await service.saveData();
            if (data) message.insert = true;
            else message.insert = false;
        } catch (error) {
            return res.json({ status: 500, message: error });
        }

        return res.json({ status: 200, ...message });
    });

module.exports = router;