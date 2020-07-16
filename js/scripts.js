const fs = require('fs');
const path = require('path');

const $ = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');

const Computer = require('./js/computer');

var computer = new Computer();

fs.readdirSync('js/view/cpnts').forEach(file =>
{
    file = path.parse(file);
    if (file.ext === '.js')
    {
        var ctor = require('./js/view/cpnts/' + file.name);
        var cpnt = new ctor(trash);

        cpnt.addEventListener('add', ev =>
        {
            var instance = ev.detail;
            var id = computer.addCpnt(instance.constructor.type);
            instance.cpnt = computer.getCpnt(instance.constructor.type, id);
        });

        cpnt.addEventListener('remove', ev =>
        {
            var cpnt = ev.detail.cpnt;
            computer.removeCpnt(cpnt.constructor.type, cpnt.id);
        });

        var col = document.createElement('div');
        col.classList.add('col-auto');
        col.appendChild(cpnt);
    
        var row = document.createElement('div');
        row.classList.add('row');
        row.classList.add('justify-content-around');
        row.classList.add('my-3');
        row.appendChild(col);
    
        gallery.appendChild(row);
    }
});

var anchor = document.getElementsByTagName('a');

for (let i = 0; i < anchor.length; i++)
    anchor[i].addEventListener('mouseup', function() { this.blur(); });

$('[data-toggle="tooltip"]').tooltip();