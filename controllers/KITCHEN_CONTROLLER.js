var KITCHEN_MODEL = require('../models/KITCHEN_DEPARTMENT');

module.exports = {
    list: function (req, res) {
        KITCHEN_MODEL.find(function (err, departments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting kitchen departments.',
                    error: err
                });
            }
            return res.json(departments);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        KITCHEN_MODEL.findOne({_id: id}, function (err, department) {
            if (err) {
                return res.status(500).json({
                    message: `Error getting the department with the id: ${id}.`,
                    error: err
                });
            }
            return res.json(department);
        });
    },
    create: function (req, res) {
        var new_KITCHEN_DEPARTMENT = new KITCHEN_MODEL({
            DEPARTMENT_NAME: req.body.department_name
        });
        new_KITCHEN_DEPARTMENT.save(function (err, department) {
            if (err) {
                return res.status(500).json({
                    message: `Error saving the department: ${req.body.department_name}`,
                    error: err
                });
            }
            return res.status(201).json(department);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        KITCHEN_MODEL.findOne({_id: id}, function(err, department) {
            if (err) {
                res.status(500).json({
                    message: 'Error updating the department',
                    error: err
                });
            }
            if (!department) {
                res.status(404).json({
                    message: 'No such department'
                });
            }
            department.DEPARTMENT_NAME = req.body.department_name ? req.body.department_name : department.DEPARTMENT_NAME
            department.CURRENT_DELIVERY_ORDERS = req.body.current_delivery_orders ? req.body.current_delivery_orders : department.CURRENT_DELIVERY_ORDERS
            department.CURRENT_DINE_ORDERS = req.body.current_dine_orders ? req.body.current_dine_orders : department.CURRENT_DINE_ORDERS
            department.save(function (err, department) {
                if (err) {
                    res.status(500).json({
                        message: `Error saving the department: ${department.DEPARTMENT_NAME}`,
                        error: err
                    })
                }
                return res.json(department)
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        KITCHEN_MODEL.findByIdAndRemove(id, function (err, department) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the department.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
}