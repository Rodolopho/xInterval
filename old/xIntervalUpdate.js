//require is.js
//make loop fast and slow by chaging unit 
var xInterval=function (callback,time,loops) {
	var x={
		//note:Concept of quickly clearinf intevals to use it mulpile times or generate multiple instance i.e switch
		//interval with diffrent instance
		//properties
			//clock is the time used by timetime to start acting on 
			//It can be used for making customs loops etc
			clock:0, 
			//if you want to break loop or giv it fixed numbers of loop
			breakloop:loops?loops:null,
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
			n:0,
			//looppoint
			loopPoint:false,

		//methods
			//set clock time in ms
			setClock:function(time){
				
				x.clock=time;
				x.n++;
				
			},
			//set clockunit
			setClockUnit:function (newUnit) {
				this.clockUnit=time;
				return this;
			},
			//start the interval process and handle initial callback and loop
			start:function(){
				if(this.state==='paused'){
					//handing callback and loop time
					if(isFunction(callback) && isFinite(time)){
								this.at(time,function(i,t,c){
									callback()
									t(0);
								})
							}
						this.n=0;	
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
			//clear the interval
			clear:function(){
				if(this.interval){
					clearInterval(this.interval);
					this.clock=0;
					this.state='paused';
					this.n=0;
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
					var that=this;		
					var interval=setInterval(function(){
						if(that.breakloop){
							if(that.breakloop == that.n){
								clearInterval(that.interval);

							}
						}
						//IntervalProcessor
							//Handle Timeline
							//check if timline is empty
							if(isObjectNotEmpty(that.timeLine)){
								//clock has passed one unit
								that.clock+=that.clockUnit;
								console.log(that.clock);
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
			if(this.state=='paused'){
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
	}
return this.x=x;
};

////////////////////////////EOXTIMEOUT////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------
				
