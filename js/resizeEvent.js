(function(window){
/* Helper methods */
var addEvent = function(el, name, cb) {
    if (el.attachEvent) {
        el.attachEvent('on' + name, cb);
    } else {
        el.addEventListener(name, cb);
    }
};

var triggerEvent = function(element, eventName){
    var event; // The custom event that will be created

    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
    }

    event.eventName = eventName;

    if (document.createEvent) {
        element.dispatchEvent(event);
    } else {
        element.fireEvent("on" + event.eventType, event);
    }
};

/* Resize logic 
    Tested on: 
    - IE11
    - IE10 (emulated on IE11) TODO: check on real browser
    - IE9 (emulated on IE9) TODO: check on real browser
    - IE8 (emulated on IE8) TODO: check on real browser
    - IE7 (emulated on IE7) TODO: check on real browser
    - MS Edge
    - Chrome 51
    - Firefox 49.0a

    
*/

var getNames = function (element) {
    if(typeof element.style.transition != "undefined"){
        return {
            styleProperty: "transition",
            eventName: "transitionend"
        };
    }
    else if(typeof element.style.webkitTransition != "undefined"){
        return {
            styleProperty: "webkitTransition",
            eventName: "webkitTransitionEnd"
        };
    }
    else if(typeof element.style.oTransition != "undefined"){
        return {
            styleProperty: "oTransition",
            eventName: "oTransitionEnd"
        };
    }
    else if(typeof element.style.msTransition != "undefined"){
        return {
            styleProperty: "msTransition",
            eventName: "msTransitionEnd"
        };
    }
    else {
        /* maybe unsuported? */
        return {
            styleProperty: "transition",
            eventName: "transitionend"
        };
    }
};

window.createResizeEvent = function(element){
    var onContainerResize = function(){
        triggerEvent(element, "resize");
    };
    var names = getNames(element);
    element.style[names.styleProperty] = "width 0.0001s";
    addEvent(parent, "transitionend", onContainerResize);
};

}(window));