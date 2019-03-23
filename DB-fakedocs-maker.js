var mongoose = require('mongoose');
var faker_en = require('faker/locale/en');
faker_ru = require('faker/locale/ru');

var News = require('./models/news');
var Category = require('./models/category');

var count = 0;

mongoose.connect('mongodb://main_author:main0author@ds048279.mlab.com:48279/mirnews', { useNewUrlParser: true }).then(
    () => {
        console.log('\x1b[1m', 'Successfuly connected to DataBase:)\n', '\x1b[0m');
        var query = Category.find(null, { en:1, ru: 1, pageColor:1 });
        query.exec(function (err, categories) {
            if (err) return err;
            for (let i = 0; i < faker_en.random.number({min: 3, max: 15}); i++) {
                var author = faker_en.name.findName();
                for (let j = 0; j < faker_en.random.number({min: 3, max: 5}); j++) {
                    const news = getNews(categories, author);
                }
                // news.save(function(error, result) {
                //         if (error) {
                //             console.log(error);
                //             return error;
                //         }
                //         console.log(result);
                //         return result;
                //     })
            }
            console.log('COUNT: ', count);
        });
    },
    err => {
        console.error('\x1b[31m', 'Connection to DataBase failed because of:', err.errmsg, '\x1b[0m');
        console.error('See also full error message: \n', err)
    }
);

function getNews(categories, author) {
    var category = faker_en.random.arrayElement(categories);
    var img =[];
    for (let i = 0; i < faker_en.random.number({min: 1, max: 8}); i++) {
        img.push('https://loremflickr.com/1280/720/' + category.en + '?lock=' + faker_en.random.number(9999))
    }

    const news = new News({
        author: author,
        date: faker_en.date.between(new Date(2019, 0), new Date(2019, 5)),
        title: {
            en: faker_en.lorem.sentence(3, 1),
            ru: faker_ru.lorem.sentence(3, 1),
        },
        article: {
            en: getArticle(img, 'en'),
            ru: getArticle(img, 'ru'),
        },
        preview: {
            en: faker_en.lorem.sentences(2),
            ru: faker_ru.lorem.sentences(2),
            img: 'https://loremflickr.com/400/300/' + category.en + '?lock=' + faker_en.random.number(9999)
        },
        category: [category],
        img: img
    })
    count++;
    console.log(news);
}

function getArticle(images, locale) {
    var article = '';
    images.forEach(image => {
        for (let i = 0; i < faker_en.random.number({min:1, max:5}); i++) {
            if(locale === 'en') var paragraph = '<p>' + faker_en.lorem.paragraph(faker_en.random.number({min:1, max:3})) + '</p>';
            if(locale === 'ru') var paragraph = '<p>' + faker_ru.lorem.paragraph(faker_en.random.number({min:1, max:3})) + '</p>';
            article = article + paragraph;
        }
        article = article + '<img src="'+ image+ '" class="img-fluid rounded mx-auto d-block mb-1">'
    });
    for (let i = 0; i < faker_en.random.number(3); i++) {
        if(locale === 'en') var paragraph = '<p>' + faker_en.lorem.paragraph(faker_en.random.number({min:1, max:3})) + '</p>';
        if(locale === 'ru') var paragraph = '<p>' + faker_ru.lorem.paragraph(faker_en.random.number({min:1, max:3})) + '</p>';
        article = article + paragraph;
    }
    return article;
}