## xInterval & xTimeout
Extended Interval and Timeout feature for javascript
#### Treat new xTimeout() and new xInterval() as a timeline;
You should treat instance of xTimeout and xInterval as timeline, and you specify what action you want to occur in between the time.

## xInterval
ForExample;

Syntax:- new xInterval(maxtime);

```javascript
 var timeline=new xInterval(10000);//This timeline has a lenght of 10s
 timeline.at(1000,function(interval,setClock, clock){
 //doSomething in 1000ms
 );
 timeline.at(2000,function(){//doSometing in 20000ms)
          .at(5000, doSomethingElse);
          
  //to start time
  timeline.start();
          
```
Incase of Interval , by deault in every 100ms , it will look for a action in the timeline, which means you should register you timeline callback in the time which is exactly divisible by 100, i.e 100,200,1100 e.t.c,  Any action kept in ms like 1050 (which is multipication of 50 not 100) in timeline will not work. For custom, you can set the clock unit using setClockUnit(unit) method.
```
var timeline2=new xInterval(10000, 3);
timeline2.setClockUnit(50);
//now you can add action in the multiplication of 50

timeline2.at(1050,function(){});

```
Also notice we have provide second arguments 3, which means the xnterval will break loop after  3 loops, otherwise it will continue looping unless stop by stop()/clear()/reset() methods.

### Controls for xInterval instance
You can use play , pause, resume, forward, backward,reset, stop, and start  methods to control the motion on timeline.
```javascript
var tl=new xInterval(200000);
tl.start()//to start the motion
tl.pause()//pause the motion
tl.resume()//resume the motion
tl.stop()//stop the motion 
tl.reset()//reset the motion
tl.backward(1000)// takes 1000ms back from current time
tl.forward(300)// forward current time by 300ms

```

## xTimeout [extend setTimeout() features]
Similary, we can use xTimeout(), constructor for timeline. Unlike, xInterval, here we provide action that is invoke in afterward system, for example,
Syntax:- new xTimeout(loops);// loops argument is optional 
```javascript
	var tl=new xTimeout();
	tl.after(300, function(){});//invoke this after 300ms
	tl.after(300,function(){});//after preceeding action it will take 300ms to invoke,
	tl.after(300,function(){});//after preceeding action it will take 300ms to invoke,
```
In xTimeout, timeline actions are realtive to each other, it follows FIFO rule. The order in which we register time-action is very important. First it precedeeing action will be invoked,then next action will take place after wating its turn, and so on.

### Controls for xTimeout instance
Using play, pause, resume, stop, next, previous, first, last, clear, reset methods, the motion and action on the  timline can be effected.
```javascript
var tl=new xTimeout(3);//loop entire procces 3 times
tl.start()//to start the motion
tl.pause()//pause the motion
tl.resume()//resume the motion
tl.stop()//stop the motion 
tl.reset()//reset the motion
tl.next()// goto next action set
tl.previous()// back to last action
tl.first()//goto first action
tl.last()//goto last action

```

## Events
You can also trigger a event handler for each control either 'before' ,'after' or 'on' event for control action uisng event object.
```
beforeplay, onplay,afterplay,onpause,beforepause, onpause, afterpause etc
```
```javascript
var tl=new xInterval(10000);
tl.event.beforestart=function(instance){
	//do something
	//return false to stop the start() method to take place
	},

```





