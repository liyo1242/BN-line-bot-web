$(document).ready(function () {
    $("#next_getOn").click(function () {
        getOnPlace = $("#getOnPlace").val();
        if (getOnPlace) {
            $('#getOnPlace').attr('readonly', true);
            $(".feature").hide();
            $("#next_getOff,#back").show();
            $("table").css("height","80px");
            $(".icon").css("color", "black");
            $("#getOff .icon").css("color", "orange");
            decideStep = 1;
            $('.pac-container').remove();
        } else {
            alert("請輸入上車位置");
        }
    });
    $("#next_getOff").click(function () {
        getOffPlace = $("#getOffPlace").val();
        if (getOffPlace) {
            $('#getOffPlace').attr('readonly', true);
            $(".feature").hide();
            $("#taxi,#back").show();
            $("table").css("height","120px");
            $(".icon").css("color", "black");
            $("#date .icon").css("color", "orange");
            decideStep = 2;
            route();            
            $('.pac-container').remove();
        } else {
            alert("請輸入下車位置");
        }
    });
    $("#taxi").click(function () {
        dateTime = $("#dateTime").val();
        if (dateTime) {
            alert(getOnPlace + "\n" + getOffPlace + "\n" + dateTime);
        } else {
            alert("請輸入日期時間");
        }
    });
    $("#back").click(function () {
        switch (decideStep) {
            case 0:
                alert("error");
                break;
            case 1:
                $("#getOnPlace").attr("readOnly", false).val("");
                $("#getOffPlace").val("");
                $(".feature").hide();
                $("#next_getOn").show();
                $("table").css("height","40px");
                $(".icon").css("color", "black");
                $("#getOn .icon").css("color", "orange");
                getOnPlace = "";
                decideStep = 0;
                break;
            case 2:
                $("#getOffPlace").attr("readOnly", false).val("");
                $("#dateTime").val("");
                $(".feature").hide();
                $("#next_getOff,#back").show();
                $("table").css("height","80px");
                $(".icon").css("color", "black");
                $("#getOff .icon").css("color", "orange");
                getOffPlace = "";
                decideStep = 1;
                removeRoute();
                break;
            default:
                alert("error");
        }
    })
    $("i.clear").click(function(){
        var opacity = $(this).css("opacity");
        if(opacity == 1){
            $(this).prev().val("");
        }
    })
});

var decideStep = 0;
var getOnPlace;
var getOffPlace;
var dateTime;