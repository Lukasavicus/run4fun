let mongoose = require('mongoose');

let schema = mongoose.Schema({
	name: 			{type : String, required : true},
	email: 			{type : String, required : true, unique : true},
	login: 			{type : String, required : true, unique : true},
	password: 		{type : String, required : true},
	role: 			{type : String, required : true},
	balance : 		{type : Number, required : true},
	public_settings: {
		badges: 		{type : Boolean, default : true},
		collectibles: 	{type : Boolean, default : true},
		kpis: 			{type : Boolean, default : true},
		runs: 			{type : Boolean, default : false},
	},

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

mongoose.model('User', schema, (process.env.DB_PREFIX || '') + 'users');
