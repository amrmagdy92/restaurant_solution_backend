var RESTAURANT_MODEL = require('../models/RESTAURANTS.js');

module.exports = {
    list: function (req, res) {
        RESTAURANT_MODEL.find(function (err, Restaurants) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Restaurant.',
                    error: err
                });
            }
            return res.json(Restaurants);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        RESTAURANT_MODEL.findOne({_id: id}, function (err, Restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Restaurant.',
                    error: err
                });
            }
            if (!Restaurant) {
                return res.status(404).json({
                    message: 'No such Restaurant'
                });
            }
            return res.json(Restaurant);
        });
    },
    create: function (req, res) {
        var Restaurant = new RESTAURANT_MODEL({
			RESTAURANT_NAME : req.body.restaurant_name,
			RESTAURANT_ADDRESS : req.body.restaurant_address,
			DINE_IN_ORDERS : req.body.restaurant_dine_in,
            DELIVERY_ORDERS: req.body.restaurant_delivery,
			RESTAURANT_MENU : req.body.restaurant_menu,
			RESTAURANT_MANAGER : req.body.restaurant_manager,
			RESTAURANT_WAITERS : req.body.restaurant_waiters

        });

        Restaurant.save(function (err, Restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Restaurant',
                    error: err
                });
            }
            return res.status(201).json(Restaurant);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        RESTAURANT_MODEL.findOne({_id: id}, function (err, Restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Restaurant',
                    error: err
                });
            }
            if (!Restaurant) {
                return res.status(404).json({
                    message: 'No such Restaurant'
                });
            }

            Restaurant.RESTAURANT_NAME = req.body.restaurant_name ? req.body.restaurant_name : Restaurant.RESTAURANT_NAME;
			Restaurant.RESTAURANT_ADDRESS = req.body.restaurant_address ? req.body.restaurant_address : Restaurant.RESTAURANT_ADDRESS;
			Restaurant.DINE_IN_ORDERS = req.body.restaurant_dine_in ? req.body.restaurant_dine_in : Restaurant.DINE_IN_ORDERS;
            Restaurant.DELIVERY_ORDERS = req.body.restaurant_delivery ? req.body.restaurant_delivery : Restaurant.DELIVERY_ORDERS;
			Restaurant.RESTAURANT_MENU = req.body.restaurant_menu ? req.body.restaurant_menu : Restaurant.RESTAURANT_MENU;
			Restaurant.RESTAURANT_MANAGER = req.body.restaurant_manager ? req.body.restaurant_manager : Restaurant.RESTAURANT_MANAGER;
			Restaurant.RESTAURANT_WAITERS = req.body.restaurant_waiters ? req.body.restaurant_waiters : Restaurant.RESTAURANT_WAITERS;
			
            Restaurant.save(function (err, Restaurant) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Restaurant.',
                        error: err
                    });
                }

                return res.json(Restaurant);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        RESTAURANT_MODEL.findByIdAndRemove(id, function (err, Restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Restaurant.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};