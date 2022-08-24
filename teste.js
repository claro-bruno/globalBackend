
// const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
const valueByHour = 20;



const sunday = false;
const monday = true;
const tuesday = true;
const wednesday = true;
const thursday = true;
const friday = true;
const saturday = false;
const quarter_option = 1;

const arrDays = [];
const arr = [];

if(sunday) arrDays.push('Sunday');
if(monday) arrDays.push('Monday');
if(tuesday) arrDays.push('Tuesday');
if(wednesday) arrDays.push('Wednesday');
if(thursday) arrDays.push('Thursday');
if(friday) arrDays.push('Friday');
if(saturday) arrDays.push('Saturday');


const month = 'January';
const monthValue = getMonthFromString(month);
const year = 2022;

const last_date = new Date(year, monthValue, 0);

const inicio = quarter_option === 1 ? 1 : 16;
const end = quarter_option === 1 ? 15 : last_date.getDate();

for(i=inicio; i<= end; i += 1) {
    let dataValue = new Date(year, monthValue, i);
    if(arrDays.includes(dataValue.toLocaleString('default', {weekday: 'long'}))) {
        arr.push(dataValue);
    }
}

function getMonthFromString(mon){

    var d = Date.parse(mon + "1, 2022");
    if(!isNaN(d)){
        return new Date(d).getMonth() + 1;
    }
    return -1;
}


