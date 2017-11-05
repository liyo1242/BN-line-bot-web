$(document).ready(function(){
    $("#confirm_1").click(function(){
        getOnPlace = $("#getOnPlace").val();
        if(getOnPlace)
        {
            $('#getOnPlace').attr('readonly', true);
            $(".confirm").hide();      
            $("#confirm_2,#getOff").show();
            decideStep = 1;
        }
        else{
            alert("請輸入上車位置");
        }
    });
    $("#confirm_2").click(function(){
        getOffPlace = $("#getOffPlace").val();
        if(getOffPlace){
            $('#getOffPlace').attr('readonly', true);
            $(".confirm").hide();      
            $("#confirm_3,#date").show();
            decideStep = 2;
        }
        else{
            alert("請輸入下車位置");
        }
    });
    $("#confirm_3").click(function(){
        dateTime = $("#dateTime").val();
        if(dateTime){
            alert(getOnPlace + "\n" + getOffPlace + "\n" + dateTime);
        }
        else{
            alert("請輸入日期時間");
        }
    });
});

var decideStep = 0;
var getOnPlace;
var getOffPlace;
var dateTime;