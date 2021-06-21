const INGREDIENT_MODEL = require('../models/ITEM_INGREDIENTS.js');

module.exports = {
    list: function (req, res) {
        INGREDIENT_MODEL.find(function (err, ingredients) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ingredient.',
                    error: err
                });
            }
            return res.json({data: ingredients, error: 0});
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        INGREDIENT_MODEL.findOne({_id: id}, function (err, ingredient) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ingredient.',
                    error: err
                });
            }
            if (!ingredient) {
                return res.status(404).json({
                    message: 'No such ingredient'
                });
            }
            return res.json({data: ingredient, error: 0});
        });
    },
    create: function (req, res) {
        var ingredient = new INGREDIENT_MODEL({
			INGREDIENT_NAME: req.body.name
        });
        ingredient.save(function (err, ingredient) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating ingredient',
                    error: err
                });
            }
            return res.status(201).json({data: ingredient, error: 0});
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        INGREDIENT_MODEL.findOne({_id: id}, function (err, ingredient) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ingredient',
                    error: err
                });
            }
            if (!ingredient) {
                return res.status(404).json({
                    message: 'No such ingredient'
                });
            }
            ingredient.name = req.body.name ? req.body.name : ingredient.INGREDIENT_NAME;
            ingredient.save(function (err, ingredient) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating ingredient.',
                        error: err
                    });
                }
                return res.json({data: ingredient, error: 0});
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        INGREDIENT_MODEL.findByIdAndRemove(id, function (err, ingredient) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the ingredient.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};