const fs = require('fs');
const path = require('path');

const cpntClasses = new Map();

var files = fs.readdirSync(__dirname + '/classes');
files.forEach(file =>
{
    file = path.parse(file);
    if (file.ext === '.js')
    {
        var elem = require('./classes/' + file.name);
        cpntClasses.set(elem.name, elem);
    }
});

module.exports =
{
    cpntTypes: () => cpntClasses.keys(),
    getCpntImage: type => cpntClasses.get(type).image,
    addCpnt: type => new (cpntClasses.get(type))()
};