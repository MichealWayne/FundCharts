/*
 * animations
 */

const Timing = {
    easeIn: function(pos){
        return Math.pow(pos, 3);
    },

    easeOut: function(pos){
        return (Math.pow((pos - 1), 3) + 1);
    },

    easeInOut: function(pos){
        if ( (pos /= 0.5) < 1 ) {
            return 0.5 * Math.pow(pos, 3);
        } else {     
            return 0.5 * (Math.pow((pos - 2), 3) + 2);
        }
    },

    linear: function(pos) {
        return pos;
    }
};

const requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

const createAnimationFrame = function () {
    if (typeof requestAnimationFrame !== 'undefined') {
        return requestAnimationFrame;
    } else if (typeof setTimeout !== 'undefined') {
        return function (step, delay) {
            setTimeout(function () {
                let timeStamp = +new Date();
                step(timeStamp);
            }, delay);
        }
    } else {
        return function (step) {
            step(null);
        }
    }
};

/**
 * @function Animation
 */
export function Animation (opts) {
    opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
    opts.timing = opts.timing || 'linear';
    
    let delay = 23;

    let animationFrame = createAnimationFrame();
    let startTimeStamp = null;
    function step (timestamp) {
        if (timestamp === null) {
            opts.onProcess && opts.onProcess(1);
            opts.onAnimationFinish && opts.onAnimationFinish();
            return;
        }

        if (startTimeStamp === null) {
            startTimeStamp = timestamp;
        }
        if (timestamp - startTimeStamp < opts.duration) {
            let process = (timestamp - startTimeStamp) / opts.duration;
            let timingFunction = Timing[opts.timing];
            process = timingFunction(process);
            opts.onProcess && opts.onProcess(process);
            animationFrame(step, delay);
        } else {
            opts.onProcess && opts.onProcess(1);
            opts.onAnimationFinish && opts.onAnimationFinish();
        }
    }

    animationFrame(step, delay);
}