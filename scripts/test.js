$(document).ready(function(){
    $("#confirm_1").click(function(){
        hideBtn();
        $("#confirm_2").show();
        decideStep = 1;
    });
    $("#confirm_2").click(function(){
        hideBtn();
        $("#confirm_3,#getOff").show();
    });
    $("#confirm_3").click(function(){
        hideBtn();
        $("#confirm_4").show();
        decideStep = 2;
    });
    $("#confirm_4").click(function(){
        hideBtn();
        $("#confirm_5,#date").show();
    });
    $("#confirm_5").click(function(){
    });
});

function hideBtn(){
    $(".confirm").hide();
}

var decideStep = 0;