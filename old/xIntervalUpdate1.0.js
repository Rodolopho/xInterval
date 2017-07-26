//require is.js
//make loop fast and slow by chaging unit 
//force user to give maximum time else it will 
var xInterval=function (time,loops) {
	var x={
		//note:Concept of quickly clearinf intevals to use it mulpile times or generate multiple instance i.e switch
		//interval with diffrent instance
		//properties
			//clock is the time used by timetime to start acting on 
			//It can be used for making customs loops etc
			clock:0, 
			//if you want to break loop or giv it fixed numbers of loop
			breakloop:isNumber(loops)?loops:null,
			//Unit in which intervals keeps on looping, default is 100ms
			clockUnit:100,
			//timeline hold the time and callback for it.
			timeLine:{	
						remove:function(t){ 
						if(this.hasOwnProperty(t)){
							delete this[t];
							console.log('Removed action on time:'+t);
						}
						
						},
			},//sjould not be called directly
			//interval that hold name of intervals to reference setInterval()
			interval:null,
			//current status of play
			state:'paused',
			//loop n,
			n:1,
			//change in time
			timeEdit:0,
			//Max time
			timeOver:isNumber(time)?time:null,

		//methods
			//set clock time in ms
			setClock:function(time){
				
				x.clock=time;
				x.n++;
				
			},
			//just for testing
			showUserControl:function(elementname){

				var controlbox,play,pause,start,backward,forward,stop,restart;
				controlbox=document.createElement("button");
				play=document.createElement("button");
				play.textContent="play";
				pause=document.createElement("button");
				pause.textContent="pause";
				resume=document.createElement("button");
				resume.textContent="resume";
				stop=document.createElement("button");
				stop.textContent="stop";
				start=document.createElement("button");
				start.textContent="start";
				backward=document.createElement("button");
				backward.textContent="backward";
				forward=document.createElement("button");
				forward.textContent="forward";
				clear=document.createElement("button");
				clear.textContent="clear";
				//--------------------------------
				controlbox.append(play);
				controlbox.append(pause);
				controlbox.append(resume);
				controlbox.append(stop);
				controlbox.append(backward);
				controlbox.append(forward);
				controlbox.append(start);
				controlbox.append(clear);
				//-----------------------------------
				controlbox.style.position="absolute";
				controlbox.style.zIndex=100;
				controlbox.style.bottom="5px";
				controlbox.style.opacity="0.5";
				//controlbox.style.position="absolute";
				document.body.append(controlbox);
				//---------------


				play.onclick=function(){
					x.resume();
				};
				pause.onclick=function(){
					x.pause();
				};
				resume.onclick=function(){
					x.resume();
				};
				stop.onclick=function(){
					x.stop();
				};
				start.onclick=function(){
					x.start();
				};
				backward.onclick=function(){
					x.backward(500);
				};
				forward.onclick=function(){
					x.forward(500);
				};
				clear.onclick=function(){
					x.clear();
				};

				return controlbox;
			},
			//set clockunit
			setClockUnit:function (newUnit) {
				this.clockUnit=time;
				return this;
			},
			//start the interval process and handle initial callback and loop
			start:function(){//we can aslo pass time and loop here
				if(this.state==='paused'){
					//handing callback and loop time
					
						this.n=1;	
						this.clock=0;
						this.clockInterval();
						this.state='running';
					}
					return this;
			},
			//pause the current play
			pause:function(){
					//console.log("paused")
					if(this.state==='running'){
						clearInterval(this.interval);
						this.state='paused';
					}
					return this;
				},
			//resume the paused play on current timeline	
			resume:function(){
				//console.log("resume")
				if(this.state==='paused'){
					this.clockInterval();
					this.state='running'
				}
				return this;
			},
			//forward in ms
			forward:function(time){
				if(this.clock+time>this.timeOver){
					this.clock=this.timeOver;
				}else{
					this.clock=this.clock+time;
				}
				if(this.state==='paused'){
					this.clockInterval();
					clearInterval(this.interval);
				}
				return this;
			},
			//backward in ms
			backward:function(time){
				if(this.clock-time<0){
					this.clock=0;
				}else{
					this.clock=this.clock-time;
				}
				if(this.state==='paused'){
					this.clockInterval();
					clearInterval(this.interval);
				}
				return this;
			},
			reverse:function(){
				var newtimeline={};
				for( keys in this.timeLine){
					var key=keys

					
					
					if(parseInt(key) && keys<this.timeOver){
						key=this.timeOver-keys;
						console.log(key);
					}

					
					newtimeline[key]=this.timeLine[keys];
				}

				this.timeLine=newtimeline;
				return this;

			},
			slow:function(time){
				var time=isNumber(time)?time:100;
				var newtimeline={};
				this.timeOver+=Math.round(50/100*this.timeOver);
				for( keys in this.timeLine){
					var key=keys
					
					if(parseInt(keys) && keys<this.timeOver){
						key=parseInt(keys)+(50/100*parseInt(keys));
						key=parseInt(Math.round(key/100))*100;
						console.log(key);
					}
					newtimeline[key]=this.timeLine[keys];
				}

				this.timeLine=newtimeline;
					//this.timeEdit+=time;
			},//require ramtimeline, to load modified timeline
			fast:function(time){ 
				if(-2>this.timeEdit){ return false;}
				var time=isNumber(time)?time/100:1;
				var newtimeline={};
				for( keys in this.timeLine){
					var key=keys
					if(parseInt(keys) && time<keys && keys>200){
						key=parseInt(keys)-(50/100*parseInt(keys));
						key=parseInt(Math.round(key/100))*100;
						console.log(key);
					}
					newtimeline[key]=this.timeLine[keys];
				}

				this.timeLine=newtimeline;
				this.timeOver-=Math.round(50/100*this.timeOver);

				this.timeEdit-=1;
			},
			//stop the timeline not loop
			stop:function(){//stop will count the loop where start will not count the loop
					//console.log("paused")
					if(this.state==='running'){
						clearInterval(this.interval);
						this.state='paused';
						this.clock=0;

					}
					return this;
				},
			//restart the whole series	
			restart:function(){return this.start();},	
			//clear the interval
			clear:function(){
				if(this.interval){
					clearInterval(this.interval);
					this.clock=0;
					this.state='paused';
					this.n=1;
				}

				return this;
				},
			at:function(time,callback){
				if(arguments.length==1 && isObject(arguments[0])){
					for (keys in arguments[0]){
						//megre if it has collison 
						if(this.timeLine.hasOwnProperty(keys)){
							var getOldCallback=this.timeLine[keys];
							this.timeLine[keys]=function(i,t,c){
								getOldCallback(i,t,c);
								arguments[0][keys](i,t,c);
							};
						}else{
							this.timeLine[keys]=arguments[0][keys];
						}
						
					}
				}else if(isFinite(time) && isFunction(callback)){
						if(this.timeLine.hasOwnProperty(time)){
							var getOldCallback=this.timeLine[time];
							console.log("collison");
								this.timeLine[time]=function(i,t,c){
								getOldCallback(i,t,c);
								callback(i,t,c);
							};
						}else{
							this.timeLine[time]=callback;
						}
					

				}else{
					console.log('Illegal arguments supplied to xInterval.at method');
				}
				return this;
				},
				//Main Processor
				clockInterval:function () {
					if(!this.timeOver){
						console.log("Please give your timeline a time where it can hault");
						return false;
					}
					var that=this;		
					var interval=setInterval(function(){
						//
						if(that.clock>that.timeOver){ 
							//loop forever unless loop limit is there
							if(that.breakloop){
							if(that.breakloop == that.n++){
								clearInterval(that.interval);
								return 2;
							}
							
						}else{//no loops
							that.clock=0;
						}
						
						}
						//IntervalProcessor
							//Handle Timeline
							//check if timline is empty
							if(isObjectNotEmpty(that.timeLine)){
								//clock has passed one unit
								that.clock+=that.clockUnit;
								//console.log(that.clock);
								if(that.timeLine.hasOwnProperty(that.clock)){
									if(isFunction(that.timeLine[that.clock])){
										that.timeLine[that.clock](interval,that.setClock,that.clock);//arguments(interval,setClock(),curentTime)
									}else{
										console.log("Not a valid function in timeline:"+that.clock);
									}
								}
						 	}else{
						 		that.clear();
						 	}

						//Endof IntervalProcesor
					},this.clockUnit);
					//
					this.state="running";
					this.interval=interval;
					return this;
				},
				//deleting timeLine Component
				remove:function(time){
						if(this.timeLine.hasOwnProperty(time)){
							delete this.timeLine[time];
							console.log('Removed action on time:'+time);
						}
						return this;
				},
				
	}//end of return
	return this.x=x;
};//end of Xinterval



////////////////xTimeout(Extended Timeout or setTimeout())
xTimeout=function(callback,time){
	//this can be called only throgh at() method, order at which at is defined is necessary,
	//for orderless and free use of atfunction used xinterval with loop 1 
	var x={
		init:0,
		state:'paused',
		xtimer:null,
		totaltime:0,
		timeLine:[],
		//better call it after;
		at:function(time,callback){
					if(arguments.length==1 && isObject(arguments[0])){
					for (keys in arguments[0]){
					var timespace=keys-this.totaltime;
					this.timeLine.push({time:timespace, callback:arguments[0][keys]});
					this.totaltime=keys;
					}
					}else if(isFinite(time) && isFunction(callback)){
						this.timeLine.push({time:time,callback:callback});
					}else{
							console.log('Illegal arguments supplied to xTimeout.at method');
						}
					return this;

		},
		after:function(time,callback){
			return this.at(time,callback);
		},
		main:function(){
			var length=this.timeLine.length;
			var list=this.timeLine;
			this.xtimer = setTimeout(function() {
				  	list[x.init].callback();
					x.init++;
					if(x.init==length){
						clearTimeout(x.xtimer);
						return false;
					}
					x.xtimer = setTimeout(arguments.callee, list[x.init].time)
				  },
				  list[x.init].time);


		},
		next:function(){
			this.pause();
			if(this.init<this.timeLine.length){
				this.init+=1;
			}else{
				this.init=this.timeLine.length;
			}
			return this.resume();
		},
		first:function(){
			this.init=0;
			return this;
		},
		last:function(){
			this.init=this.timeLine.length-1;
			this.this;
		},
		//
		previous:function(){
			this.pause();
			if(this.init>1){
				this.init-=2;
			}else{
				this.init=0;
			}
			return this.resume();
			

		},
		start:function(){
			//no need for custom time 
			// if(isFunction(callback) && isFinite(time)){
			// 					this.at(time,callback);
			// 				}
			this.state='running';
			this.init=0;
			this.main();
			return this;
		},
		pause:function(){
			if(this.state=='running'){
				if(this.xtimer){
				clearTimeout(this.xtimer);
				this.state='paused';
			   }
			}

			return this;
		},
		resume:function(){
			if(this.state=='paused' && this.timeLine.length>this.init){
				this.main();
				this.state='running';
			}
			return this;
		},
		clear:function(){
			if(this.xtimer){
				clearTimeout(this.xtimer);
			}
		},
		showUserControl:function(elementname){
				var x=this;
				var controlbox,play,pause,start,backward,forward;
				controlbox=document.createElement("button");
				play=document.createElement("button");
				play.textContent="play";
				pause=document.createElement("button");
				pause.textContent="pause";
				resume=document.createElement("button");
				resume.textContent="resume";
				start=document.createElement("button");
				start.textContent="start";
				backward=document.createElement("button");
				backward.textContent="previous";
				forward=document.createElement("button");
				forward.textContent="next";
				clear=document.createElement("button");
				clear.textContent="clear";
				//--------------------------------
				controlbox.append(play);
				controlbox.append(pause);
				controlbox.append(resume);
				
				controlbox.append(backward);
				controlbox.append(forward);
				controlbox.append(start);
				controlbox.append(clear);
				//-----------------------------------
				controlbox.style.position="absolute";
				controlbox.style.zIndex=100;
				controlbox.style.bottom="5px";
				controlbox.style.opacity="0.5";
				//controlbox.style.position="absolute";
				document.body.append(controlbox);
				//---------------


				play.onclick=function(){
					x.resume();
				};
				pause.onclick=function(){
					x.pause();
				};
				resume.onclick=function(){
					x.resume();
				};
				
				start.onclick=function(){
					x.start();
				};
				backward.onclick=function(){
					x.previous(500);
				};
				forward.onclick=function(){
					x.next(500);
				};
				clear.onclick=function(){
					x.clear();
				};
				//return the controlbox for user to modify HTML ELEment
				return controlbox;
			},	
	}
return this.x=x;
};


////////////////////////////EOXTIMEOUT////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------
				
