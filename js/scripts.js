const fs = require('fs');
const path = require('path');

const $ = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');

const Computer = require('./js/computer');

var computer = new Computer();

document.ondragstart = () => false;

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
            board.appendChild(instance);
            instance.cpnt = computer.addCpnt(instance.constructor.type);
        });

        cpnt.addEventListener('remove', ev =>
        {
            var cpnt = ev.detail;
            computer.removeCpnt(cpnt.constructor.type, cpnt.id);
        });
    
        gallery.firstElementChild.appendChild(cpnt);
    }
});

var anchor = document.getElementsByTagName('a');

for (let i = 0; i < anchor.length; i++)
    anchor[i].addEventListener('mousedown', ev => ev.preventDefault());

$('[data-toggle="tooltip"]').tooltip();