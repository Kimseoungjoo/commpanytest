var oldVal= "";
var text_arr = [];
// input 값 실시간 변경 감지
$("#in_search").on("propertychange change keyup paste input", function() {
    var currentVal = $(this).val();
    if(currentVal == oldVal) {
        return;
    }
 
    oldVal = currentVal;
    for(var i=1; i<$(".name").length+1;i++){
        var name_text = $("tbody > tr:nth-child("+i+") > .name").text();
        if(name_text.includes(currentVal)){
            var str = $("tbody > tr:nth-child("+i+")").html();
            var obj = {KEY:i, TD:str};
            text_arr.push(obj);
        }
        
    }
    // 검색할 떄 동일한게 있다면 
    if(text_arr.length!=0){
        $("tbody").empty();
        
        for(arr in text_arr){
            console.log(text_arr[arr].TD);
            console.log("=================================");
            var new_tr = document.createElement('tr');
            new_tr.innerHTML = text_arr[arr].TD;
            $("tbody").append(new_tr);

        }
        text_arr = [];
    }
    // body > section > div > div.tbl_body > table > tbody > tr:nth-child(1) > td.name
});