const db = require('../config/db');

class Url {
    static create(userId, originalUrl, shortUrl, friendlyName) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO urls (user_id, original_url, short_url, friendly_name) VALUES (?, ?, ?, ?)', 
            [userId, originalUrl, shortUrl, friendlyName], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findAllByUser(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM urls WHERE user_id = ?', [userId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static findByFriendlyName(userId, friendlyName) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM urls WHERE user_id = ? AND friendly_name = ?', [userId, friendlyName], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    static incrementClickCount(shortUrl, success) {
        return new Promise((resolve, reject) => {
            const column = success ? 'successful_clicks' : 'failed_clicks';
            db.query(`UPDATE urls SET ${column} = ${column} + 1 WHERE short_url = ?`, [shortUrl], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}

module.exports = Url;
