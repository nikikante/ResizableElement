
/* Helper methods */
var addEvent = function(el, name, cb) {
    if (el.attachEvent) {
        el.attachEvent('on' + name, cb);
    } else {
        el.addEventListener(name, cb);
    }
};
/* 
DEMO 

*/
var btnTrigerResize = document.getElementById("btnTrigerResize"),
    btnResizeContainer = document.getElementById("btnResizeContainer"),
    editorElement = document.getElementById("editor"),
    containerElement =editorElement.parentNode,
    sizes = [{w:200, h: 200 },{w:400, h: 250 },{w:500, h: 400 }],
    currentSizeIndex = 0,
    toggleResize = function(){
        currentSizeIndex = (currentSizeIndex + 1) % sizes.length;
        var currentSize = sizes[currentSizeIndex];
        containerElement.style.width = currentSize.w + "px";
        containerElement.style.height = currentSize.h + "px";
    },
    resizeEditor = function(){
        editorElement.style.width = containerElement.clientWidth+ "px";
        editorElement.style.height = containerElement.clientHeight + "px";
        editorElement.innerHTML = editorElement.style.width + " x " + editorElement.style.height;
    },
    init = function(){
        var currentSize = sizes[currentSizeIndex];
        containerElement.style.width = currentSize.w + "px";
        containerElement.style.height = currentSize.h + "px";
        resizeEditor();
    },
    onBtnResizeContainer = function(){
        toggleResize();
    };           

    addEvent(btnTrigerResize,"click", resizeEditor);
    addEvent(btnResizeContainer,"click", toggleResize);
    
    createResizeEvent(containerElement);
    addEvent(containerElement, "resize", function(){
            resizeEditor();
    })
    init();