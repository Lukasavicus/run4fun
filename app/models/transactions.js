let mongoose = require('mongoose')

let schema = mongoose.Schema({
	date: 		{type : Date, require : true},
	value: 		{type : Number, require : true},
	type: 		{type : String, require : true},
	description:{type : String, require : true},
	user_id: 	{type : mongoose.Schema.ObjectId, require : true}
},
{
	timestamps: {
		createdAt: 	'created_at',
		updatedAt: 	'updated_at'
	}
});

mongoose.model('Transaction', schema);