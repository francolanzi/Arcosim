const $ = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');

const Computer = require('./js/computer');
const View = require('./js/view');

var computer = new Computer();

function trash(ev)
{
    var width = $('#trash').width();
    var height = $('#trash').height();
    var offset = $('#trash').offset();
    
    return ev.clientY >= offset.top
        && ev.clientX >= offset.left
        && ev.clientY <= offset.top + height
        && ev.clientX <= offset.left + width;
}

function drag(ev)
{
    var cpnt = $(this);

    var x = ev.clientX - cpnt.offset().left;
    var y = ev.clientY - cpnt.offset().top;

    function move(ev)
    {
        cpnt.css('top', ev.clientY - y);
        cpnt.css('left', ev.clientX - x);

        if (trash(ev))
        {
            cpnt.addClass('filter-invert');
            $('#trash').trigger('focus');
        }
        else
        {
            cpnt.removeClass('filter-invert');
            $('#trash').trigger('blur');
        }
    }

    function drop()
    {
        $(document).off('mousemove', move);
        $(document).off('mouseup', drop);

        if (cpnt.hasClass('filter-invert'))
        {
            var type = cpnt.attr('cpnt-type');
            var id = cpnt.attr('cpnt-id');
            computer.removeCpnt(type, id);
            cpnt.remove('.cpnt-instance');
            $('#trash').trigger('blur');
        }
    }

    if (cpnt.hasClass('cpnt-original'))
    {
        cpnt = cpnt.clone();
        $('#board').append(cpnt);
    
        cpnt.removeClass('cpnt-original');
        cpnt.addClass('cpnt-instance');
    
        cpnt.css('position', 'absolute');
        
        var type = cpnt.attr('cpnt-type');
        var id = computer.addCpnt(type);
    
        cpnt.attr('cpnt-id', id);
        cpnt.attr('id', type + id);

        cpnt.on('mousedown', drag);
        cpnt.on('dragstart', () => false);
    }

    $(document).on('mousemove', move);
    $(document).on('mouseup', drop);

    move(ev);
}

for (type of View.cpntTypes())
{
    let html = '\
        <div class="row justify-content-around my-3">\
            <div class="col-auto">\
                <div id="' + type + '" cpnt-type="' + type + '" class="cpnt-original m-0 p-0"></div>\
            </div>\
        </div>\
    ';

    $('#gallery').append(html);
    
    let cpnt = $('#' + type);

    let img = new Image();
    let src = View.getCpntImage(type);

    img.onload = () =>
    {
        cpnt.width(img.width);
        cpnt.height(img.height);
        cpnt.css('background-image', 'url(' + src + ')');
    };
    img.src = src;

    cpnt.on('mousedown', drag);
    cpnt.on('dragstart', () => false);
}

$('[data-toggle="tooltip"]').tooltip();

$('a').on('click', function() { $(this).trigger('blur'); });