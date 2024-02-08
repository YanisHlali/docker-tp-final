const userModel = require("../models/user");

async function findUserByUsername(username) {
    const rows = await userModel.findUserByUsername(username);
    return rows;
}

module.exports = {
    findUserByUsername
}