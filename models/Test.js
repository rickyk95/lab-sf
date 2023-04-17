const {Schema, model} = require('mongoose');
const testSchema = new Schema({
    nombre:String,
    precio:Number
});

const Test = model('Test',testSchema);



module.exports=Test;