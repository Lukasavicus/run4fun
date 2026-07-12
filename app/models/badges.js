let mongoose = require('mongoose');

let schema = mongoose.Schema({
	title : 	{type : String, require : true, unique : true},
	criteria: 	{type : String, require : true},
	icon: 		{type : String, require : true},
	value: 		{type : Number, require : true},
	description:{type : String, require : true},
	group: 		{type : String, default : 'General'},
	sort_order: {type : Number, default : 0},
},
{
	timestamps: {
		createdAt: 	'created_at',
		updatedAt: 	'updated_at'
	}
}
);

mongoose.model('Badge', schema, (process.env.DB_PREFIX || '') + 'badges');
