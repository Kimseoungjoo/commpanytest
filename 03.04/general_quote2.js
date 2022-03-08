// 변수 생성 
var total_arr=[];
var up_arr=[];
var down_arr=[];

var fill_price=[]; // 가격 / 매수량(빨간색) , 매도량(파란색)
var go_public = 50000000; // 상장가(검정색 )
var avg_pr= 5000; // 기준값 
var maxpr = 50000000;  // 최댓값 / 당일 고가 
var minpr = 50000000; // 최솟값  / 당일 저가 
var price =50000000; // 가격 
var d_final=5000; // 전일종가
var conclusion_price = 0; // 체결가
var conclusion_amount =0; // 체결량
var total_am=0;// 누적량 
var date = new Date();
var hour = date.getHours();
if(hour ===0){
    d_final=avg_pr;
}
// 초당 데이터 들어옴 
setInterval(function (){

/* 난수 생성 */
var rand = Math.floor(Math.random()*2); // 0 이면 매도 1이면 매수
var amount =  Math.random().toFixed(3);

if(rand == 1){ // 매수 객체 / 가격 in
    price += 1000;
    var obj = {PRICE:price, BUY_AM:amount};
    up_arr.push(obj);
}
else if(rand == 0){ // 매도 객체 / 가격 de
    price -= 1000; 
    var obj = {PRICE:price, SELL_AM:amount};
    down_arr.push(obj);
}

// ==================매도 배열 데이터 넣기 (중복제거)===================
var result_up_obj=[];
var result_down_obj=[];

var u_flag = true;
var d_flag = true;
for(var i=0; i<up_arr.length;i++){
    u_flag=true;
    for(a in result_up_obj){
        if(result_up_obj[a].PRICE === up_arr[i].PRICE){
            result_up_obj[a].BUY_AM += up_arr[i].BUY_AM;
            //result_up_obj[a].BUY_PR = Math.floor(up_arr[i].PRICE*result_up_obj[a].BUY_AM*10000);
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
// 매도 중복 제거 
for(var i=0; i<down_arr.length;i++){
    d_flag=true;
    for(b in result_down_obj){
        if(result_down_obj[b].PRICE === down_arr[i].PRICE){
            result_down_obj[b].SELL_AM += down_arr[i].SELL_AM;
            //result_down_obj[b].SELL_PR = Math.floor(down_arr[i].price*result_down_obj[b].SELL_AM*1000);
            d_flag=false;
        }
    }
    if(d_flag){
        result_down_obj.push(down_arr[i]);
        result_down_obj.sort(function(a,b){
            if(a.PRICE==b.PRICE){return 0} return a.PRICE > b.PRICE ? 1:-1;
        })
    }
}
// ==================매도 배열 데이터 넣기 (중복제거) END ===================

// ==================가격이 같을 때 json 병합 ===================
if(up_arr.length!=0 && down_arr.length != 0){
    var idx  = up_arr.map(function(item1){
        var obj = down_arr.find(function(item2){
            return item1.PRICE == item2.PRICE;
        });
        return item1.BUY_AM - obj.SELL_AM;
    });
    
}
// ==================가격이 같을 때 json 병합 END===================

// ==================체결가 / 체결가 ===================
// 매수와 매도가 있을 때 생성 한 total_arr의 
if(total_arr != undefined){
    total_arr.forEach(function(arr,index){
        var idx = arr.BUY_AM - arr.SELL_AM; // 체결량 arr_price 체결값 
        if(idx>0){
            up_arr.map(function(item){
                if(item.PRICE==arr.PRICE){
                    item.BUY_AM=idx;
                }
            });
        }
        else if(idx<0){
            down_arr.map(function(item){
                if(item.PRICE==arr.PRICE){
                    item.SELL_AM=Math.abs(idx).toFixed(3);
                }
            });
        }else{
            var up_idx = up_arr.findIndex(function(key){return key.PRICE==arr.PRICE});
            var down_idx = down_arr.findIndex(function(key){return key.PRICE==arr.PRICE});
            up_arr.splice(up_idx,1);
            down_arr.splice(down_idx,1);
            
        }
    });
}
console.log("up_Arr:::"+JSON.stringify(up_arr)+"::: down_arr :::"+JSON.stringify(down_arr)+"::: total_arr ::::"+JSON.stringify(total_arr));
// ==================체결가 / 체결가 END ===================

// if(maxpr< price) maxpr = price; // 최고가 
// if(minpr > price) minpr = price; // 최저가
// avg_pr = Math.floor((maxpr+minpr)/2); // 기준값 
// //------------------------------------------------------------------------------
// // 전체 값 저장 
// var result_total_obj=[];

// var t_flag = true;
// // 매수 배열 데이터 넣기(중복 제거)
// // 오름 차순 정렬 
// //-----------------------------------------------------------------------------
// for(var i=0; i<total_arr.length;i++){
    //     t_flag=true;
    //     for(a in result_total_obj){
        //         if(result_total_obj[a].PRICE === total_arr[i].PRICE){
            //             result_total_obj[a].BUY_AM += total_arr[i].BUY_AM;
            //             result_total_obj[a].SELL_AM += total_arr[i].SELL_AM;
            //             t_flag=false;
            //         }
            //     }
//     if(t_flag){
    //         result_total_obj.push(total_arr[i]);
//         result_total_obj.sort(function(a,b){
//             if(a.PRICE==b.PRICE){return 0} return a.PRICE > b.PRICE ? 1:-1;
//         })
//     }
// }

// result_total_obj.forEach(function(obj,index,obj2){
//     if(obj.SELL_AM!=undefined && obj.BUY_AM!=undefined){

//     }

// });



// // obj 안에 값이 널이 아니라면 div 동적 생성 
for(row in result_down_obj){
    console.log(row+"::::"+result_down_obj[row].SELL_AM+"::::::"+result_down_obj[row].PRICE);
    var str = "<div style=' width:"+(Math.floor(result_down_obj[row].SELL_AM*100))+"%;  opacity:0.7; position:absolute; right: 0px; top: 10px; background-color:#E0F8F7; overflow:hidden; text-indent: -9999em;'>_</div>";
    str +="<p style='z-index: 1; position: absolute; right: 0px; top: -6px;'>"+result_down_obj[row].SELL_AM+"</p>";
    $("tr:nth-child("+row+") #amount1").html(str); 
}
for(d_row in result_up_obj){
     $(".down_price > tr:nth-child("+d_row+") #price").text(innerHTML = result_up_obj[d_row].PRICE);
}



},1000); // 초당 돌아가는 함수 끝

//====================================================================================

// 숫자 콤마 찍는 함수
function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

// JSON 데이터 정렬 함수 
function sortJson(data, key, type){
    if(type == undefined){
        type="asc";
    }
    return data.sort(function(a,b){

    });
}// 정렬 함수 끝 

function day_heightcost(price){
    if(maxpr < price){
        maxpr = price;
    }
}
function day_rowcost(price){
    if(minpr > price){
        minpr = price;
    }
}
