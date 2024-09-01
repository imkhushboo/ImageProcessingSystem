const express = require('express');
const { uploadCSV, uploadCSVFile, checkStatus } = require('../businessLogic/imageQuality');
const router = express.Router();

router.post('/upload', uploadCSVFile, uploadCSV);
router.get('/status/:requestId', checkStatus);

module.exports = router;
