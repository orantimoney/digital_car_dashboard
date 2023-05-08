// Import all of Bootstrap's JS
import 'bootstrap';

import { io } from "socket.io-client";

const URL = "http://localhost:3000/";
const socket = io(URL, { autoConnect: true});


/*
function calculateDialNeedlePosition
@param  int  value      - value represented on the gauge, (rpm, mph, temperature)
@param  int  dialStart  - value which the dial starts at (solves for gauges with negative values)
@param  int  dialEnd    - maximum possible represented value on gauge
@param  int  sectionAngle - Angle of subsection in the gauge travelled by the needle

@return int NeedleAngle
*/
function calculateDialNeedleAngle(value, dialStart, dialEnd, sectionAngle) {

needlePercentage = calculateMeasurePercentage(value, dialStart, dialEnd);

needleAngle = 1/(needlePercentage)*sectionAngle;

return needleAngle;

}


// calculates the percentage of a measure e.g. dial, or bar will be covered by the value given
function calculateMeasurePercentage(value, minvalue, maxvalue) {
    measureTravel = Math.abs(minvalue) + Math.abs(maxvalue);

    if (minvalue < 0 && value > 0) {
        value += Math.abs(minvalue);
    }

    measurePercentage = (measureTravel/Math.abs(value));

    return measurePercentage;
}





socket.on("mph", (mph) => {
    console.log(mph + ' - mph');

    mphAngle = calculateDialNeedleAngle(mph, 0, 120, 270);
    dashref = document.getElementById('dashboard');
    dashboard = dashref.contentDocument;
    mphpointer = dashboard.getElementById("mphpointer");
    mphpointer.setAttribute("transform", "rotate(" + mphAngle +",214,258)");
});


socket.on("coolanttemp", (temp) => {
    console.log(temp);
    dashref = document.getElementById('dashboard');
    dashboard = dashref.contentDocument;  
    coolantTemp = dashboard.getElementById('cooltemp').textContent = temp + '°C';
});

socket.on("rpm", (rpm) => {
    console.log(rpm + ' - rpm');
    rpmAngle = calculateDialNeedleAngle(rpm, 0, 6000, 270);
    dashref = document.getElementById('dashboard');
    dashboard = dashref.contentDocument;      
    revpointer = dashboard.getElementById("revpointer");
    revpointer.setAttribute("transform", "rotate(" + rpmAngle +",814,258)");
});

socket.on("manipressure", (bar) => {
    console.log(bar);
    dashref = document.getElementById('dashboard');
    dashboard = dashref.contentDocument; 
   dashboard.getElementById('manifoldpressure').textContent = bar + ' BAR';
});


