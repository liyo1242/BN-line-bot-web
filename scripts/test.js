$(document).ready(function () {
    $("#next_getOn").click(function () {
        getOnPlace = $("#getOnPlace").val();
        if (getOnPlace) {
            $('#getOnPlace').attr('readonly', true);
            $(".btn").hide();
            $("#next_getOff,#getOff,#back").show();
            decideStep = 1;
        } else {
            alert("請輸入上車位置");
        }
    });
    $("#next_getOff").click(function () {
        getOffPlace = $("#getOffPlace").val();
        if (getOffPlace) {
            $('#getOffPlace').attr('readonly', true);
            $(".btn").hide();
            $("#taxi,#date,#back").show();
            decideStep = 2;
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
                $(".btn,#getOff").hide();
                $("#next_getOn").show();
                getOnPlace = "";
                decideStep = 0;
                break;
            case 2:
                $("#getOffPlace").attr("readOnly", false).val("");
                $("#dateTime").val("");
                $(".btn,#date").hide();
                $("#next_getOff,#back").show();
                getOffPlace = "";
                decideStep = 1;
                break;
            default:
                alert("error");
        }
    })
});

var decideStep = 0;
var getOnPlace;
var getOffPlace;
var dateTime;