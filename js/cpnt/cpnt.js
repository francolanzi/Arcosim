const fs = require('fs');
const path = require('path')

const cpntClasses = new Map();

const files = fs.readdirSync(__dirname + '/classes');
files.forEach(file =>
{
    file = path.parse(file);
    if (file.ext === '.js')
        cpntClasses.set(file.name, require('./classes/' + file.name));
});

module.exports =
{
    cpntTypes: () => cpntClasses.keys(),
    getImage: type => cpntClasses.get(type).image,
    addCpnt: type => new (cpntClasses.get(type))()
};