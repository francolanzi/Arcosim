const jQuery = $ = require('jquery');
require('jquery-ui-dist/jquery-ui');
require('bootstrap/dist/js/bootstrap.bundle');

const computer = require('./js/computer');

for (type of computer.cpntTypes())
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
    let src = computer.getCpntImage(type);

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