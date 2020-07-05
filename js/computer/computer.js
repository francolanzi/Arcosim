const fs = require('fs');
const path = require('path');

const cpntClasses = new Map();

var files = fs.readdirSync(__dirname + '/classes');
files.forEach(file =>
{
    file = path.parse(file);
    if (file.ext === '.js')
        cpntClasses.set(file.name, require('./classes/' + file.name));
});

module.exports =
{
    cpntTypes: () => cpntClasses.keys(),
    getCpntImage: type => cpntClasses.get(type).image,
    addCpnt: type => new (cpntClasses.get(type))()
};