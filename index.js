/*
* @author: Daniel Johnson
* @file: index.js
* @brief: Once the DOM is loaded, draw the initial model and "init" the controller
*/ 

document.addEventListener("DOMContentLoaded", () => {
    view.drawToScreen(model.board); //draw the inital state of model
    controller.init(); //init the controller
});