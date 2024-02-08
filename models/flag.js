const db = require('../config/dbConfig.js')

async function getFlag() {
    const conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM flag");
    conn.end();
    return rows[0].flag;
}

module.exports = {
    getFlag
}