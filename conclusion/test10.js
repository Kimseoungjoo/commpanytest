Number.prototype.format = function(){
    if(this==0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');

    while(reg.test(n)) {
        n = n.replace(reg, '$1' + ',' + '$2');
    }
    
    return n;
}

var array = [];

var intervalTb = function() {
    var time = new Date().toTimeString().split(" ")[0];
    var present = Math.floor(Math.random() * 100000);
    var prvsDay = Math.floor(Math.random() * 2001 - 1);
    var riseFall = (Math.random() * 5).toFixed(2);
    var quantity = Math.floor(Math.random() * 10) + 1;
    var table = document.getElementById('chart');
    var totalRowCnt = table.rows.length;
    
    
    array.push({TIME: time, NOW_PRC: present, YDY: prvsDay, UP_DWN: riseFall, COUNT: quantity});
    
    var newRow = table.insertRow(1);      
    
    var newCell1 = newRow.insertCell(0);
    var newCell2 = newRow.insertCell(1);
    var newCell3 = newRow.insertCell(2);
    var newCell4 = newRow.insertCell(3);
    var newCell5 = newRow.insertCell(4);
    var newCell6 = newRow.insertCell(5);
    var newCell7 = newRow.insertCell(6);
    var newCell8 = newRow.insertCell(7);
    var newCell9 = newRow.insertCell(8);
    
    for(i = 0; i < array.length; i++) {
        var time = array[i].TIME;
        var present = array[i].NOW_PRC;
        var prvsDay = array[i].YDY;
        var riseFall = array[i].UP_DWN;
        var quantity = array[i].COUNT;
    
        newCell1.innerText = time;
        newCell2.innerText = present.format();
        newCell3.innerText = prvsDay;
        newCell4.innerText = riseFall;
        newCell5.innerText = quantity;
               
    }
        
    if( totalRowCnt > 10 ) {
        table.deleteRow(-1);
    }
    
    if( present > 90000) {
        newCell5.style.color="red";
    }

    console.log(array);
    
};



let interval = setInterval(intervalTb, 1000)




var stopBtnClick = document.getElementById('stopBtn');


stopBtnClick.addEventListener("click", function() {

    var boolean = stopBtnClick.classList.contains("start");
    console.log(stopBtnClick);
    console.log(boolean);
    
    if(boolean) {
        console.log("실행0");
        stopBtnClick.classList.remove("start");
        stopBtnClick.innerText = "그만보기";        
        interval = setInterval(intervalTb, 1000)
        
    } else {
        
        console.log("실행1");
        stopBtnClick.classList.add("start");    
        stopBtnClick.innerText = "다시보기";        
        clearInterval(interval);
    }

    
})


