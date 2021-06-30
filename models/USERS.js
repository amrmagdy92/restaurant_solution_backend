var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var USERS_SCHEMA = new mongoose.Schema({
    FULL_NAME: {
        type: String,
        required: true
    },
    EMAIL: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    PHONE: {
        type: String,
        required: true
    },
    PASSWORD: {
        type: String,
        required: true
    },
    USER_CREATE_DATE: {
        type: Date,
        default: Date.now
    },
    USER_IS_ADMIN: {
        type: Boolean,
        default: false
    },
    USER_EMPLOYEE_TYPE: {
        type: String,
        required: true
    },
    RESTAURANTS: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RESTAURANTS"
    }]
})

USERS_SCHEMA.pre('save', async function() {
    try {
        const NEW_USER = this;
        const SALT_FACTOR = 10;
        if (!NEW_USER.isModified('password')) return;
        const salt = await bcrypt.genSalt(SALT_FACTOR);
        const hash = await bcrypt.hash(NEW_USER.PASSWORD, salt, null);
        NEW_USER.PASSWORD = hash;
        return;
    } catch (error) {
        return Promise.reject(error)
    }
});

USERS_SCHEMA.methods.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.PASSWORD, function(err, isMatch) {
            return err ? reject(err) : resolve(isMatch);
        })
    })
};

module.exports = mongoose.model('USERS', USERS_SCHEMA);