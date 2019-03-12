## xInterval
Extended Interval and Timeout feature of javascript
#### Treat new xTimeout() and new xInterval() as a timeline;
You should treat instance of xTimeout and xInterval as timeline, and you specify what action you want to occur in between the time.
ForExample;
```javascript
 var timeline=new xInterval(10000);//This timeline should not more then 10sec
 timeline.at(1000,function(interval,setClock, clock){
 //doSomething in 1000ms
 //interval is instance of current setInterval.
 //clock is the current time 
 //setClock is a function that lets you to goback in timeline or go forth uisng setclock in this time line.
 // setClock(100); this will always loop form 100ms through 1000ms inside the time frame
 );
 timeline.at(2000,function(){//doSometing in 20000ms)
          .at(5000, doSomethingElse);
          
  //to start time
  timeline.start();
          
```
