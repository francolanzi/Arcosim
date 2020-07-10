const fs = require('fs');
const path = require('path');

const cpntClasses = new Map();

var files = fs.readdirSync(__dirname + '/classes');
files.forEach(file =>
{
    file = path.parse(file);
    if (file.ext === '.js')
    {
        var cpnt = require('./classes/' + file.name);
        cpntClasses.set(cpnt.type, cpnt);
    }
});

var cpnts = new Map();

module.exports =
{
    cpntTypes: () => cpntClasses.keys(),
    getCpntImage: type => cpntClasses.get(type).image,
    addCpnt: type =>
        {
            var cpnt = new (cpntClasses.get(type))();
            var key = cpnt.constructor.type + cpnt.id;
            cpnts.set(key, cpnt);
            return cpnt.id;
        },
    removeCpnt: (type, id) => cpnts.delete(type + id)
};