let mongoose = require('mongoose');

let schema = mongoose.Schema({
	name: 			{type : String, required : true},
	email: 			{type : String, required : true, unique : true},
	login: 			{type : String, required : true, unique : true},
	password: 		{type : String, required : true},
	role: 			{type : String, required : true},
	balance : 		{type : Number, required : true},

	badges: 		{type : Array, default: []},
	collectibles: 	{type : Array, default: []},
	activities: 	{type : Array, default: []},
},
{
	timestamps: {
		createdAt: 	'created_at',
		updatedAt: 	'updated_at'
	}
});

mongoose.model('User', schema);