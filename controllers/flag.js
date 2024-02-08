const flagModel = require('../models/flag');

async function getFlag(req, res) {
    const flag = await flagModel.getFlag();
    res.render('flag', { flag });
}

module.exports = {
    getFlag
}