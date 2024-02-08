const db = require('../config/dbConfig.js')

async function createPost(content, image_path, poster_ip) {
    const conn = await db.getConnection();
    const rows = await conn.query("INSERT INTO posts(content, image_path, poster_ip, created_at) VALUES (?, ?, ?, ?)", [content, image_path, poster_ip, new Date()]);
    conn.end();
    return rows;
}

async function createPostWithUserId(content, image_path, poster_ip, userId) {
    const conn = await db.getConnection();
    const rows = await conn.query("INSERT INTO posts(content, image_path, poster_ip, created_at, userId) VALUES (?, ?, ?, ?, ?)", [content, image_path, poster_ip, new Date(), userId]);
    conn.end();
    return rows;
}

async function getAllPosts() {
    const conn = await db.getConnection();
    let rows;

    rows = await conn.query(`SELECT posts.id, posts.content, posts.image_path, posts.poster_ip, posts.created_at, users.username 
    FROM posts 
    LEFT JOIN users ON posts.userId = users.id 
    ORDER BY posts.created_at DESC;
    `);

    rows.map(row => {
        if (!row.username) {
            row.username = 'Anonyme';
        }
        return row;
    });

    conn.end();
    return rows;
}

module.exports = {
    createPost,
    createPostWithUserId,
    getAllPosts
}