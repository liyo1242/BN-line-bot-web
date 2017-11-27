$(document).ready(function () {
    getOn_active();
    $('#next-geton').click(function(){
        $(this).hide();
        $('#next-getoff').show();
        $('.table').css('height','100px');
        getOff_active();
    })
    $('#next-getoff').click(function(){
        $('.info-wrapper').css('height','300px');
        $('.table').css('height','0px').css('width','0px');
    })
    $('.info-content .back').click(function(){
        $('.info-wrapper').css('height','0px');
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
        $("input#dateTime").trigger('click');
    });
    $('.datetime-content .back').click(function(){
        $('.datetime-wrapper').css('height','0px');
        $('input#dateTime').val('');
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