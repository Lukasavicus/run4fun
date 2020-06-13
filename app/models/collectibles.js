let mongoose = require('mongoose');

let schema = mongoose.Schema({
	title: 			{type : String, require : true, unique : true},
	serie: 			{type : String, require : true},
	description: 	{type : String, require : true},
	value: 			{type : Number, require : true},
	icon: 			{type : String, require : true},
	hist: 			{type : String, require : true},
},
{
	timestamps: {
		createdAt: 	'created_at',
		updatedAt: 	'updated_at'
	}
}
);

mongoose.model('Collectible', schema);