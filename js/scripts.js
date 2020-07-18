const fs = require('fs');
const path = require('path');

const $ = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');

const Menu = require('./js/view/menu/Menu');

const Computer = require('./js/computer');

var computer = new Computer();

document.ondragstart = () => false;

var menu = new Menu();

board.prepend(menu);

fs.readdirSync('js/view/cpnts').forEach(file =>
{
    file = path.parse(file);
    if (file.ext === '.js')
    {
        var ctor = require('./js/view/cpnts/' + file.name);
        var cpnt = new ctor(menu.getItem('trash'));

        cpnt.addEventListener('add', ev =>
        {
            var instance = ev.detail;
            board.appendChild(instance);
            instance.cpnt = computer.addCpnt(instance.constructor.type);
        });

        cpnt.addEventListener('remove', ev =>
        {
            var instance = ev.detail;
            computer.removeCpnt(instance.constructor.type, instance.cpnt.id);
        });
    
        gallery.firstElementChild.appendChild(cpnt);
    }
});

var anchor = document.getElementsByTagName('a');

for (let i = 0; i < anchor.length; i++)
    anchor[i].addEventListener('mousedown', ev => ev.preventDefault());

$('[data-toggle="tooltip"]').tooltip();