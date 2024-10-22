const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, urlController.createUrl);
router.get('/', authMiddleware, urlController.getUserUrls);
router.get('/friendly/:friendlyName', authMiddleware, urlController.getUrlByFriendlyName);
router.get('/:shortUrl', urlController.handleRedirect);

module.exports = router;
