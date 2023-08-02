const mongoose = require('mongoose');

const blackTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
},{
    versionKey: false
})

const blackTokenModel = mongoose.model('blacktoken', blackTokenSchema);

module.exports = {blackTokenModel};
