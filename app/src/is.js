//function to check fllowed by its variant to return default if its false

//..Or(e,d); checks if return e if true else return default "d"; e.f numberOr(e,1); 

function isArray(e) {
  		return Object.prototype.toString.call(s) === '[object Array]';
};
function arrayOr(e,d){
  return isArray(e)?e:d;
};


function isHTMLElement(e){
  if(!e){return false;}
    return !! e.nodeName;
};
function htmlElementOr(e,d){
  return isHTMLElement(e)?e:d;
};

function isValid(e){
  if(!isUndefined(e) && !isNull(e)) return true;
  return false;
}

function validOr(e,d){
 return isValid(e)?e:d;
}

function isError(e){
     return Object.prototype.toString.call(e) === '[object Error]';
};
function errorOr(e,d){
  return isError(e)?e:d;
};


function isUndefined(e){
     return Object.prototype.toString.call(e) === '[object Undefined]';
};
function undefinedOr(e,d){
  return isUndefined(e)?e:d;
};


function isNull(e){
     return Object.prototype.toString.call(e) === '[object Null]';
};
function nullOr(e,d){
  return isNull(e)?e:d;
};


function isMath(e){
     return Object.prototype.toString.call(e) === '[object Math]';
};
function mathOr(e,d){
  return isMath(e)?e:d;
};


function isObject(e){
		 return Object.prototype.toString.call(e) === '[object Object]';
};
function objectOr(e,d){
  return isObject(e)?e:d;
};


function isFunction(e){
	return Object.prototype.toString.call(e) === '[object Function]';
};
function functionOr(e,d){
  return isFunction(e)?e:d;
};


function isRegExp(e){
	return Object.prototype.toString.call(e) === '[object RegExp]';
};
function regExpOr(e,d){
  return isRegExp(e)?e:d;
};


function isString(e){
	return Object.prototype.toString.call(e) === '[object String]';
};
function stringOr(e,d){
  return isString(e)?e:d;
};


function isDate(e){
	return Object.prototype.toString.call(e) === '[object Date]';
};
function dateOr(e,d){
  return isDate(e)?e:d;
};

function isNegativeNumber(e){
  if(Object.prototype.toString.call(e) !== '[object Number]') return false;
  return 0>e; 
};
function negativeNumberOr(e,d){
  return isNegativeNumber(e)?e:d;
}
function isPositiveNumber(e){
  if(Object.prototype.toString.call(e) !== '[object Number]') return false;
  return 0<=e; 
};
function postiveNumberOr(e,d){
  return isPositiveNumber(e)?e:d;
}
function isNumber(e){
	return Object.prototype.toString.call(e) === '[object Number]';
};
function numberOr(e,d){
  return isNumber(e)?e:d;
};


function isBoolean(e){
  return Object.prototype.toString.call(e) === '[object Boolean]';
};
function booleanOr(e,d){
  return isBoolean(e)?e:d;
};


function isObjectNotEmpty(e){//only for object
    if(!isObject(e)) return false;
	return !! Object.keys(e).length;
};
function objectNotEmptyOr(e,d){
  return isObjectNotEmpty(e)?e:d;
};


function isArgs(args){
  return Object.prototype.toString.call(args) === "[object Arguments]";
};
function argsOr(e,d){
  return isArgs(e)?e:d;
};


// function  isArgsTypeOf(data,test){// here we call this inside funtion where test is a isfunctiobn//it should test type of date from agruments
//     if(isFunction(test) && isArgs(data) ){
//       for (var i = 0; i < data.length; i++) {
//         var check=test(data[i]);
//         if(!check){return false;}
//       }
//       return true;
//     }else{
//       return false;
//     }

//   };
  
// ------------------------------------------------------------------------------------------------
//DOM 
function isTextNode(e){
  if(!isHTMLElement(e)) return false;
  return e.nodeType===3;
}
function textNodeOr(e,d){
  return isTextNode(e)?e:d;
};
