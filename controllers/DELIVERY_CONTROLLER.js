var DELIVERY_ORDER_MODEL = require('../models/DELIVERY_ORDERS.js');

module.exports = {
    list: function (req, res) {
        DELIVERY_ORDER_MODEL.find(function (err, orders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }
            return res.json(orders);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        DELIVERY_ORDER_MODEL.findOne({_id: id}, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }
            if (!order) {
                return res.status(404).json({
                    message: 'No such order'
                });
            }
            return res.json(order);
        });
    },
    create: function (req, res) {
        var NEW_DINE_IN_ORDER = new DELIVERY_ORDER_MODEL({
			DELIVERY_PERSON : req.body.delivery_person,
			date : req.body.date,
			ORDER_ITEMS : req.body.order_items,
			ORDER_VALUE : req.body.order_value,
			PAID : req.body.paid,
			STATUS : req.body.complete
        });
        NEW_DINE_IN_ORDER.save(function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating order',
                    error: err
                });
            }
            return res.status(201).json(order);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        DELIVERY_ORDER_MODEL.findOne({_id: id}, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order',
                    error: err
                });
            }
            if (!order) {
                return res.status(404).json({
                    message: 'No such order'
                });
            }
            order.DELIVERY_PERSON = req.body.delivery_person ? req.body.delivery_person : order.DELIVERY_PERSON;
			order.date = req.body.date ? req.body.date : order.date;
			order.ORDER_ITEMS = req.body.order_items ? req.body.order_items : order.ORDER_ITEMS;
			order.ORDER_VALUE = req.body.order_value ? req.body.order_value : order.ORDER_VALUE;
			order.PAID = req.body.paid ? req.body.paid : order.PAID;
			order.STATUS = req.body.status ? req.body.status : order.STATUS;
            order.save(function (err, order) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating order.',
                        error: err
                    });
                }

                return res.json(order);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        DELIVERY_ORDER_MODEL.findByIdAndRemove(id, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the order.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};