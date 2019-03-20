/**
 * canvas draw functions
 */
import{getStyle}from'./doms'
function _getBeveling(x,y){return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));}
export function drawDashLine(context,x1,y1,x2,y2,dashLen){if(!context)return false;dashLen=dashLen===undefined?5:dashLen;let beveling=_getBeveling(x2-x1,y2-y1);let num=Math.floor(beveling/dashLen);context.beginPath();for(let i=0;i<num;i++){context[i%2==0?'moveTo':'lineTo'](x1+(x2-x1)/num*i,y1+(y2-y1)/num*i);}
context.closePath();context.stroke();}
export function retinaScale(canvas,ctx){const pixelRatio=window.devicePixelRatio||1;if(pixelRatio===1)return false;let height=canvas.height;let width=canvas.width;canvas.height=height*pixelRatio;canvas.width=width*pixelRatio;ctx.scale(pixelRatio,pixelRatio);canvas.style.height=height+'px';canvas.style.width=width+'px';return pixelRatio;}
export function setContext(chart,inBrowser){if(!chart||inBrowser?!chart.$el:!chart.opts.Canvas)throw new Error('Error!no chart object to set context.(FundCharts-setContext)');let _canvas;if(inBrowser){let $el=chart.$el;$el.style.webkitUserSelect='none';$el.style.userSelect='none';_canvas=document.createElement('canvas');_canvas.id=chart.opts.id+'Canvas';let _width=chart.opts.width||getStyle($el,'width')||500;let _height=chart.opts.height||getStyle($el,'height')||500;_canvas.width=_width;_canvas.height=_height;$el.appendChild(_canvas);}else{let Canvas=chart.opts.Canvas;let _width=chart.opts.width||500;let _height=chart.opts.height||500;_canvas=Canvas.createCanvas(_width,_height);if(chart.opts.handleOut)chart.opts.handleOut(_canvas);}
chart.canvas=_canvas;chart.ctx=_canvas.getContext('2d');chart._chart={width:_canvas.width,height:_canvas.height};}