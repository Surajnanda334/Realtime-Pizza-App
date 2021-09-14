const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
    items: {
        type: Object,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        enum: [ 'COD',' ONLINE' ],
        default: 'COD'
    },
    ststus: {
        type: String,
        enum: [ 'ORDER_PLACED' ],
        default: 'ORDER_PLACED'
    }
},{ timestamps: true })
 
module.exports = mongoose.model('Order', orderSchema)