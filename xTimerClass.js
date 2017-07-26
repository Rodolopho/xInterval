

/////-----------------------------------------------------------------------//////

/*
    |--------------------------------------------------------------------------
    | XTimeout [Extended Timeout]
    |--------------------------------------------------------------------------
    |
    */
////////////////xTimeout(Extended Timeout or setTimeout())
xTimeout=function(repeat){//how many times you want to repeat
	//this can be called only throgh at() method, order at which at is defined is necessary,
	//for orderless and free use of atfunction used xinterval with loop 1 
		this.loop=isNumber(repeat)?(--repeat):false;
		this.loopCount=0;
		this.init=0;
		this.state='paused';
		this.xtimer=null;
		this.totaltime=0;
		this.timeLine=[];
		//better call it after;
		this.at=function(time,callback){
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

		};
		this.after=function(time,callback){
			return this.at(time,callback);
		};
		this.main=function(){
			var x=this;
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


		};
	};//End of XTimer Constructor

	/*
    |--------------------------------------------------------------------------
    | XTimeout Prototypes
    |--------------------------------------------------------------------------
    |
    */
	xTimeout.prototype={
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
			if(isFunction(this.event.beforestart)) this.event.beforestart();
			if(this.loop){
				console.log(this.loop);
				var that=this;
				this.at(100,function(){
						if(that.loopCount<that.loop){
							that.loopCount++;
							that.init=0;
						}else{
							that.timeLine.pop();
						}
				})
			}
			//no need for custom time 
			// if(isFunction(callback) && isFinite(time)){
			// 					this.at(time,callback);
			//				}
			this.pause();
			this.state='running';
			this.init=0;
			if(isFunction(this.event.onstart)) this.event.onstart();
			this.main();
			
			if(isFunction(this.event.afterstart)) this.event.afterstart();
			return this;
		},
		pause:function(){
			if(isFunction(this.event.beforepause)) this.event.beforepause();
			if(this.state=='running'){

				if(this.xtimer){
				clearTimeout(this.xtimer);
				this.state='paused';
				if(isFunction(this.event.onpause)) this.event.onpause();
			   }
			}
			if(isFunction(this.event.afterpause)) this.event.afterpause();

			return this;
		},
		resume:function(){
			if(isFunction(this.event.beforeresume)) this.event.beforeresume();
			if(this.state=='paused' && this.timeLine.length>this.init){
				this.main();
				this.state='running';
				if(isFunction(this.event.onresume)) this.event.onresume();
			}
			if(isFunction(this.event.afterresume)) this.event.afterresume();
			return this;
		},
		clear:function(){
			if(this.xtimer){
				clearTimeout(this.xtimer);
			}
		},
		stop:function(){
			if(isFunction(this.event.beforestop)) this.event.beforestop();
			this.clear();
			this.state="paused";
			this.init=0;
			if(isFunction(this.event.onstop)) this.event.onstop();
			if(isFunction(this.event.afterstop)) this.event.afterstop();
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
	};//End of Xtimer Prototypes

////////////////////////////EOXTIMEOUT////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------
				
