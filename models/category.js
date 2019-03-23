var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var schema = new Schema({
    en: {type: String, required: true},
    ru: {type: String, required: true},
    navColor: {type: String, required: true},
    navbar: {type: Number, required: true},
    pageColor: {type: String, required: true},
})

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Category', schema);