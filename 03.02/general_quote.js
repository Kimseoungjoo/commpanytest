var up_arr=[];
var down_arr=[];
var fill_price=[]; // 가격 / 매수량(빨간색) , 매도량(파란색)
var go_public = 5000; // 상장가(검정색 )
var avg_pr= 5000; // 기준값 
var maxpr = 0;  // 최댓값 / 당일 고가 
var minpr = 0; // 최솟값  / 당일 저가 
var price =5000; // 가격 
var d_final=5000; // 전일종가

var total_am=0;// 누적량 
setInterval(function (){

/* 난수 생성 */
var rand = Math.floor(Math.random()*2); // 0 이면 매도 1이면 매수
price = Math.floor((Math.random()*(6000-4000))+4000);
var amount = Math.random().toFixed(3);

// 객체 생성 
var up_obj ={PRICE:price, BUY_PR:Math.floor(price*amount*10000), BUY_AM:amount}; // 매수 객체
var down_obj ={PRICE:price, SELL_PR:Math.floor(price*amount*10000), SELL_AM:amount};
console.log(rand);
if(rand == 1){ // 매수 
    up_arr.push(up_obj); 
}else if(rand == 0){ // 매도 
    down_arr.push(down_obj); 
}
console.log("값이 왜 안들어와 .... ㅠㅠ"+JSON.stringify(down_arr));
total_am+= Number(amount);
/* 변수 생성 */
/* 변수 JSON 데이터 형식 변경 */

var result_up_obj=[];
var result_down_obj=[];
//------------------------------------------------------------------------------

var u_flag = true;
var d_flag = true;

// 매수 배열 데이터 넣기(중복 제거)
// 오름 차순 정렬 
//-----------------------------------------------------------------------------
if(up_arr.length==8){
    for(var i=0; i<up_arr.length;i++){
        u_flag=true;
        for(a in result_up_obj){
            if(result_up_obj[a].PRICE === up_arr[i].PRICE){
                result_up_obj[a].BUY_AM += up_arr[i].BUY_AM;
                result_up_obj[a].BUY_PR = Math.floor(up_arr[i].PRICE*result_up_obj[a].BUY_AM*10000);
                u_flag=false;
            }
        }
        if(u_flag){
            result_up_obj.push(up_arr[i]);
            result_up_obj.sort(function(a,b){
                if(a.PRICE==b.PRICE){return 0} return a.PRICE > b.PRICE ? 1:-1;
            })
        }
    }
}
// 매도 배열 데이터 넣기 (중복제거)
if(down_arr.length==8){
    for(var i=0; i<down_arr.length;i++){
        d_flag=true;
        for(b in result_down_obj){
            if(result_down_obj[b].PRICE === down_arr[i].PRICE){
                result_down_obj[b].SELL_AM += down_arr[i].SELL_AM;
                result_down_obj[b].SELL_PR = Math.floor(down_arr[i].price*result_down_obj[b].SELL_AM*1000);
                d_flag=false;
            }
        }
        if(d_flag){
            result_down_obj.push(down_arr[i]);
            result_down_obj.sort(function(a,b){
                if(a.PRICE==b.PRICE){return 0} return a.PRICE < b.PRICE ? 1:-1;
            })
        }
    }
}

console.log(JSON.stringify(result_up_obj)+"::::");
console.log(JSON.stringify(result_down_obj)+"::::다운");


// obj 안에 값이 널이 아니라면 div 동적 생성 
for(row in result_up_obj){
    console.log(row);
    document.getElementsByTagName("tr")[8-row].getElementsByTagName('td')[0].innerHTML =result_up_obj[row].BUY_AM;
    document.getElementsByTagName("tr")[8-row].getElementsByTagName('td')[1].innerHTML =result_up_obj[row].PRICE;
    // var str = "<td colspan='2' id='amount1'>"+result_up_obj[result_up_obj.length-1].BUY_AM;
    // str+="</td><td colspan='2' id='price'>"+result_up_obj[result_up_obj.length-1].PRICE+"</td>";
}
for(row in result_down_obj){
    $(".down_price:nth-child("+row+") #amount1").innerHTML = result_down_obj[row].SELL_AM;
    $(".down_price:nth-child("+row+") #price").innerHTML = result_down_obj[row].PRICE;
    // document.getElementsByClassName("down_price")[row].getElementById("price").innerHTML = result_down_obj[row].PRICE;

}

// if(down_arr.length==8){ // 기준값보다 값이 커지면 
//     var str = "<td colspan='2' id='amount1'>"+result_down_obj[result_down_obj.length-1].SELL_AM;
//     str+="</td><td colspan='2' id='price'>"+result_down_obj[result_down_obj.length-1].PRICE+"</td>";

        // document.getElementsByTagName("tr")[8+result_down_obj.length].append(str);
        // for(row in result_down_obj){
        //     var str = "<td colspan='2' id='amount1'>"+result_down_obj[result_down_obj.length-1].SELL_AM;
        //     str+="</td><td colspan='2' id='price'>"+result_down_obj[result_down_obj.length-1].PRICE+"</td>";
        //     $("tr:nth-child("+(row)+")").append(str);
        // }
// }

// rowspan 데이터 삽입 
// document.getElementById("amount").innerHTML = total_am;
// document.getElementById("d_final").innerHTML = d_final;



 if(up_arr.length==8){
    up_arr.shift(); // 배열이 8이면 가장 오래된 데이터 삭제 
 }
if(down_arr.length==8){
    down_arr.shift(); // 배열이 8이면 가장 오래된 데이터 삭제 
}

if(maxpr < price||maxpr==0) maxpr = price; // 최댓값
if(minpr > price||minpr==0) minpr = price; // 최솟값 
avg_pr = Math.floor((maxpr+minpr)/2); // 기준값 

console.log(price+":::"+maxpr+":::"+minpr+":::"+avg_pr);

},1000); // 초당 돌아가는 함수 끝



// 숫자 콤마 찍는 함수
function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}



// // 테이블 병합 함수 
// function genRowspan(className){
//         var rows = $("." + className);
//         if (rows.length > 0) {
//             if(className=='up_price'){
//                 document.getElementById('right').setAttribute("rowspan", rows.length-1);
//             }else{
//                 document.getElementById('left').setAttribute("rowspan", rows.length);
//             }
//         }
// } // 테이블 병합 함수 끝 

// JSON 데이터 정렬 함수 
function sortJson(data, key, type){
    if(type == undefined){
        type="asc";
    }
    return data.sort(function(a,b){

    });
}// 정렬 함수 끝 