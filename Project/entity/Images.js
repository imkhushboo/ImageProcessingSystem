const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    serialNumber: {
        type:Number, 
        required:true
    },
    productName: {
        type:String,
        required:true
    },
    inputImageUrls: {
        type: [String],
        default: []
    },
    outputImageUrls: {
        type:[String],
        default:[]
    },
    requestId: {
        type: String,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Image', imageSchema);