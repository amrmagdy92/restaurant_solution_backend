const USER_MODEL    = require('../models/USERS.js');
const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

module.exports = {
    list: async function (req, res) {
        try {
            const users = await USER_MODEL.find();
            return typeof req.query.pretty !== 'undefined' ? 
                   res.send(JSON.stringify(users, null, 4)) :
                   res.json({data:users, error: 0});
        } catch (error) {
            return res.status(500).json({
                code: 1000,
                error: error.message || error
            });
        }
    },
    show: async function (req, res) {
        try {
            const { id } = req.params;
            if(!id || !checkForHexRegExp.test(id)) {
                throw Error(`${id} is not a valid MongoDB ID`)
            }
            const user = await USER_MODEL.findOne({_id: id});
            if (!user) {
                throw Error('No such user');
            }
            return typeof req.query.pretty !== 'undefined' ? 
                   res.send(JSON.stringify(user, null, 4)) :
                   res.json({data:user, error: 0});
        } catch (error) {
            return res.status(500).json({
                code: 1001,
                error: error.message || error
            });
        }
    },
    create: async function(req, res) {
        try {
            const user = new USER_MODEL({
                EMAIL    : req.body.email,
                FULL_NAME : req.body.full_name,
                PASSWORD : req.body.password,
                RESTAURANTS: req.body.restaurants,
                PHONE: req.body.phone,
                USER_IS_ADMIN: req.body.user_is_admin,
                USER_EMPLOYEE_TYPE: req.body.user_employee_type
            });
            await user.save();
            return res.status(201).json({data:user, error: 0});
        } catch (error) {
            return res.status(500).json({
                code: 1002,
                error: error.message || error
            });
        }
    },
    update: async function (req, res) {
        try {
            const { id } = req.params;
            if(!id || !checkForHexRegExp.test(id)) {
                throw Error(`${id} is not a valid MongoDB ID`)
            }
            const user = await USER_MODEL.findOne({_id: id}); 
            if (!user) {
                throw Error('No such user');
            }
            user.PHONE = req.body.phone ? req.body.phone : user.phone;
            user.EMAIL  = req.body.email  ? req.body.email  : user.email;
            user.FULL_NAME  = req.body.fullname  ? req.body.fullname  : user.fullname;
            user.PASSWORD = req.body.password ? req.body.password : user.PASSWORD;
            user.RESTAURANTS = req.body.restaurants ? req.body.restaurants : user.RESTAURANTS;
            user.USER_IS_ADMIN = req.body.user_is_admin ? req.body.user_is_admin : user.USER_IS_ADMIN;
            user.USER_EMPLOYEE_TYPE = req.body.user_employee_type ? req.body.user_employee_type : user.USER_EMPLOYEE_TYPE;
            const updatedUser = await user.save();
            return res.json({data:updatedUser, error: 0});
        } catch (error) {
            return res.status(500).json({
                code: 1003,
                error: error.message || error
            });
        }
    },
    remove: async function (req, res) {
        try {
            const id = req.params.id;
            await USER_MODEL.findByIdAndRemove(id);
            return res.status(204).json();
        } catch(error) {
            return res.status(500).json({
                code: 1004,
                error: error.message || error
            });
        }
    }
};