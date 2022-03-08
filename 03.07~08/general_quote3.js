// 변수 생성 
var total_arr=[];
var up_arr=[];
var down_arr=[];

// var up_cnt = 8; //매수 행의 개수 
// var down_cnt = ; // 매도 행의 개수 
var fill_price=[]; // 가격 / 매수량(빨간색) , 매도량(파란색)
var go_public = 50000000; // 상장가(검정색 )
var avg_pr= 50000000; // 기준값 
var maxpr = 50000000;  // 최댓값 / 당일 고가 
var minpr = 50000000; // 최솟값  / 당일 저가 
var price =50000000; // 가격 
var d_final=50000000; // 전일종가
var conclusion_price = 0; // 체결가
var conclusion_amount =0; // 체결량
var total_am=0;// 누적량 
var date = new Date();
var hour = date.getHours();
var total_con = 0;

if(hour ===0){
    d_final=avg_pr;
} // 전일 종가 


// mouseover / mouseout 함수를 이용한 css 동적 변경 
function changeColor(idx){
    for(var i=8; i > idx; i--){
        document.querySelector('.up_price:nth-child('+i+') > #price').style.backgroundColor = "rgb(157,169,229)";
        document.querySelector('.up_price:nth-child('+i+') > #amount1').style.backgroundColor = "rgb(157,169,229)";
        document.querySelector('.up_price:nth-child('+(i)+')').style.borderTop = "0px";
    }
    
    document.querySelector('.up_price:nth-child('+(idx+1)+')').style.borderTop = "2px solid #000000";
    document.querySelector('.up_price:nth-child('+(idx+1)+') > #price').style.backgroundColor = "rgb(127,146,243)";
}
function mouse_out(){
    for(var i=8; i > 0; i--){
        document.querySelector('.up_price:nth-child('+i+') > #price').style.backgroundColor = "rgb(178, 186, 228)";
        document.querySelector('.up_price:nth-child('+i+') > #amount1').style.backgroundColor = "";
        document.querySelector('.up_price:nth-child('+(i)+')').style.borderTop = "0px";
    }

}
function d_changeColor(idx){
    for(var i=9; i <= idx+1; i++){
        document.querySelector('.down_price:nth-child('+(i)+') > #price').style.backgroundColor = "rgb(230,150,150)";
        document.querySelector('.down_price:nth-child('+(i)+') > #amount1').style.backgroundColor = "rgb(230,150,150)";
        document.querySelector('.down_price:nth-child('+(i)+')').style.borderBottom = "0px";
    }
    
    document.querySelector('.down_price:nth-child('+(idx+1)+')').style.borderBottom = "2px solid #000000";
    document.querySelector('.down_price:nth-child('+(idx+1)+') > #price').style.backgroundColor = "rgb(243,115,115)";
}
function d_mouse_out(){
    for(var i=9; i < 17; i++){
        document.querySelector('.down_price:nth-child('+i+') > #price').style.backgroundColor = "rgb(231, 172, 172)";
        document.querySelector('.down_price:nth-child('+i+') > #amount1').style.backgroundColor = "";
        document.querySelector('.down_price:nth-child('+i+')').style.borderBottom = "0px";
    }

}
// mouseover / mouseout css 동적 변경 END

// 초당 데이터 들어옴 
setInterval(function (){



/* 난수 생성 */
var rand = Math.floor(Math.random()*2); // 0 이면 매도 1이면 매수
var amount =  Number((Math.random()).toFixed(3));

if(rand == 1){ // 매수 객체 / 가격 in
    price += 1000;
    var obj = {PRICE:price, BUY_AM:amount};
    up_arr.push(obj);
    console.log("매수::"+JSON.stringify(up_arr));
}
else if(rand == 0){ // 매도 객체 / 가격 de
    price -= 1000; 
    var obj = {PRICE:price, SELL_AM:amount};
    down_arr.push(obj);
    console.log("매도::"+JSON.stringify(down_arr));
}
console.log("=========================================================현재 price 가"+price);

// ==================매도 배열 데이터 넣기 (중복제거)===================
var result_up_obj=[];
var result_down_obj=[];

var u_flag = true;
var d_flag = true;
for(var i=0; i<up_arr.length;i++){
    u_flag=true;
    for(a in result_up_obj){
        if(result_up_obj[a].PRICE === up_arr[i].PRICE){
            result_up_obj[a].BUY_AM = Number((result_up_obj[a].BUY_AM + up_arr[i].BUY_AM).toFixed(3));
            u_flag=false;
        }
    }
    if(u_flag){
        result_up_obj.push(up_arr[i]);
    }
}

// 매도 중복 제거 
for(var i=0; i<down_arr.length;i++){
    d_flag=true;
    for(b in result_down_obj){
        if(result_down_obj[b].PRICE === down_arr[i].PRICE){
            result_down_obj[b].SELL_AM = Number((result_down_obj[b].SELL_AM + down_arr[i].SELL_AM).toFixed(3));
            //result_down_obj[b].SELL_PR = Math.floor(down_arr[i].price*result_down_obj[b].SELL_AM*1000);
            
            d_flag=false;
        }
    }
    if(d_flag){
        result_down_obj.push(down_arr[i]);
    }
}
// 정렬 과정
result_up_obj.sort(function(a,b){  
    if(a.PRICE==b.PRICE){return 0} return a.PRICE < b.PRICE ? 1:-1;
})
// 정렬 과정
result_down_obj.sort(function(a,b){  
    if(a.PRICE==b.PRICE){return 0} return a.PRICE > b.PRICE ? 1:-1;
})
console.log("result_up::::"+JSON.stringify(result_up_obj)+":::down::::"+JSON.stringify(result_down_obj));
// ==================매도 배열 데이터 넣기 (중복제거) END ===================

// ==================가격이 같을 때 json 병합 ===================

result_up_obj.forEach(item => {
    result_down_obj.forEach(item2=>{
        if(item.PRICE==item2.PRICE){
            var obj_idx ={PRICE:item.PRICE, BUY_AM:item.BUY_AM, SELL_AM:item2.SELL_AM};
            total_arr.push(obj_idx);
            console.log("병합 total 값 :::"+JSON.stringify(total_arr));
        }
    });
});


// ==================가격이 같을 때 json 병합 END===================

// ==================체결가 / 체결가 ===================
// 매수와 매도가 있을 때 생성 한 total_arr의 
if(total_arr != null){
    total_arr.forEach(function(arr,index){
        var new_trTag = document.createElement('tr');
        var idx = Number((arr.BUY_AM - arr.SELL_AM).toFixed(3)); // 체결량 arr_price 체결값 


        conclusion_price = arr.PRICE;
        if(idx>0){
            result_up_obj.map(function(item){
                if(item.PRICE==arr.PRICE){
                    item.BUY_AM=idx;
                }
            });

            var down_idx = result_down_obj.findIndex(function(key){return key.PRICE==arr.PRICE}); // 매도량이 없기때문에 매도가격을 배열에서 삭제
            var s_down_idx = down_arr.findIndex(function(key){return key.PRICE==arr.PRICE});
            down_arr.splice(s_down_idx,1);
            result_down_obj.splice(down_idx,1);// 매도량이 없기때문에 매도가격을 배열에서 삭제
            
            conclusion_amount = arr.SELL_AM; // 체결량 담기 . 
            
            // 체결량과 체결가를 view창에 보여줌 
            var con_str = "<td>"+conclusion_price+"</td><td style ='color:blue;'>"+conclusion_amount+"</td>";
            new_trTag.innerHTML = con_str;
            document.querySelector('.s_conclusion tbody').appendChild(new_trTag);

        }//END
        else if(idx<0){// 매도량이 매수량보다 많을 때 매수의 데이터의 price 값을 삭제한다. 
           
            result_down_obj.map(function(item){ // 매도량 초기화 
                if(item.PRICE==arr.PRICE){
                    item.SELL_AM=Number((arr.SELL_AM - arr.BUY_AM).toFixed(3));
                }
            });

            var up_idx = result_up_obj.findIndex(function(key){return key.PRICE==arr.PRICE}); // 매수가 됨. 그렇기에 매수배열에서 매수 데이터 삭제하기위한 index추출
            var s_up_idx = up_arr.findIndex(function(key){return key.PRICE==arr.PRICE});
            up_arr.splice(s_up_idx,1);
            result_up_obj.splice(up_idx,1); // 매수 데이터 삭제 

            conclusion_amount = arr.BUY_AM; // 체결량 담기 
            
            var con_str = "<td>"+conclusion_price+"</td><td style ='color:red;'>"+conclusion_amount+"</td>";
            new_trTag.innerHTML = con_str;
            document.querySelector('.s_conclusion tbody').appendChild(new_trTag);

        }// END
        else{ // 매수량과 매도량이 같다면 매수 배열과 매도 배열의 현재 체결가를 없애줘야한다. 
            
            var up_idx = result_up_obj.findIndex(function(key){return key.PRICE==arr.PRICE}); // 매수량 인덱스 추출 
            var down_idx = result_down_obj.findIndex(function(key){return key.PRICE==arr.PRICE}); // 매도량 인덱스 추출 

            result_up_obj.splice(up_idx,1);
            result_down_obj.splice(down_idx,1);

            conclusion_amount = arr.SELL_AM; // 체결량을 담는다 어떤 데이터를 넣어도 상관없음 

            var con_str = "<td>"+conclusion_price+"</td><td style ='color:red;'>"+conclusion_amount+"</td>";
            new_trTag.innerHTML = con_str;
            document.querySelector('.s_conclusion tbody').appendChild(new_trTag);

        }// END

        if(maxpr<arr.PRICE) maxpr = arr.PRICE; // 당일 최고가 갱신
        if(minpr>arr.PRICE) minpr = arr.PRICE; // 당일 최저가 갱신 
        total_con +=Math.round(conclusion_price*conclusion_amount);
        document.querySelector('.transaction > dd').innerHTML = addComma(total_con/1000)+"천원";
        // var total_idx = total_arr.findIndex(function(key){return key.PRICE == arr.PRICE});
        total_arr.splice(0,1);
       
        avg_pr = Math.round((maxpr+minpr)/2); // 당일 평균가 
      
        if(document.getElementById('con_body').rows.length==12){ // 체결가 / 체결량의 태그가 12개 일시 제거 
            document.getElementById('con_body').deleteRow(-1);
        }
        
    });
}
// 왜 같이 바뀌는지 이해가 안됌 ..
document.querySelector('#d_hieght > dd').innerHTML = addComma(maxpr)+"<br>"+(((maxpr-avg_pr)/avg_pr)*100).toFixed(3)+"%"; // 당일 고가 % 
document.querySelector('#d_row > dd').innerHTML = addComma(minpr)+"<br>"+(((minpr-avg_pr)/avg_pr)*100).toFixed(3)+"%"; // 당일 저가 %
document.querySelector('#d_final > dd').innerHTML = addComma(d_final);
console.log("=====================================================================================================");
console.log("=====================================================================================================");
console.log("up_Arr:::"+JSON.stringify(result_up_obj)+"::: down_arr :::"+JSON.stringify(result_down_obj)+"::: total_arr ::::"+JSON.stringify(total_arr));
console.log("=====================================================================================================");
console.log("=====================================================================================================");
// console.log("값이 들어오는지 "+JSON.stringify(result_down_obj));
// console.log("값이 들어오는지 "+JSON.stringify(result_up_obj));


// // obj 안에 값이 널이 아니라면 div 동적 생성 
for(row in result_down_obj){
    var str1 = "<div style=' width:"+(Math.floor(result_down_obj[row].SELL_AM*100))+"%;  opacity:0.7; position:absolute; max-width:100%; right: 0px; top: 10px; background-color:#E0F8F7; overflow:hidden; text-indent: -9999em;'>_</div>";
    str1 += "<p style='z-index: 1; position: absolute; right: 0px; top: -6px;'>"+result_down_obj[row].SELL_AM+"</p>";
    
    // console.log("str1::::"+str1);
    
    document.querySelector(".up_price:nth-child("+(8-row)+") #amount1").innerHTML = str1;
    document.querySelector(".up_price:nth-child("+(8-row)+") #price").innerHTML = addComma(result_down_obj[row].PRICE)+"&nbsp&nbsp"+(((result_down_obj[row].PRICE-d_final) / d_final)*100).toFixed(2)+"%";
}
for(u_row in result_up_obj){
    var str2 = "<div style=' width:"+(Math.floor(result_up_obj[u_row].BUY_AM*100))+"%;  opacity:0.7; position:absolute; max-width:100%; left: 0px; top: 10px; background-color:#E0F8F7; overflow:hidden; text-indent: -9999em;'>_</div>";
    str2 +="<p style='z-index: 1; position: absolute; left: 0px; top: -6px;'>"+result_up_obj[u_row].BUY_AM+"</p>";

    document.querySelector(".down_price:nth-last-child("+(8-u_row)+") >  #price").innerHTML = addComma(result_up_obj[u_row].PRICE)+"&nbsp&nbsp"+(((result_up_obj[u_row].PRICE-d_final) / d_final)*100).toFixed(2)+"%";
    document.querySelector(".down_price:nth-last-child("+(8-u_row)+") >  #amount1").innerHTML = str2;
}


if(up_arr.length == 8){
    up_arr.shift();
}
if(down_arr.length == 8){
    down_arr.shift();
}


},3000); // 초당 돌아가는 함수 끝

//====================================================================================

// 숫자 콤마 찍는 함수
function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}


