const date = new Date();
const viewYear = date.getFullYear();
const viewMonth = date.getMonth();

const prevLast = new Date(viewYear, viewMonth,0); // 지난 달의 마지막 날
const thisLast = new Date(viewYear, viewMonth + 1,0); // 이번달 마지막 날

const plDate = prevLast.getDate(); // 지난달 마지막 날짜
const plDay = prevLast.getDay();  // 지난달 마지막 요일

const tlDate = thisLast.getDate(); // 이번달 마지막 날짜
const tlDay = thisLast.getDay(); // 이번달 마지막 요일

const prevDates = [];
const thisDates = [...Array(tlDate+1).keys()].slice(1);
const nextDates = [];

$(".year_month").text(viewYear+"년"+(viewMonth+1)+"월 근태");

// 이번달을 표현하는 날짜 생성 
if(plDay !==6){ // 토요일(6)일 때 필요없음 

    for(let i=0; i < plDay+1 ; i++){ // 지난달의 마지막 요일까지 반복
        prevDates.unshift(plDate-i); // 지난달의 마지막 날짜부터 -1 unshift를 통한 지난 달 날짜 배열 생성 
    }

}

for(let i = 1; i< 7-tlDay; i++){ // 다음달 남은 날짜 배열 생성 
    nextDates.push(i);
}
const dates = prevDates.concat(thisDates,nextDates);

dates.forEach((date, i) => {
    dates[i] = '<div class="date">'+date+"</div>";
})

$(".dates").html(dates.join(''));