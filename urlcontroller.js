const Url = require('../models/Url');

exports.createUrl = async (req, res) => {
    const { originalUrl, friendlyName } = req.body;
    const shortUrl = generateShortUrl(); 
    try {
        await Url.create(req.userId, originalUrl, shortUrl, friendlyName);
        res.status(201).json({ shortUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserUrls = async (req, res) => {
    try {
        const urls = await Url.findAllByUser(req.userId);
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUrlByFriendlyName = async (req, res) => {
    const { friendlyName } = req.params;
    try {
        const urls = await Url.findByFriendlyName(req.userId, friendlyName);
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.handleRedirect = async (req, res) => {
    const { shortUrl } = req.params;
    const success = Math.random() > 0.1; 
    try {
        await Url.incrementClickCount(shortUrl, success);
        if (success) {
            res.redirect('http://original-url.com'); 
        } else {
            res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
