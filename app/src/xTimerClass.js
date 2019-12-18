

/////-----------Part 2. xInterval.js------------------------------------------------------------//////

/*
    |--------------------------------------------------------------------------
    | XTimeout [Extended Timeout]
    |--------------------------------------------------------------------------
    |
    */
////////////////xTimeout(Extended Timeout or setTimeout())
// export var xTimeout=function(repeat){//how many times you want to repeat
	const  is=require("./is6.js ")
	module.exports=xTimeout;
	function xTimeout(repeat){//how many times you want to repeat
	//this can be called only throgh at() method, order at which at is defined is necessary,
	//for orderless and free use of atfunction used xinterval with loop 1 
		// loop is number of times you want to loop;
		this.loop=is.isNumber(repeat)?(--repeat):false;
		//updating count as loop keeps on
		this.loopCount=0;
		//init will be used for  and monitoring timeline index, timeline[init]
		this.init=0;
		//state of timeline
		this.state='paused';
		//xtimer hold the  id of setTimeout instance of current timeout instance i.e xtimer=setTimeout()///
		this.xtimer=null;
		//not used as no args is passed in at(); method
		this.totaltime=0;

		//list of callbacks event that should happend  after igiven time
		this.timeLine=[];
		//better call it after;
		this.at=function(time,callback){

					if(arguments.length==1 && is.isObject(arguments[0])){
						//Currently not supported well, try avoid using {} for injecting callnack in timeline
						for (var keys in arguments[0]){
						var timespace=keys-this.totaltime;
						this.timeLine.push({time:timespace, callback:arguments[0][keys]});
						this.totaltime=keys;
						}

						console.warn("Dont pass {} agruments in after() or at() methods; might not get desired result");
					}else if(isFinite(time) && is.isFunction(callback)){
						this.timeLine.push({time:time,callback:callback});
					}else{
							console.log('Illegal arguments supplied to xTimeout.at method');
					}
					return this;

		};
		//
		this.after=function(time,callback){
			if(arguments.length==1 && is.isObject(arguments[0])){
				return this.at(time);
				}else{
					return this.at(time,callback);
				}
			
			
		};
		//main function to handle setTimeout event
		this.main=function(){
			var x=this;
			var length=this.timeLine.length;
			var list=this.timeLine;
			this.xtimer = setTimeout( function xt() {
				    if(x.state=="paused"){
						clearTimeout(x.xtimer);
				    return false;
				    	
				    }
				  	list[x.init].callback();
					x.init++;
					if(x.init==length){
						clearTimeout(x.xtimer);
						return false;
					}
					
					x.xtimer = setTimeout(xt, list[x.init].time);

				  },
				  list[x.init].time);


		};
	};//End of XTimer Constructor

	/*
    |--------------------------------------------------------------------------
    | XTimeout Prototypes
    |--------------------------------------------------------------------------
    |
    */
	xTimeout.prototype={
		toString:function(){ return "[Object xTimeout]"},
		//goto next action in timeline
		next:function(){
			this.pause();
			if(this.init<this.timeLine.length){
				this.init+=1;
			}else{
				this.init=this.timeLine.length;
			}
			return this.resume();
		},
		//goto first
		first:function(){
			this.init=0;
			return this;
		},
		//goto last
		last:function(){
			this.init=this.timeLine.length-1;
			this.this;
		},
		//go to  previous
		previous:function(){
			this.pause();
			if(this.init>1){
				this.init-=2;
			}else{
				this.init=0;
			}
			return this.resume();
			

		},
		//start
		start:function(){
			if(is.isFunction(this.event.beforestart)) this.event.beforestart();
			if(this.loop){

				var that=this;
				this.at(100,function(){
						if(that.loopCount<that.loop){
							if(is.isFunction(that.event.beforeloop)) that.event.beforeloop();
							that.loopCount++;
							that.init=-1;
						}else{
							that.timeLine.pop();
							if(is.isFunction(that.event.afterloop)) that.event.afterloop();
						}
				})
			}
			//no need for custom time 
			// if(isFunction(callback) && isFinite(time)){
			// 					this.at(time,callback);
			//				}
			//this.pause();
			this.state='running';
			this.init=0;
			if(is.isFunction(this.event.onstart)) this.event.onstart();
			this.main();
			
			if(is.isFunction(this.event.afterstart)) this.event.afterstart();
			return this;
		},
		
		pause:function(){
			if(is.isFunction(this.event.beforepause)) this.event.beforepause();
			if(this.state=='running'){

				this.clear();
				this.state='paused';
				if(is.isFunction(this.event.onpause)) this.event.onpause();
			   }
			
			if(is.isFunction(this.event.afterpause)) this.event.afterpause();

			return this;
		},
		resume:function(){
			if(is.isFunction(this.event.beforeresume)) this.event.beforeresume();
			if(this.state=='paused' && this.timeLine.length>this.init){
				this.main();
				this.state='running';
				if(is.isFunction(this.event.onresume)) this.event.onresume();
			}
			if(is.isFunction(this.event.afterresume)) this.event.afterresume();
			return this;
		},
		clear:function(){
			if(this.xtimer){
				clearTimeout(this.xtimer);
			}
		},
		stop:function(){
			if(is.isFunction(this.event.beforestop)) this.event.beforestop();
			this.clear();
			this.state="paused";
			this.init=0;
			if(is.isFunction(this.event.onstop)) this.event.onstop();
			if(is.isFunction(this.event.afterstop)) this.event.afterstop();
		},
		//Events//single events handle for now
			event:{
				beforeplay:null,
				afterplay:null,
				onplay:null,
				onpause:null,
				beforepause:null,
				afterpause:null,
				beforestart:null,
				afterstart:null,
				onstart:null,
				onstop:null,
				beforestop:null,
				afterstop:null,
				onresume:null,
				beforeresume:null,
				afterresume:null,
				onloop:null,
				beforeloop:null,
				afterloop:null,

			},	
		// showUserControl:function(el){
		// 		var x=this;
		// 		var controlbox,play,pause,start,backward,forward,resume,clear;
		// 		controlbox=document.createElement("button");
		// 		play=document.createElement("button");
		// 		play.textContent="play";
		// 		pause=document.createElement("button");
		// 		pause.textContent="pause";
		// 		resume=document.createElement("button");
		// 		resume.textContent="resume";
		// 		start=document.createElement("button");
		// 		start.textContent="start";
		// 		backward=document.createElement("button");
		// 		backward.textContent="previous";
		// 		forward=document.createElement("button");
		// 		forward.textContent="next";
		// 		clear=document.createElement("button");
		// 		clear.textContent="clear";
		// 		//--------------------------------
		// 		controlbox.append(play);
		// 		controlbox.append(pause);
		// 		controlbox.append(resume);
				
		// 		controlbox.append(backward);
		// 		controlbox.append(forward);
		// 		controlbox.append(start);
		// 		controlbox.append(clear);
		// 		//-----------------------------------
		// 		controlbox.style.position="absolute";
		// 		controlbox.style.zIndex=100;
		// 		controlbox.style.bottom="5px";
		// 		controlbox.style.opacity="0.5";
		// 		//controlbox.style.position="absolute";
		// 		if(el){
		// 			el.append(controlbox);
		// 		}else{
		// 			document.body.append(controlbox);
		// 		}
				
		// 		//---------------


		// 		play.onclick=function(){
		// 			x.resume();
		// 		};
		// 		pause.onclick=function(){
		// 			x.pause();
		// 		};
		// 		resume.onclick=function(){
		// 			x.resume();
		// 		};
				
		// 		start.onclick=function(){
		// 			x.start();
		// 		};
		// 		backward.onclick=function(){
		// 			x.previous(500);
		// 		};
		// 		forward.onclick=function(){
		// 			x.next(500);
		// 		};
		// 		clear.onclick=function(){
		// 			x.clear();
		// 		};
		// 		//return the controlbox for user to modify HTML ELEment
		// 		return controlbox;
		// 	},	
	};//End of Xtimer Prototypes

////////////////////////////EOXTIMEOUT////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------
				
