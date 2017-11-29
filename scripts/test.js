$(document).ready(function () {
    icon_active('#getOn>.icon');

    $('.clear').click(function(){
        $(this).prev().val('');
    })

    $('#next').click(function(){
        on = $('#getOnPlace').val()
        off = $('#getOffPlace').val()
        if($('.table').css('height') == '50px' && on)
        {
            $('.table').css('height','100px');
            icon_active('#getOff>.icon');
        }
        if(on && off)
        {
            lockMap();            
            $('#map').css('height', 'calc(100vh - 300px)');
            route();
            $('.carinfo-wrapper').css('height','300px');
            $('.table').css('height','0px').css('width','0px');
        }
        else if(!on && !off) alert('請輸入上車位置及下車位置');
        else if(!on) alert('請輸入上車位置');
        else if(!off && $('.table').css('height') != '50px') alert('請輸入下車位置');
    })

    $('.carinfo-content .back').click(function(){
        $('.carinfo-wrapper').css('height','0px');        
        $('#map').css('height', '100vh'); 
        $('.table').css('height','100px').css('width','90%');
        icon_active('#getOff>.icon');
        //callBear();
        unlockMap();
        removeRoute();
    })

    $('#getOn').click(function(){
        icon_active('#getOn>.icon');
    })

    $('#getOff').click(function(){
        icon_active('#getOff>.icon');
    })

    $("#book").click(function(){
        $("input#datetime").trigger('click');
    });
    
    $('.datetime-content .back').click(function(){
        $('input#datetime').val('');
    })

    $('input#datetime').change(function(){
        datetime = $('input#datetime').val();
        var html = `預約時間 : ` + datetime;
        $('.datetime-data').html(html);
    })
});

var getOnPlace;
var getOffPlace;
var datetime;

function icon_active(target){
    $('div.icon').css('color','black');
    $(target).css('color','orange');
}