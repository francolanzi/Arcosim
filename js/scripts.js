const $ = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');

const Computer = require('./js/computer');
const View = require('./js/view');

var computer = new Computer();

function overTrash(ev)
{
    var rect = trash.getBoundingClientRect();
    
    return ev.clientY >= rect.top
        && ev.clientX >= rect.left
        && ev.clientY <= rect.bottom
        && ev.clientX <= rect.right;
}

function drag(ev)
{
    var cpnt = this;

    var rect = cpnt.getBoundingClientRect();
    var x = ev.clientX - rect.left;
    var y = ev.clientY - rect.top;

    function move(ev)
    {
        cpnt.style.top = ev.clientY - y;
        cpnt.style.left = ev.clientX - x;

        if (overTrash(ev))
        {
            cpnt.classList.add('filter-invert');
            trash.focus();
        }
        else
        {
            cpnt.classList.remove('filter-invert');
            trash.blur();
        }
    }

    function drop()
    {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', drop);

        if (cpnt.classList.contains('filter-invert'))
        {
            var type = cpnt.getAttribute('cpnt-type');
            var id = cpnt.getAttribute('cpnt-id');
            computer.removeCpnt(type, id);
            cpnt.remove();
            trash.blur();
        }
    }

    if (cpnt.classList.contains('cpnt-original'))
    {
        cpnt = cpnt.cloneNode(true);
        board.appendChild(cpnt);
    
        cpnt.classList.remove('cpnt-original');
        cpnt.classList.add('cpnt-instance');

        cpnt.style.position = 'absolute';
        
        var type = cpnt.getAttribute('cpnt-type');
        var id = computer.addCpnt(type);
    
        cpnt.setAttribute('cpnt-id', id);
        cpnt.setAttribute('id', type + id);

        cpnt.addEventListener('mousedown', drag);
        
        cpnt.ondragstart = () => false;
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', drop);

    move(ev);
}

for (let type of View.cpntTypes())
{
    let cpnt = document.createElement('div');
    cpnt.id = type;
    cpnt.setAttribute('cpnt-type', type);
    cpnt.classList.add('cpnt-original');
    cpnt.classList.add('m-0');
    cpnt.classList.add('p-0');

    let col = document.createElement('div');
    col.classList.add('col-auto');
    col.appendChild(cpnt);

    let row = document.createElement('div');
    row.classList.add('row');
    row.classList.add('justify-content-around');
    row.classList.add('my-3');
    row.appendChild(col);

    gallery.appendChild(row);

    let img = new Image();
    let src = View.getCpntImage(type);

    img.onload = () =>
    {
        cpnt.style.width = img.width;
        cpnt.style.height = img.height;
        cpnt.style.backgroundImage = 'url(' + src + ')';
    };
    img.src = src;

    cpnt.addEventListener('mousedown', drag);

    cpnt.ondragstart = () => false;
}

var anchor = document.getElementsByTagName('a');

for (let i = 0; i < anchor.length; i++)
    anchor[i].addEventListener('click', function() { this.blur(); });

$('[data-toggle="tooltip"]').tooltip();