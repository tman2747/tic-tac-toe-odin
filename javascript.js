const Player = function (name, symbol){
    this.name = name
    this.symbol = symbol
}

const Gameboard = function(){
    this.gameBoardArray =  [[" 1"," 2"," 3"],["4 ","5 ","6 "],["7 ","8 ","9 "]]
    this.displayBoard = function (){
        this.gameBoardArray.forEach(Array => {
            console.log(Array)
        });
    }

    this.selectPostion = function (char, array, postion) 
    {
        if (this.gameBoardArray[array][postion] === " ")
        {
            this.gameBoardArray[array][postion] = char
        }
        else
        {
            console.log("postion is taken already.")
        }

    };

    this.checkWin = function () 
    {
        // check for any column win


        // check for any row win

        // check for any diagonial win
        for (let i = 0; i< this.gameBoardArray.length; i++)
        {
            console.log(this.gameBoardArray[i][i])
        }
        // next would be adding a loop that check [0][2] / [1][1] /[2][0]
        // if there is any win return the symbol in a winning condition. else return null or something else? 
    }
}

let gameboard = new Gameboard

