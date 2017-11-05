$(document).ready(function(){
    $("#confirm_1").click(function(){
        $(".confirm").hide();
        $("#confirm_2,#getOff").show();
        decideStep = 1;
    });
    $("#confirm_2").click(function(){
        $(".confirm").hide();
        $("#confirm_3,#date").show();
        decideStep = 2;
    });
    $("#confirm_3").click(function(){
        var getOnPlace = $("#getOnPlace").val();
        var getOffPlace = $("#getOffPlace").val();
        var dateTime = $("#dateTime").val();
        alert(getOnPlace + "\n" + getOffPlace + "\n" + dateTime);
    });
});

var decideStep = 0;