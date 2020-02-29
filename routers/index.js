const express = require('express');

const router = express.Router({ mergeParams: true });

const service = require('../services')

router.route('/')
    .get(async (req, res) => {
        try {
            const data = await service.countData();
            res.json({ status: 200, ...data });
        } catch (error) {
            console.error(error);
            return res.json({ status: 500, message: error });
        }
    })
    .post(async (req, res) => {
        try {
            const data = await service.saveData();
            if (data) return res.json({ status: 200, message: 'ok' });

            return res.json({ status: 500, message: 'something problem!' });
        } catch (error) {
            return res.json({ status: 500, message: error });
        }
    })
    .patch(async (req, res) => {
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
    })
    .delete(async (req, res) => {
        try {
            const data = await service.removeData();
            if (data) return res.json({ status: 200, message: 'ok' });

            return res.json({ status: 500, message: 'something problem!' });
        } catch (error) {
            return res.json({ status: 500, message: error });
        }
    });

module.exports = router;