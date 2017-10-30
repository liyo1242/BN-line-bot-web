$(document).ready(function(){
    $("#confirm_1").click(function(){
        hideBtn();
        $("#confirm_2").show();
    });
    $("#confirm_2").click(function(){
        hideBtn();
        $("#confirm_3,#getOff").show();
    });
    $("#confirm_3").click(function(){
        hideBtn();
        $("#confirm_4").show();
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