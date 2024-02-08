const db = require('../config/dbConfig.js')

async function findUserByUsername(username) {
    const conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
    conn.end();
    return rows;
}

module.exports = {
    findUserByUsername
}