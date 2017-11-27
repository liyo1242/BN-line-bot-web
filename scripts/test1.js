$(document).ready(function () {
    getOn_active();
    $('#next-geton').click(function(){
        $(this).hide();
        $('#next-getoff').show();
        $('.table').css('height','100px');
        getOff_active();
    })
    $('#next-getoff').click(function(){
        $('.carinfo-wrapper').css('height','300px');
        $('.table').css('height','0px').css('width','0px');
    })
    $('.carinfo-content .back').click(function(){
        $('.carinfo-wrapper').css('height','0px');
        $('.table').css('height','100px').css('width','90%');
        getOff_active();
    })
    $('#getOn').click(function(){
        getOn_active();
    })
    $('#getOff').click(function(){
        getOff_active();
    })
    $("#book").click(function(){
        $("input#datetime").trigger('click');
    });
    $('.datetime-content .back').click(function(){
        $('input#datetime').val('');
    })
    $('input#datetime').change(function(){
        var datetime = $('input#datetime').val();
        var html = `預約時間 : ` + datetime;
        $('.datetime-data').html(html);
    })
});

function getOn_active(){
    remove_active();
    $('#getOn>div.icon').css('color','orange');
}
function getOff_active(){
    remove_active();
    $('#getOff>div.icon').css('color','orange');
}
function remove_active(){
    $('div.icon').css('color','black');
}