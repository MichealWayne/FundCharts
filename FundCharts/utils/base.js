/**
 * 基础方法
 */

/**
 * @function type
 * @description **_.fn.type(val)** get the variable value's type
 * @param val variable value
 * @return {String} type
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' },
 *     test3 = 'abc',
 *     test4;
 * _.fn.type(test1);  // 'Array'
 * _.fn.type(test2);  // 'Object'
 * _.fn.type(test3);  // 'String'
 * _.fn.type(test4);  // 'Undefined'
 */
export function type(val){return Object.prototype.toString.call(val).replace(/\[object\s|\]/g,'')}
export function isArray(val){return type(val)==='Array'}
export function isString(val){return type(val)==='String'}
export function isObject(val){return type(val)==='Object'}
export function isFunction(val){return type(val)==='Function'}
export function each(array,fn){for(let i=0,len=array.length;i<len;i++){fn(array[i],i)}}
export function cloneObjDeep(fromobj,toobj){if(!isObject(fromobj)||!isObject(toobj))return false;for(let i in fromobj){if(isObject(toobj[i])&&!isEmptyObj[i]){cloneObjDeep(fromobj[i],toobj[i]);continue;}
toobj[i]=toobj[i]||fromobj[i];}
return toobj;}
export let cloneArray=(fromarr,toarr)=>{fromarr.map((item,index)=>{toarr[index]=item;});return toarr;}
export function isEmptyObj(obj){if(!obj)return false;for(let key in obj){return false;}
return true;}
export function getColorRgb(color){let reg=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;let sColor=color.toLowerCase();if(sColor&&reg.test(sColor)){if(sColor.length===4){let sColorNew='#';for(let i=1;i<4;i++){sColorNew+=sColor.slice(i,i+1).concat(sColor.slice(i,i+1));}
sColor=sColorNew;}
let sColorChange=[];for(let i=1;i<7;i+=2){sColorChange.push(parseInt('0x'+sColor.slice(i,i+2)));}
return sColorChange}else{return sColor;}}