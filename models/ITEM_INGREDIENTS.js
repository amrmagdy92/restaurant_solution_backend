const mongoose   = require('mongoose');
const { Schema } = mongoose;

const ITEM_INGREDIENT_SCHEMA = new mongoose.Schema({
	INGREDIENT_NAME: {
		type: String,
		trim: true,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('ITEM_INGREDIENT', ITEM_INGREDIENT_SCHEMA);