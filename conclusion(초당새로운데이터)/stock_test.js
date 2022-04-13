let testObj = [];

setInterval(function() {
    let today = new Date();   

    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초
    
    if(hours < 10) hours = '0' + hours.toString(); // 시 분 초가 10 미만일때 앞에 0 붙이기
    
    if(minutes < 10) minutes = '0' + minutes.toString();
    
    if(seconds < 10) seconds = '0' + seconds.toString();
    
    let tb = document.querySelector('.tbBody');
    
    let TIME = hours + ':' + minutes + ':' + seconds; // 시간
    let NOW_PRC = Math.floor(Math.random() * 50000) + 20000; // 현재가
    let YDY = Math.floor(Math.random() * 1000) + 500; // 전일대비
    let UP_DWN = (Math.random() * 1 + 0.5).toFixed(2); // 등락률
    let COUNT = Math.floor(Math.random() * 10) + 1; // 체결수량
    
    let obj = {TIME : TIME, NOW_PRC : NOW_PRC, YDY : YDY, UP_DWN : UP_DWN, COUNT : COUNT};
    testObj.push(obj);

    if(testObj.length == 9) { // 데이터가 9개일때 마지막 데이터 없애기
        testObj.shift();
        let last = tb.lastElementChild;
        tb.removeChild(last);
    }
    console.log(JSON.stringify(testObj));
    console.log(testObj);
    let newTr;
    newTr = document.createElement('tr');
        newTr.innerHTML = "<tr>" +
                "<td>" + testObj[testObj.length - 1].TIME + "</td>" +
                "<td>" + testObj[testObj.length - 1].NOW_PRC + "</td>" +
                "<td>" + testObj[testObj.length - 1].YDY + "</td>" +
                "<td>" + testObj[testObj.length - 1].UP_DWN + "</td>" +
                "<td>" + testObj[testObj.length - 1].COUNT + "</td>" +
                "</tr>";
    tb.prepend(newTr);
}, 1000)
