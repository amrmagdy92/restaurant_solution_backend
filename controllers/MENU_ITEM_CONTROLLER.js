var ITEM_MODEL = require('../models/MENU_ITEM.js');

module.exports = {
    list: function (req, res) {
        ITEM_MODEL.find(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            return res.json(Products);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        ITEM_MODEL.findOne({_id: id}, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }
            return res.json(Product);
        });
    },
    create: function (req, res) {
        var Product = new ITEM_MODEL({
			ITEM_NAME : req.body.item_name,
			ITEM_PRICE : req.body.item_price,
			ITEM_INGREDIENTS : req.body.item_ingredients,
			ITEM_CATEGORY : req.body.item_category

        });
        Product.save(function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Product',
                    error: err
                });
            }
            return res.status(201).json(Product);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        ITEM_MODEL.findOne({_id: id}, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product',
                    error: err
                });
            }
            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            Product.ITEM_NAME = req.body.item_name ? req.body.item_name : Product.ITEM_NAME;
			Product.ITEM_PRICE = req.body.item_price ? req.body.item_price : Product.ITEM_PRICE;
			Product.ITEM_INGREDIENTS = req.body.item_ingredients ? req.body.item_ingredients : Product.ITEM_INGREDIENTS;
			Product.ITEM_CATEGORY = req.body.item_category ? req.body.item_category : Product.ITEM_CATEGORY;
			
            Product.save(function (err, Product) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Product.',
                        error: err
                    });
                }

                return res.json(Product);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        ITEM_MODEL.findByIdAndRemove(id, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Product.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};