/*
* @author: Daniel Johnson
* @file: view-controller.js
* @brief: This file gives view and controller objects to give user interaction to the checkers model
*/

const controller = {
    /*
    * @pre all elements listed are present
    * @post event listeners are added to the elements to facilitate checkers gameplay
    */
    init: function() {
        let canvas = document.getElementById("board");
        canvas.addEventListener("click", e => {
            //when the canvas is clicked, get the mouseXY, convert
            //it to form a1-h8 then add it to the move input field
            let currentX = e.clientX - canvas.offsetLeft;
            let currentY = e.clientY - canvas.offsetTop
            let adjustedX = Math.floor(currentX / 50) + 1;
            let adjustedY = numToChar(Math.floor(currentY / 50));
            moveInput.value += adjustedY + adjustedX;
        });

        let moveInput = document.getElementById("moveInput");
        //function to be added to the move button and pressing enter in the move input box
        //make the move on the model, erase moveInput, draw the new model, and show the turn
        let move = function () {
            model.makeMove(moveInput.value);
            moveInput.value = "";
            view.drawToScreen(model.board);

            let winner = model.getWinner();
            if(winner !== undefined) alert(winner + " Has won!")
            document.getElementById("turn").innerText = "Turn: " + model.turn;
        }
        moveInput.addEventListener("keypress", e => {
            //if you press enter after typing in a move, make the move
            if (e.key === "Enter"){
                move();
            }
        });
        let moveButton = document.getElementById("makeMove");
        moveButton.addEventListener("click", () => {
            move();
        });

        //make the clear button clear the move input field
        let clearButton = document.getElementById("clearMove");
        clearButton.addEventListener("click", () => {
            moveInput.value = "";
        });

        //make the undo button remove the last two characters of the move input field
        let undoButton = document.getElementById("undoMove");
        undoButton.addEventListener("click", () => {
            moveInput.value = moveInput.value.slice(0, moveInput.value.length - 2);
        });

        //make the reset button just reload the page
        let resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", () => {
            location.reload();
        });
    },
};

const view = {
    canvas: document.getElementById("board"),
    context: document.getElementById("board").getContext("2d"),

    /*
    * @pre board is an object with a-h keys of arrays of "R", "B", and " " to form a checkerboard
    * @post the board is blitted onto the canvas
    * @param board, the board to be drawn
    */
    drawToScreen: function(board){
        //variable to control checkerboard pattern
        let checkerBoardCounter = 1;
        //loop through the board
        for (i in board){
            for (var j = 0; j < board[i].length; j++){
                //if the counter is 1 make it white, else grey
                this.context.fillStyle = checkerBoardCounter == 1 ? "#FFF" : "#616161";
                //draw a rectangle for this square
                this.context.fillRect(j*50,charToNum(i)*50,50,50);
                checkerBoardCounter *= -1; //adjust counter
                //if the space contains a piece, draw it
                if (board[i][j] === "R"){
                    this.drawPiece("#FF0000",i,j);
                }
                else if (board[i][j] === "B"){
                    this.drawPiece("#000",i,j);
                }
            }
            if (j % 2 == 0) checkerBoardCounter *= -1; //adjust counter
        }
    },
    /*
    * @pre color is a hex value string, row and col are indeces of checkerboard
    * @post a piece is drawn on the checkerboard
    * @param color, the color of the piece. row, the row of piece. col, the col of piece
    */
    drawPiece: function(color, row, col){
        //draw a circle at the center of the space
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(col*50 + 25,charToNum(row)*50 + 25,20,0,2*Math.PI);
        this.context.fill();
        this.context.stroke();
    }
};