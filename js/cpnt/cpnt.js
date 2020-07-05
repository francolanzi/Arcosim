const fs = require('fs');
const path = require('path')

const cpnt = new Map();

const files = fs.readdirSync(__dirname + '/classes');
files.forEach(file =>
{
    file = path.parse(file);
    if (file.ext === '.js')
        cpnt.set(file.name, require('./classes/' + file.name));
});

module.exports =
{
    list: () => cpnt.keys(),
    get: key => cpnt.get(key),
    new: key => new (cpnt.get(key))()
};