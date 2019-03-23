var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

// Children Schemas
var articleSchema = new Schema({
    en: {type: String, required: true},
    ru: {type: String, required: true},
}, {_id: false});

var titleSchema = new Schema({
    en: {type: String, required: true},
    ru: {type: String, required: true},
}, {_id: false});

var previewSchema = new Schema({
    en: {type: String, required: true},
    ru: {type: String, required: true},
    img: {type: String, required: true},
}, {_id: false});

var categorySchema = new Schema({
    en: {type: String, required: true},
    ru: {type: String, required: true},
    pageColor: {type: String, required: true},
})

// Parent Schema
var schema = new Schema({
    author: {type: String, required: true},
    date: {type: Date, required: true},
    title: titleSchema,
    article: articleSchema,
    preview: previewSchema,
    category: [categorySchema],
    img: [{type: String}],
})

schema.plugin(mongooseUniqueValidator);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('News', schema);
