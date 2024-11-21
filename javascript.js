const Player = function (name, symbol)
{
    this.name = name
    this.symbol = symbol
}

const Gameboard = function ()
{
    this.gameBoardArray = [["x", "X", "O"], ["O", "O", "X"], ["X", "X", "O"]]
    this.displayBoard = function ()
    {
        this.gameBoardArray.forEach(Array =>
        {
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

    this.clearboard = function()
    {
        this.gameBoardArray = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]] // maybe use this function?
    }

    this.renderBoard = function()
    {
        let gameContainer = document.querySelector(".Tic-Tac-Toe-container")
        gameContainer.innerHTML = ""

        this.gameBoardArray.forEach(function (array,postion){
            array.forEach(function (index,secondaryPostion){
                let tile = document.createElement("div")
                tile.className = "board"
                tile.id = `tile-${postion}-${secondaryPostion}`
                tile.innerHTML = index
                gameContainer.appendChild(tile)
                tile.addEventListener("click",function (e){
                    console.log(e.target.innerHTML = "e")
                })
            })
        })
    }

    this.checkWin = function () 
    {
        // check for any column win
        for (let i = 0; i <= this.gameBoardArray.length - 1; i++)
        {
            if (this.gameBoardArray[0][i] == this.gameBoardArray[0][i] && this.gameBoardArray[1][i] == this.gameBoardArray[0][i] && this.gameBoardArray[2][i] == this.gameBoardArray[0][i] && this.gameBoardArray[0][i] != " ")
            {
                return true
            }
        }

        // check for any row win
        for (let i = 0; i <= this.gameBoardArray.length - 1; i++)
            {
                if (this.gameBoardArray[i][0] == this.gameBoardArray[i][0] && this.gameBoardArray[i][1] == this.gameBoardArray[i][0] && this.gameBoardArray[i][2] == this.gameBoardArray[i][0] && this.gameBoardArray[i][0] != " ")
                {
                    return true
                }
            }
        // check for any diagonial win
        let prevSymbol = this.gameBoardArray[0][0]
        prevSymbol = this.gameBoardArray[0][0]

        for (let i = 0; i <= this.gameBoardArray.length - 1; i++)
        {
            if (prevSymbol == " ")
            {
                break
            }
            if (this.gameBoardArray[i][i] === prevSymbol && i == this.gameBoardArray.length - 1)
            {
                return true
            }
            else if (this.gameBoardArray[i][i] != prevSymbol)
            {
                break
            }
            prevSymbol = this.gameBoardArray[i][i]
        }

        let primaryIndex = 0
        prevSymbol = this.gameBoardArray[0][this.gameBoardArray.length - 1]
        for (let j = this.gameBoardArray.length - 1; j >= 0; j--)
        {
            if (prevSymbol == " ")
            {
                break
            }
            if (this.gameBoardArray[primaryIndex][j] == prevSymbol && j == 0)
            {
                return true
            }
            else if (this.gameBoardArray[primaryIndex][j] != prevSymbol)
            {
                break
            }
            // console.log(this.gameBoardArray[primaryIndex][j])
            primaryIndex++
        }

        return false
        // next would be adding a loop that check [0][2] / [1][1] /[2][0]
        // if there is any win return the symbol in a winning condition. else return null or something else? 
    }
}

let gameboard = new Gameboard
gameboard.renderBoard()