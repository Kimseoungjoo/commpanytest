var oldVal= "";
var text_arr = [];
var total_arr = [ // price = 거래가격, d_price = 전일종가 , conclusion = "거래대금"
    {"f_name":"비트코인","l_name":"BTC/KRW","price":50000000,"d_price":50000000,"conclusion":1212354,"e_name":"Bitcoin", "percent":0},
    {"f_name":"이더리움","l_name":"ETH/KRW","price":3300000,"d_price":3300000,"conclusion":457651,"e_name":"Ethereum", "percent":0},
    {"f_name":"비트코인캐시","l_name":"BCH/KRW","price":376000,"d_price":376000,"conclusion":789215,"e_name":"Bitcoin Cash", "percent":0},
    {"f_name":"에이브","l_name":"AAVE/KRW","price":35260,"d_price":35260,"conclusion":547351,"e_name":"Aave", "percent":0},
    {"f_name":"라이트코인","l_name":"RTC/KRW","price":4000,"d_price":4000,"conclusion":345421,"e_name":"Litecoin", "percent":0},
    {"f_name":"솔라나","l_name":"SOL/KRW","price":7000,"d_price":7000,"conclusion":365724,"e_name":"Solana", "percent":0},
    {"f_name":"비트코인에스브이","l_name":"BSV/KRW","price":100000,"d_price":100000,"conclusion":134548,"e_name":"Bitcoin SV", "percent":0},
    {"f_name":"에이다","l_name":"ADA/KRW","price":10200,"d_price":10200,"conclusion":987421,"e_name":"Ada", "percent":0},
    {"f_name":"코스모스","l_name":"ATOM/KRW","price":45000,"d_price":45000,"conclusion":145621,"e_name":"Cosmos", "percent":0},
    {"f_name":"스트라이크","l_name":"STRK/KRW","price":7800,"d_price":7800,"conclusion":562178 ,"e_name":"Strike", "percent":0},
    {"f_name":"비트코인골드","l_name":"BTG/KRW","price":39000,"d_price":39000,"conclusion":548951,"e_name":"Bitcoin Gold", "percent":0},
    {"f_name":"이더리움클래식","l_name":"ETC/KRW","price":34800,"d_price":34800,"conclusion":651321,"e_name":"Ethereum Classic", "percent":0},
    {"f_name":"퀀텀","l_name":"QTUM/KRW","price":500,"d_price":500,"conclusion":789124,"e_name":"Qtum", "percent":0},
    {"f_name":"네오","l_name":"NEO/KRW","price":4700,"d_price":4700,"conclusion":987251,"e_name":"NEO", "percent":0},
    {"f_name":"플로우","l_name":"FLOW/KRW","price":32450,"d_price":32450,"conclusion":564816,"e_name":"Flow", "percent":0},
    {"f_name":"가스","l_name":"GAS/KRW","price":900,"d_price":900,"conclusion":21005,"e_name":"Gas", "percent":0},
    {"f_name":"톤","l_name":"TON/KRW","price":4610,"d_price":4610,"conclusion":516205,"e_name":"Ton", "percent":0},
    {"f_name":"카바","l_name":"KAVA/KRW","price":8700,"d_price":8700,"conclusion":156215 ,"e_name":"Kava", "percent":0},
    {"f_name":"아발란체","l_name":"AVAX/KRW","price":40000,"d_price":40000,"conclusion":688146,"e_name":"Avalanche", "percent":0},
    {"f_name":"엑시인피니티","l_name":"AXS/KRW","price":80000,"d_price":80000,"conclusion":651897,"e_name":"Axie Infinity", "percent":0},
    {"f_name":"카이버네트워크","l_name":"KNC/KRW","price":3000,"d_price":3000,"conclusion":78177,"e_name":"Kyber Network", "percent":0},
    {"f_name":"아르고","l_name":"AERGO/KRW","price":12000,"d_price":12000,"conclusion":481218,"e_name":"Aergo", "percent": 0},
];

setInterval(function (){

    for(row in total_arr){
        var rand = Math.floor(Math.random()*2);
        if(rand ==0){
            total_arr[row].price = total_arr[row].price - (Math.floor(Math.random()*10)*100);
            total_arr[row].conclusion -= rand;
        }else{
            total_arr[row].price = total_arr[row].price + (Math.floor(Math.random()*10)*100);
            total_arr[row].conclusion += rand;
        }
    }
    var name = $("#in_name").text();
    if(name=='한글명'){
        create_k_tbl();
    }else{
        create_e_tbl();
    }
},1000); // 초당 돌아가는 함수 끝

function create_k_tbl(){ // 테이블 창에 띄우기 
    var s_src = $("#sortPrice img").attr("src");
    var d_src = $("#d_pre img").attr("src"); 
    var c_src = $("#conclu img").attr("src"); 
    if(s_src=="https://cdn.upbit.com/images/ico_up_down_2.71770c7.png"){
        a();
    }else if(s_src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"){
        b();
    }else if(d_src=="https://cdn.upbit.com/images/ico_up_down_2.71770c7.png"){
        c();
    }else if(d_src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"){
        d();
    }else if(c_src=="https://cdn.upbit.com/images/ico_up_down_2.71770c7.png"){
        e();
    }else if(c_src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"){
        f();
    }
    for(row in total_arr){
        var tbl_tr = $("tbody tr:nth-child("+(Number(row)+1)+")");
        var td_name = "<strong>"+total_arr[row].f_name+"</strong></br>"+total_arr[row].l_name;
        total_arr[row].percent = Number((((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) * 100).toFixed(2));

        if(((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) > 0){

            tbl_tr.attr('class','up');
            var d_percent = "+"+(((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) * 100).toFixed(2)+"%</br>+"+(total_arr[row].price-total_arr[row].d_price);

        }else if(((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) < 0){

            tbl_tr.attr('class','down');
            var d_percent = (((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) * 100).toFixed(2)+"%</br>"+(total_arr[row].price-total_arr[row].d_price);

        }else{
            var d_percent = (((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) * 100).toFixed(2)+"%</br>"+(total_arr[row].price-total_arr[row].d_price);
        }

        tbl_tr.children(":eq(1)").html(td_name);
        tbl_tr.children(":eq(2)").html(addComma(total_arr[row].price));
        tbl_tr.children(":eq(3)").html(d_percent);
        tbl_tr.children(":eq(4)").html(addComma(total_arr[row].conclusion)+"백만");
    }
}
function create_e_tbl(){ // 영어이름으로~ 
    var s_src = $("#sortPrice img").attr("src");
    var d_src = $("#d_pre img").attr("src"); 
    var c_src = $("#conclu img").attr("src"); 
    if(s_src=="https://cdn.upbit.com/images/ico_up_down_2.71770c7.png"){
        a();
    }else if(s_src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"){
        b();
    }else if(d_src=="https://cdn.upbit.com/images/ico_up_down_2.71770c7.png"){
        c();
    }else if(d_src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"){
        d();
    }else if(c_src=="https://cdn.upbit.com/images/ico_up_down_2.71770c7.png"){
        e();
    }else if(c_src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"){
        f();
    }
    for(row in total_arr){
        var tbl_tr = $("tbody tr:nth-child("+(Number(row)+1)+")");
        var td_name = "<strong>"+total_arr[row].e_name+"</strong></br>"+total_arr[row].l_name;
        total_arr[row].percent = Number((((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) * 100).toFixed(2));

        if(((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) > 0){

            tbl_tr.attr('class','up');
            var d_percent = "+"+(((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) * 100).toFixed(2)+"%</br>"+(total_arr[row].price-total_arr[row].d_price);

        }else if(((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) < 0){

            tbl_tr.attr('class','down');
            var d_percent = (((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) * 100).toFixed(2)+"%</br>-"+(total_arr[row].price-total_arr[row].d_price);

        }else{
            var d_percent = (((total_arr[row].price - total_arr[row].d_price)/total_arr[row].d_price) * 100).toFixed(2)+"%</br>"+(total_arr[row].price-total_arr[row].d_price);
        }

        tbl_tr.children(":eq(1)").html(td_name);
        tbl_tr.children(":eq(2)").html(addComma(total_arr[row].price));
        tbl_tr.children(":eq(3)").html(d_percent);
        tbl_tr.children(":eq(4)").html(addComma(total_arr[row].conclusion)+"백만");
    }
}
// input 값 실시간 변경 감지
$("#in_search").on("propertychange change keyup paste input", function() {
    var currentVal = $(this).val().toLowerCase();
    console.log(currentVal);
    if(currentVal == oldVal) {
        return;
    }
 
    oldVal = currentVal;
    for(i = 0; i<total_arr.length;i++){
        if(total_arr[i].f_name.indexOf(oldVal) > -1 || total_arr[i].e_name.toLowerCase().indexOf(oldVal)>-1){ // 문자열을 포함하고 있으면 
            $('tbody').children(":eq("+i+")").show();
        }else{
            $('tbody').children(":eq("+i+")").hide();
        }
    }
    
    // body > section > div > div.tbl_body > table > tbody > tr:nth-child(1) > td.name
});

function changeName(){ // 한글명 눌렀을 시 변경
    var name = $("#in_name").text();
    if(name=='한글명'){
      $("#in_name").html('영어명<img src="https://cdn.upbit.com/images/ico_change.c6ad0e9.png" alt="">');
    }else{
      $("#in_name").html('한글명<img src="https://cdn.upbit.com/images/ico_change.c6ad0e9.png" alt="">');
    }
}
function sortPrice(){ // 현재가 눌렀을 시
    var src = $("#sortPrice img").attr("src"); 
    if(src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"||src=="https://cdn.upbit.com/images/ico_up_down.d050377.png"){
        
        $("#sortPrice img").attr("src","https://cdn.upbit.com/images/ico_up_down_2.71770c7.png");
        $("#d_pre img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
        $("#conclu img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
    }else{
       
        $("#sortPrice img").attr("src","https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png");
        $("#d_pre img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
        $("#conclu img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");

    }
}
function sortDprice(){ // 전일대비 눌렀을 시 변경
    var src = $("#d_pre img").attr("src"); 
    if(src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"||src=="https://cdn.upbit.com/images/ico_up_down.d050377.png"){
       
        $("#d_pre img").attr("src","https://cdn.upbit.com/images/ico_up_down_2.71770c7.png");
        $("#sortPrice img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
        $("#conclu img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
    }else{
        
        $("#d_pre img").attr("src","https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png");
        $("#sortPrice img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
        $("#conclu img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");

    }
}
function conclu(){ // 거래대금 눌렀을시
    var src = $("#conclu img").attr("src"); 
    if(src=="https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png"||src=="https://cdn.upbit.com/images/ico_up_down.d050377.png"){
        
        $("#conclu img").attr("src","https://cdn.upbit.com/images/ico_up_down_2.71770c7.png");
        $("#sortPrice img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
        $("#d_pre img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
    }else{
        
        $("#conclu img").attr("src","https://cdn.upbit.com/images/ico_up_down_1.d63eb3d.png");
        $("#sortPrice img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");
        $("#d_pre img").attr("src","https://cdn.upbit.com/images/ico_up_down.d050377.png");

    }
}

function a(){ // 현재가 내림차순 
    total_arr.sort(function(a,b){
        return parseFloat(b.price) - parseFloat(a.price);
    });
}
function b(){ //현재가 오름차순
    total_arr.sort(function(a,b){
        return parseFloat(a.price) - parseFloat(b.price);
    });
}
function c(){ //전일대비 내림차순
    total_arr.sort(function(a,b){
        return parseFloat(b.percent) - parseFloat(a.percent);
    });
}
function d(){ //전일대비 오름차순
    total_arr.sort(function(a,b){
        return parseFloat(a.percent) - parseFloat(b.percent);
    });
}
function e(){ //거래대금 내림차순
    total_arr.sort(function(a,b){
        return parseFloat(b.conclusion) - parseFloat(a.conclusion);
    });
}
function f(){ //거래대금 오름차순
    total_arr.sort(function(a,b){
        return parseFloat(a.conclusion) - parseFloat(b.conclusion);
    });
}


function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
} // 숫자 콤마 