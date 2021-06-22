const CUSTOMER_MODEL = require('../models/CUSTOMER_PROFILE.js');
const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

module.exports = {
    list: async function (req, res) {
        try {
            const customers = await CUSTOMER_MODEL.find();
            return typeof req.query.pretty !== 'undefined' ? 
                   res.send(JSON.stringify(customers, null, 4)) :
                   res.json({data:customers, error: 0});
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
            const customer = await CUSTOMER_MODEL.findOne({_id: id});
            if (!customer) {
                throw Error('No such customer');
            }
            return typeof req.query.pretty !== 'undefined' ? 
                   res.send(JSON.stringify(customer, null, 4)) :
                   res.json({data:customer, error: 0});
        } catch (error) {
            return res.status(500).json({
                code: 1001,
                error: error.message || error
            });
        }
    },
    create: async function (req, res) {
        try {
            const customer = new CUSTOMER_MODEL({
                CUSTOMER_NAME: req.body.customer_name,
                CUSTOMER_PHONE_NUMBER: req.body.customer_phone_number,
                CUSTOMER_ADDRESSES: req.body.customer_addresses,
                CUSTOMER_ORDERS: req.body.customer_orders,
                CUSTOMER_CLASS: req.body.customer_class
            });
            await customer.save();
            return res.status(201).json({data:customer, error: 0});
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
            const customer = await CUSTOMER_MODEL.findOne({_id: id}); 
            if (!customer) {
                throw Error('No such customer');
            }
            customer.CUSTOMER_NAME = req.body.customer_name ? req.body.customer_name : customer.CUSTOMER_NAME;
            customer.CUSTOMER_PHONE_NUMBER = req.body.customer_phone_number ? req.body.customer_phone_number : customer.CUSTOMER_PHONE_NUMBER;
            customer.CUSTOMER_ADDRESSES = req.body.customer_addresses ? req.body.customer_addresses : customer.CUSTOMER_ADDRESSES;
            customer.CUSTOMER_ORDERS = req.body.customer_orders ? req.body.customer_orders : customer.CUSTOMER_ORDERS;
            customer.CUSTOMER_CLASS = req.body.customer_class ? req.body.customer_class : customer.CUSTOMER_CLASS;
            const updated_customer = await customer.save();
            return res.json({data:updated_customer, error: 0});
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
            await CUSTOMER_MODEL.findByIdAndRemove(id);
            return res.status(204).json();
        } catch(error) {
            return res.status(500).json({
                code: 1004,
                error: error.message || error
            });
        }
    }
}