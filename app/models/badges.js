let mongoose = require('mongoose');

let schema = mongoose.Schema({
	title : 	{type : String, require : true, unique : true},
	criteria: 	{type : String, require : true},
	icon: 		{type : String, require : true},
	value: 		{type : String, require : true},
	description:{type : String, require : true},
},
{
	timestamps: {
		createdAt: 	'created_at',
		updatedAt: 	'updated_at'
	}
}
);

mongoose.model('Badge', schema);