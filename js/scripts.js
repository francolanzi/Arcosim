const jQuery = $ = require('jquery');
require('jquery-ui-dist/jquery-ui');
require('bootstrap/dist/js/bootstrap.bundle');

const Computer = require('./js/computer');

for (type of Computer.cpntTypes())
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
    let src = Computer.getCpntImage(type);

    img.onload = () =>
    {
        cpnt.width(img.width);
        cpnt.height(img.height);
        cpnt.css('background-image', 'url(' + src + ')');
    };
    img.src = src;

    cpnt.draggable({
        helper: 'clone',
        appendTo: '#board',
        containment: '#board'
    });
}

var computer = new Computer();

$('#board').droppable({
    drop: function(ev, ui)
    {
        if ($(ui.draggable).hasClass('cpnt-original'))
        {
            var clone = $(ui.draggable).clone();
            $(this).append(clone);

            clone.removeClass('cpnt-original');
            clone.addClass('cpnt-instance');

            clone.css('position', 'absolute');
            clone.css('top', ui.offset.top);
            clone.css('left', ui.offset.left);

            clone.draggable({
                containment: '#board'
            });
            
            var type = clone.attr('cpnt-type');
            var id = computer.addCpnt(type);

            clone.attr('cpnt-id', id);
            clone.attr('id', type + id);
        }
    }
});

$('#trash').droppable({
    greedy: true,
    tolerance: 'pointer',
    drop: (ev, ui) =>
    {
        var type = $(ui.draggable).attr('cpnt-type');
        var id = $(ui.draggable).attr('cpnt-id');
        computer.removeCpnt(type, id);
        $(ui.draggable).remove('.cpnt-instance');
        $(ev.target).trigger('blur');
    },
    over: (ev, ui) =>
    {
        $(ui.helper).addClass('filter-invert');
        $(ev.target).trigger('focus');
    },
    out: (ev, ui) =>
    {
        $(ui.helper).removeClass('filter-invert');
        $(ev.target).trigger('blur');
    }
});

$('[data-toggle="tooltip"]').tooltip();

$('a').on('click', function() { $(this).trigger('blur'); });