let mongoose = require('mongoose');

let schema = mongoose.Schema({
	date: 				{type : Date, require : true},
	physical_activity: 	{type : String, require : true},
	place: 				{type : String, require : true},
	route_distance: 	{type : Number, require : true},
	time: 				{type : String, require : true},
	avg_vlct: 			{type : Number, require : true},
},
{
	timestamps: {
		createdAt: 	'created_at',
		updatedAt: 	'updated_at'
	}
});

mongoose.model('Activity', schema);