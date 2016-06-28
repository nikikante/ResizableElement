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
var createDummyResizeElement = function(parentElement) {
    if(parentElement.__resizeElement){
        return;
    }
    
    var resizeElement = document.createElement("div");
    resizeElement.style.position = "absolute";
    resizeElement.style.visibility = "hidden";
    resizeElement.style.top = "0";
    resizeElement.style.left = "0";
    resizeElement.style.height = "100%";
    resizeElement.style.width = "100%";
    resizeElement.style.zIndex = "10000";
    
    parentElement.style.position = "relative";
    parentElement.appendChild(resizeElement);
    parentElement.__resizeElement = resizeElement;
    return resizeElement;
}


window.createResizeEvent = function(element){
    if(element.__resizeElement){
        return;
    }

    var onContainerResize = function(){
        triggerEvent(element, "resize");
    };

    var names = getNames(element),
        target = element;
    //Trying to add dummy element to preserve original event transition
    //It does not work, because transition is not triggered on width/height 100%(right, bottom does not work either).
    //var resizeElement = createDummyResizeElement(element);  
    //target = resizeElement;
    
    addEvent(target, names.eventName, onContainerResize);
    element.style.setProperty(names.styleProperty, "width, height 0.0001s linear");
};

}(window));