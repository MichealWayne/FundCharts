/*!
 * KlineChart
 * @version: 0.9.10
 * @author: Micheal Wayne(michealwayne@163.com)
 * @time: 2018~2021
 */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=11)}([function(t,e,n){"use strict";function r(t){return Object.prototype.toString.call(t).replace(/\[object\s|\]/g,"")}function i(t){return"Object"===r(t)}function a(t,e){for(var n=0,r=t.length;n<r;n++)e(t[n],n)}e.__esModule=!0,e.type=r,e.isArray=function(t){return"Array"===r(t)},e.isString=function(t){return"String"===r(t)},e.isObject=i,e.isFunction=function(t){return"Function"===r(t)},e.each=a,e.cloneObjDeep=function t(e,n){if(!i(e)||!i(n))return!1;for(var r in e)!i(n[r])||o[r]?n[r]=n[r]||e[r]:t(e[r],n[r]);return n},e.isEmptyObj=o,e.getColorRgbArr=s,e.getColorRgba=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return"rgba("+s(t).join(",")+","+e+")"},e.Lighting=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return s(t).map((function(t){return(t+=t*e)>255?255:t}))},e.throwError=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";throw new Error("Error!"+t+".(FundCharts-"+e+" "+n+")")},e.min=function(t){return t.reduce((function(t,e){return Math.min(t,e)}))},e.max=function(t){return t.reduce((function(t,e){return Math.max(t,e)}))},e.getExtremum=function(t){for(var e=t[0],n=e,r=Math.max,i=Math.min,a=1,o=t.length;a<o;a++)e=r(e,t[a]),n=i(n,t[a]);return{_max:e,_min:n}};e.cloneArray=function(t,e){return a(t,(function(t,n){e[n]=t})),e};function o(t){if(!t)return!1;for(var e in t)return!1;return!0}function s(t){var e=t.toLowerCase();if(e&&/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e)){if(4===e.length){for(var n="#",r=1;r<4;r++)n+=e.slice(r,r+1).concat(e.slice(r,r+1));e=n}for(var i=[],a=1;a<7;a+=2)i.push(parseInt("0x"+e.slice(a,a+2),16));return i}return e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setContext=e.retinaScale=e.clearArc=e.drawPoint=e.drawDashLine=e.drawLine=void 0;var r=n(3),i=n(0);e.drawLine=function(t,e,n,r,i){t.beginPath(),t.moveTo(e,n),t.lineTo(r,i),t.closePath(),t.stroke()},e.drawDashLine=function(t,e,n,r,i,a){a=a||5;var o,s,c=~~((o=r-e,s=i-n,Math.sqrt(Math.pow(o,2)+Math.pow(s,2)))/a);t.beginPath();for(var h=0;h<c;h++)t[1&h?"lineTo":"moveTo"](e+(r-e)/c*h,n+(i-n)/c*h);t.closePath(),t.stroke()},e.drawPoint=function(t,e,n,r,i,a,o){t.beginPath(),t.strokeStyle=i||"#fff",t.lineWidth=void 0!==o?o:1,t.arc(e,n,a,0,2*Math.PI,!0),t.closePath(),t.fillStyle=r,t.fill(),o&&t.stroke()},e.clearArc=function(t,e,n,r){var i=.1;!function e(n,r,a){var o=a-i,s=Math.sqrt(a*a-o*o),c=n-o,h=r-s,u=2*o,f=2*s;i<=a&&(t.clearRect(c,h,u,f),i+=.1,e(n,r,a))}(e,n,r)},e.retinaScale=function(t,e){var n=window.devicePixelRatio||1;if(1===n)return!1;var r=t.width,i=t.height;return t.width=r*n,t.height=i*n,e.scale(n,n),t.style.width=r+"px",t.style.height=i+"px",n},e.setContext=function(t,e,n){(!t||e?t.$el:t.opts.Canvas||n)||i.throwError("no chart object to set context","setContext");var a,o=t.opts,s=o.width||500,c=o.height||500;if(e){var h=t.$el;if(h.style.webkitUserSelect="none",h.style.userSelect="none",i.isFunction(h.getContext))a=h;else{(a=document.createElement("canvas")).id=o.id+"Canvas";var u=o.width||r.getStyle(h,"width"),f=o.height||r.getStyle(h,"height");a.width=u,a.height=f,h.appendChild(a)}}else if(n){var l="undefined"==typeof wx?null:wx;if(!l||!i.isFunction(l.createCanvasContext))return i.throwError("no param {Object} Ctx","setContext"),!1;var d=l.createCanvasContext(o.id);a={info:"Weapp native canvas",width:s,height:c,getContext:function(){return d},draw:function(e){if(e)return d.draw(!0);l.drawCanvas({canvasId:o.id,actions:t.ctx.getActions()})}}}else{var p=o.Canvas;o.Canvas||i.throwError("no param {Object} Canvas","setContext"),a=p.createCanvas(s,c),o.handleOut&&o.handleOut(a)}t.canvas=a,t.ctx=a.getContext("2d"),t._chart={width:a.width,height:a.height}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(1),a=n(4),o=a.default.inBrowser,s=a.default.inWeapp,c=function(){function t(t){this.$el=null,this.drawer=null,this.canvas=null,this.ctx=null;var e=t.id,n=t.colors,i=t.data,s=t.datas;e&&(i||s)?(o&&(this.$el=document.getElementById(e)),n&&(t.colors=n.concat(a.default.colors)),t=r.cloneObjDeep(a.default,t),i&&(t.datas=[i],delete t.data),this.opts=t):r.throwError("no container id or datas in options","setConfig")}return t.prototype.update=function(t){t&&(t.data&&(t.datas=[t.data],delete t.data),this.opts=r.cloneObjDeep(this.opts,t)),this.drawer.draw(!0,this.opts.noAnimation)},t.prototype._init=function(){i.setContext(this,o,s),o&&(this.pixelRatio=i.retinaScale(this.canvas,this.ctx))},t}();e.default=c},function(t,e,n){"use strict";e.__esModule=!0,e.getStyle=function(t,e){var n=t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e),r=n&&n.match(/^(\d+)(\.\d+)?px$/);return r?+r[1]:void 0}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r="undefined"!=typeof wx&&void 0!==wx.getSystemInfo,i=r?2:1,a={id:"",inBrowser:"undefined"!=typeof window&&!r,inWeapp:r,backgroundColor:"rgba(0,0,0,0)",colors:["#fe5d4e","#43c2f7","#707ad9","#ffa61b","#64d290","#cf27bd"],duration:600,events:["touchstart","touchmove"],hoverLineColor:"#999",hoverHighlight:.5,grid:{yTickLength:5},bar:{margin:60/i},chartTop:0,chartLeft:50/i,chartRight:15,dash:{color:"#e2e2e2",length:3/i},font:{color:"#666",fontFamily:"Arial",fontSize:{x:"11px",y:"10px"}}};e.default=a},function(t,e,n){"use strict";e.__esModule=!0,e.animation=function(t){var e=t.duration||600,n=t.onProcess||function(){},r=t.onAnimationFinish||function(){},a=i(),o=null;a((function t(i){if(null===i)return n(1),r(),!1;if(null===o&&(o=i),i-o<e){var s=(i-o)/e;c=s,s=(c/=.5)<1?.5*Math.pow(c,3):.5*(Math.pow(c-2,3)+2),n(s),a(t,23)}else n(1),r();var c}),23)};var r=void 0;"undefined"!=typeof window&&(r=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame);var i=function(){return void 0!==r?(i=function(){return r},r):function(t,e){setTimeout((function(){t(+new Date)}),e)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getDistance=e.getAngle=e.getRange=void 0,e.getRange=function(t){return t?t>2?4*Math.ceil(t/4):1.2*t:1},e.getAngle=function(t,e,n,r){var i=Math.atan2(n-t,e-r);return i<0?2*Math.PI+i:i},e.getDistance=function(t,e,n,r){return Math.sqrt(Math.pow(t-n,2)+Math.pow(e-r,2))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(1),a=n(5),o=function(){function t(t){this.yaxis={min:0,max:0,range:0,unit:0},this.xaxis={min:0,max:0,range:0,unit:0},this.xRate=0,this.xBasic=0,this.yRate=0,this.yBasic=0,this.drawPoint=i.drawPoint,this.chartjs=t}return t.prototype.getBasicData=function(t){var e,n,i=this.chartjs.opts,a=t||i.datas,o=i.range;return o?(void 0!==o.min&&void 0!==o.max||r.throwError('param range need params "min" and "max"',"setConfig"),e=o.min,n=o.max):a&&a.length&&r.each(a,(function(t){var i=r.getExtremum(t),a=i._max,o=i._min;e=void 0!==e&&e<o?e:o,n=n&&n>a?n:a})),[e||0,n||0]},t.prototype.clearCtn=function(t){var e=this.chartjs,n=e.opts,r=n.backgroundColor,i=e.ctx,a=e._chart.width,o=e._chart.height;i.beginPath();var s=(~r.replace(" ","").indexOf("0)")?i.clearRect:i.rect).bind(i);t?s(n.chartLeft-4,n.chartTop-5,a+1,o-16-n.chartTop):s(0,0,1e5,1e5),i.fillStyle=r,i.fill(),i.closePath()},t.prototype.drawDashs=function(t){var e=this.chartjs,n=e.opts,r=n.grid,a=n.dash,o=a.isSolid,s=n.dash.color,c=r.showGrid,h=r.xTickLength,u=r.yTickLength,f=e.ctx;f.save();var l=e._chart.width-n.chartRight+2,d=(e._chart.height-n.chartTop-30)/(u-1),p=(l-2-n.chartLeft)/(h-1),v=(u-1)*d+n.chartTop+5.5;if(!n.noDash){f.strokeStyle=s,f.beginPath(),f.lineWidth=1;for(var y=o?i.drawLine:i.drawDashLine,g=o?l-2:l,w=0;w<u;w++){var x=t||w*d+5+n.chartTop;y(f,n.chartLeft,x,g,x,a.length)}if(h){var m=n.chartTop+5;for(w=0;w<h;w++){var _=w*p+n.chartLeft-.5;y(f,_,v,_,m,a.length)}}}if(c){r.color&&(f.strokeStyle=r.color);var b=n.chartLeft-.5,j=e.drawer.zeroY||v;i.drawLine(f,b,n.chartTop,b,v),i.drawLine(f,b,j,l-2,j),f.stroke()}f.strokeStyle=s,f.restore()},t.prototype.drawTexts=function(t,e){var n=this.chartjs,r=n.opts,i=r.grid.yTickLength,a=r.font,o=n.ctx,s=r.xaxis,c=n._chart.width,h=n._chart.height;if(r.handleTextX&&(t=r.handleTextX),r.handleTextY&&(e=r.handleTextY),o.lineWidth=1,o.textAlign="right",o.textBaseline="middle",o.font=a.fontSize.x+" "+a.fontFamily,o.fillStyle=a.color,t)t(o,s);else{var u=h-10;o.fillText(s[s.length-1],c-r.chartRight,u),o.textAlign="left",o.fillText(s[0],r.chartLeft,u)}o.font=a.fontSize.y+" "+a.fontFamily,o.textAlign="right";var f=this.yaxis;if(e)e(o,f);else for(var l=r.chartLeft-5,d=r.yaxisfunc||function(t){return t.toFixed(2)},p=0;p<i;p++){var v=f.min+p*f.unit;o.fillText(d(v),l,this.yRate*v+this.yBasic)}},t.prototype.drawHover=function(t,e){},t.prototype.setEvents=function(){var t=this,e=this.chartjs.canvas,n=this.chartjs.opts,r=n.events;if(!r||!n.inBrowser)return!1;r.forEach((function(n){e.addEventListener(n,(function(e){var r=~n.indexOf("touch")?e.touches[0]:e,i=r.target;return t.drawHover(r.clientX-i.offsetLeft,r.pageY-i.offsetTop),!1}),!1)}))},t.prototype.setAnimation=function(t){var e=this.chartjs.opts;a.animation({duration:e.duration,onProcess:t,onAnimationFinish:e.onFinish})},t}();e.default=o},,,,function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),o=n(12),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.init=function(){this._init(),this.drawer=new o.default(this),this.drawer.init()},e}(a.default);e.default=s},function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),o=n(6),s=n(1),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.setDataset=function(){var t=this.chartjs,e=t.opts,n=e.grid.yTickLength,r=e.datas,i=[];a.each(r,(function(t){i.push.apply(i,t)}));var s,c,h=this.getBasicData([i]),u=h[0],f=h[1];e.range?(s=u,c=f-u):(s=(c=o.getRange(f-u))>2?Math.floor(u):u)+c<f&&(s=u),this.yaxis={min:s,max:s+c,range:c,unit:c/(n-1)};var l=this.yRate=(30-t._chart.height+e.chartTop)/c,d=this.yBasic=5-this.yaxis.max*l+e.chartTop,p=r.length;p=p>1?p:2,this.xaxis={min:0,max:p-1,range:p,unit:1};var v=this.xBasic=e.chartLeft+10,y=this.xRate=(t._chart.width-e.chartLeft-e.chartRight-20)/(p-1),g=[];1===r.length&&(r[1]=r[0]),a.each(r,(function(t,e){g.push({x:e*y+v,ymin:t[2]*l+d,ystart:t[0]*l+d,yend:t[1]*l+d,ymax:t[3]*l+d,value:t})})),t.dataset=g,e.barWidth||(e.barWidth=p<10?"20":~~(.6*this.xRate),e.barWidth<1&&(e.barWidth=1))},e.prototype.drawUnit=function(t,e,n,r,i){var a,o,c,h=!1;e.yend<e.ystart?(i&&(h=!0),a=n[0],o=e.ystart,c=e.yend):(a=n[4],o=e.yend,c=e.ystart),t.fillStyle=t.strokeStyle=a,s.drawLine(t,e.x,e.ymin,e.x,o),s.drawLine(t,e.x,e.ymax,e.x,c),t.beginPath(),t[h?"rect":"fillRect"](e.x-r/2,c,r,o-c),t.closePath(),t.stroke()},e.prototype.drawLine=function(t){void 0===t&&(t=1);var e=this.chartjs,n=e.opts,r=e.ctx,i=e.dataset;r.lineWidth=1;for(var a=0,o=t*i.length;a<o;a++){var s=i[a];this.drawUnit(r,s,n.colors,n.barWidth,n.upHollow)}r.save()},e.prototype.draw=function(t,e){var n=this,r=this.chartjs.opts;this.clearCtn(!t),this.drawDashs(),t&&(this.setDataset(),this.drawTexts()),e||!r.inBrowser&&!r.inWeapp?(this.drawLine(1),r.onFinish&&r.onFinish()):this.setAnimation((function(t){n.clearCtn(!0),n.drawDashs(),n.drawLine(t),r.onAnimation&&r.onAnimation.call(n,t),r.inWeapp&&n.chartjs.ctx.draw(!0)}))},e.prototype.drawHover=function(t,e){var n=this.chartjs,r=n.opts;this.draw(r.inWeapp||null,!0);var i=n.ctx;if(t>n._chart.width-r.chartRight||t<r.chartLeft||e<r.chartTop||e>n._chart.height-(35-r.chartTop))return!1;var a=Math.round((t-this.xBasic)/this.xRate);if(!n.dataset[a])return!1;var o=Math.round(n.dataset[a].x)+.3;return i.save(),i.strokeStyle=r.hoverLineColor,i.lineWidth=.5,s.drawLine(i,r.chartLeft+.3,e,n._chart.width-14.7,e),s.drawLine(i,o,6+r.chartTop,o,n._chart.height-25),r.hover&&r.hover.call(n,a,[r.datas[a]],r.xaxis[a],t,e),i.restore(),r.inWeapp&&n.canvas.draw(!0),a},e.prototype.init=function(){var t=this.chartjs.opts;this.draw(!0,t.noAnimation),this.setEvents(),t.inWeapp&&this.chartjs.canvas.draw()},e}(n(7).default);e.default=c}])}));