    var arr1=[];

    setInterval(function (){
        
    var now = new Date();
    var datatbl = document.getElementById('my_tbody');

    var now_time = ("00"+now.getHours()).slice(-2)+':'+("00"+now.getMinutes()).slice(-2)+':'+("00"+now.getSeconds()).slice(-2);
    
    /* 변수 생성*/
    var price = Math.floor((Math.random()*(99999 - 10000 + 1))+10000);  
    var price1 = Math.floor((Math.random()*(99999 - 10000 + 1))+10000);  
    var price2 = Math.floor((Math.random()*(99999 - 10000 + 1))+10000);  
    var y_price = Math.floor((Math.random()*(9999 - 100 + 1))+100);  
    var percent = Math.random().toFixed(2);
    var amount = Math.floor(Math.random()*100) +1;
    var amount1 = Math.floor((Math.random()*(9999 - 100 + 1))+100);  
    var amount_price = Math.floor((Math.random()*(9999 - 100 + 1))+100);  
    
    /* 변수 JSON 데이터 형식 변경 */
    var obj={NOW_TIME:now_time,PRICE:price, PRICE1:price1, PRICE2:price2, 
        Y_PRICE:y_price, PERCENT:percent, AMOUNT:amount, 
        AMOUNT1:amount1, AMOUNT_PRICE:amount_price};

   arr1.push(obj);
   /* 동적 태그 생성 */
    var str = "<tr id='content'><td id='time'>"
    str+=arr1[(arr1.length - 1)].NOW_TIME+"</td>";
    str+="<td id='price'>"+arr1[(arr1.length - 1)].PRICE+"</td>";
    str+="<td id='y_price'>▲ &nbsp"+arr1[(arr1.length - 1)].Y_PRICE+"</td>";
    str+="<td id='percent'>+"+arr1[(arr1.length - 1)].PERCENT+"</td>";
    str+="<td id='amount'>"+arr1[(arr1.length - 1)].AMOUNT+"</td>";
    str+="<td id='price1'>"+arr1[(arr1.length - 1)].PRICE1+"</td>";
    str+="<td id='price2'>"+arr1[(arr1.length - 1)].PRICE2+"</td>";
    str+="<td id='amount1'>"+arr1[(arr1.length - 1)].AMOUNT1+"</td>";
    str+="<td id='amount_price'>"+arr1[(arr1.length - 1)].AMOUNT_PRICE+"</td></tr>";
    
      
   
    $("#my_tbody").prepend(str); // tbody 동적 태그 붙임  
   

    if(arr1.length==8){
            arr1.shift(); // 배열이 8이면 가장 오래된 데이터 삭제 
            datatbl.deleteRow(-1);
    }
},1000);


