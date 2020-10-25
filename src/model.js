/*
* @author: Daniel Johnson
* @file: model.js
* @brief: This file gives a model with all of the logic to implement checkers
*/

const model = {
    //basic game info, "R" for Red, "B" for Black
    board:
    {
        a: ["B", " ", "B", " ", "B", " ", "B", " "], 
        b: [" ", "B", " ", "B", " ", "B", " ", "B"], 
        c: ["B", " ", "B", " ", "B", " ", "B", " "], 
        d: [" ", " ", " ", " ", " ", " ", " ", " "], 
        e: [" ", " ", " ", " ", " ", " ", " ", " "], 
        f: [" ", "R", " ", "R", " ", "R", " ", "R"], 
        g: ["R", " ", "R", " ", "R", " ", "R", " "], 
        h: [" ", "R", " ", "R", " ", "R", " ", "R"], 
    },
    players: ["R", "B"],
    turn: "R",

    /*
    * @post: if turn is "R", turn is set to "B" and vice versa using ternary operator
    */
    switchTurn: function() { this.turn = this.turn == this.players[0] ? this.players[1] : this.players[0] },
    
    /*
    * @return the player whose turn it is NOT using ternary operator
    */
    otherPlayer: function() { return this.turn == "R" ? "B" : "R"; },

    /*
    * @pre word is a string
    * @post a move is made: piece is moved, jumped pieces are removed, etc.
    * @param word, a string indicating a set of moves on the checkerboard
    */
    makeMove: function(word){
        console.log(word);
        if (this.isValidMove(word)){ //if word is a valid move, this is a rabbit hole :)
            for (let i = 0; i < word.length - 2; i+=2){
                //move the piece to the new location
                this.board[word.charAt(i+2)][word.charAt(i+3) - 1] = this.board[word.charAt(i)][word.charAt(i+1) - 1];
                this.board[word.charAt(i)][word.charAt(i+1) - 1] = " ";
            }
            this.switchTurn(); //switch the turn
        }
        else{ //move was not valid
            alert("Invalid Move!")
            console.log("Invalid Move!");
        }
    },

    /*
    * @param word, a string indicating a move on the checkerboard
    * @return true if the move is valid, else false. Ex: move is of distance 1 diagonal, etc.
    */
    isValidMove: function(word){
        //use multiple helper methods to determine if the move is not valid
        if (!this.isValidWord(word) ||
            !this.isValidStartSpace(word) ||
            !this.isValidNextSpaces(word)){
                return false;
        }
        //if this point is reached, the move is valid
        return true;
    },

    /*
    * @param word, a string indicating a move on the checkerboard
    * @return true if word is of the desired format. Ex: a1b2c3
    */
    isValidWord: function(word){
        //regular expression to determine if word is of the format a1b2c3d4...
        return /^([a-h]{1}[1-8]{1}){2,}$/i.test(word);
    },

    /*
    * @param word, a string indicating a move on the checkerboard
    * @return true if the first two chars of word indicate a space occupied by the current player, else false
    */
    isValidStartSpace: function(word){
        if (this.turn == this.players[0]){ //"R"
            if ( this.board[word.charAt(0)][word.charAt(1) - 1] !== this.players[0] ) return false;
        }
        else{ //"B"
            if ( this.board[word.charAt(0)][word.charAt(1) - 1] !== this.players[1] ) return false;
        }
        return true;
    },

    /*
    * @param word, a string indicating a move on the checkerboard
    * @post if a piece is jumped, it is "taken off of" the board
    * @return true if word has valid distances of spaces, only moves onto empty spaces, 
    *         and only moves more than once if there was a jump, else false
    */
    isValidNextSpaces: function(word){
        let jumped = false;
        //loop through all char num pairs of the word. Ex: a1
        for (let i = 0; i < word.length - 2; i+=2){
            //if you move onto another piece, the move is not valid
            if (this.board[word.charAt(i+2)][word.charAt(i+3) - 1] !== " ") return false;
            
            //get the differences of X and Y values from the char num pairs
            let dY = charToNum(word.charAt(i+2)) - charToNum(word.charAt(i));
            let dX = word.charAt(i+3) - word.charAt(i+1);
            //convert the differences to distances
            let distY = Math.abs(dY), distX = Math.abs(dX);

            //if the move was not diagonal or if the dist is > 2, the move is not valid
            if (distX !== distY || distX > 2) return false;
            
            if (distX === 2){
                //get the space that is trying to be jumped over
                let inbetweenY = numToChar( charToNum(word.charAt(i)) + dY/2);
                let inbetweenX = (parseInt(word.charAt(i+1)) + dX/2) - 1;
                //if the other player is not being jumped over, the move is not valid
                if (this.board[inbetweenY][inbetweenX] !== this.otherPlayer()) return false;

                //if this point is hit then there has been a jump, so delete the piece
                this.board[inbetweenY][inbetweenX] = " ";
                jumped = true;
            }
        }
        //if there was no jump but there was more than one move, the move is not valid
        if (!jumped && word.length !== 4) return false;
        //if this point is reached, the move is valid. Congrats, this is the end of the rabbit hole. :)
        return true;
    },
    /*
    * @return a player if there has been a winner, else undefined
    */
    getWinner: function () {
        //loop through the board and count pieces
        let countRed = 0; countBlack = 0;
        for (i in this.board){
            for (let j = 0; j < this.board[i].length; j++){
                if (this.board[i][j] === "R") countRed++;
                else if (this.board[i][j] === "B") countBlack++;
            }
        }
        //if either player runs out of pieces, the other wins. Them both being 0 should never happen
        if (countRed === 0) return "B";
        if (countBlack === 0) return "R";
        return undefined; //no winner
    }
};