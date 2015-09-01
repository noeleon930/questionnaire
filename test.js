var fs = require('fs');
var j2xls = require('json2xls-xml')({pretty: true});

var doc = {
    Foo: [
        {firstname: 'John', lastname: 'Doo', numbers: [1, 2, 3, 4, 5, 6]}
        , {firstname: 'Foo', lastname: 'Bar', age: 23, weight: 25.7876, birth: new Date()}
    ]
    , Bar: [
        {firstname: 'Rene', lastname: 'Malin'}
        , {firstname: 'Foo', lastname: 'foobar', age: 73, weight: 22225.33, birth: new Date()}
    ]
};

// console.log(j2xls(doc));
fs.writeFile('test.xls', j2xls(doc), function (err) {
    console.log(err);
});
