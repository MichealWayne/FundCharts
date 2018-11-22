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
export function type(val) {
    return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, '')
}

/**
 * @function isArray
 * @description **_.fn.isArray(val)** if the variable value is Array
 * @param variable value 
 * @return {Boolean} true | false
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' };
 * _.fn.isArray(test1);  // true
 * _.fn.isArray(test2);  // false
 */
export function isArray(val) {
    return type(val) === 'Array'
}

/**
 * @function isString
 * @description **_.fn.isString(val)** if the variable value is String
 * @param val variable value
 * @return {Boolean} true | false
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = 'abc';
 * _.fn.isString(test1);  // false
 * _.fn.isString(test2);  // true
 */
export function isString(val) {
    return type(val) === 'String'
}

/**
 * @function isObject
 * @description **_.fn.isObject(val)** if the variable value is Object
 * @param val variable value
 * @return {Boolean} true | false
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' };
 * _.fn.isObject(test1);  // false
 * _.fn.isObject(test2);  // true
 */
export function isObject(val) {
    return type(val) === 'Object'
}

/*
 * @function isFunction
 * @description **_.fn.isFunction(val)** if the variable value is Function
 * @param val variable value
 * @return {Boolean} true | false
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = function () { alert(1) };
 * _.fn.isFunction(test1);  // false
 * _.fn.isFunction(test2);  // true
 */
export function isFunction(val) {
    return type(val) === 'Function'
}

/**
 * @function each
 * @description **_.fn.each(array, fn)** traverse Array
 * @param {Array} array
 * @param {Function} handle function
 * @example
 * var arr = [1, 2, 3];
 * _.fn.each(arr, function (i) {console.log(i)});
 * // 1
 * // 2
 * // 3
 */
export function each(array, fn) {
    for (let i = 0, len = array.length; i < len; i++) {
        fn(array[i], i)
    }
}


/**
 * @function cloneObj
 * @description **_.fn.cloneObj(fromobj, toobj)** clone a object to new vari
 * @param {Object} fromobj ´Ó¸Ã¶ÔÏó¸´ÖÆÄÚÈÝ
 * @param {Object} toobj Ô­¶ÔÏó
 * @return {Object} copied object
 * @example
 * var obj1 = {
 *    a: 1,
 *    b: {
 *        c: 2,
 *        d: 3
 *    },
 *    e: 4
 * };
 * var obj2 = {
 *    a: 'a',
 *    f: 'f'
 * };
 *
 * var obj3 = cloneObjDeep(obj1, obj2);
 * // obj3 == obj2 : {"a":"a","f":"f","b":{"c":2,"d":3},"e":4}
 */
export function cloneObjDeep(fromobj, toobj) {
    if (!isObject(fromobj) || !isObject(toobj)) return false;

    for (let i in fromobj) {
        if (isObject(toobj[i]) && !isEmptyObj[i]) { // obj
            cloneObjDeep(fromobj[i], toobj[i]);
            continue;
        }

        toobj[i] = toobj[i] || fromobj[i];
    }

    return toobj;
}

/**
 * @function cloneArray
 * @description **_.fn.cloneArray(fromarr, toarr)** 
 * @param {Array} fromobj
 * @param {Array} toobj
 * @return {Array} copied array
 * @example
 * var arr1 = [1,2,3,4,5,6];
 * var arr2 = [7];
 * var arr3 = _.fn.cloneArray(arr1, arr2);
 * // arr2 == arr3 : [1, 2, 3, 4, 5, 6]
 */
export let cloneArray = (fromarr, toarr) => {
    fromarr.map((item, index) => {
        toarr[index] = item;
    });

    return toarr;
}

/**
 * @function isEmptyObj
 * @example
 * var obj1 = { a: 1 };
 * var obj2 = {};
 * _.fn.isEmptyObj(obj1);    // false
 * _.fn.isEmptyObj(obj2);    // true
 */
export function isEmptyObj(obj) {
    if (!obj) return false;
    for (let key in obj) {
        return false;
    }
    return true;
}

/**
 * @function hexadecimal color to 255
 * #ff0000 -> [255, 0, 0];
 * @param {String} color : hexadecimal number color
 * @return {Array} 255
 */
export function getColorRgb(color) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i++) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值  
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
        }
        return sColorChange
    } else {
        return sColor;
    }
}