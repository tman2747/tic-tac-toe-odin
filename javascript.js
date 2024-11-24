const Player = function (symbol)
{
    this.name = null
    this.symbol = symbol 

    this.setname = function(name)
    {
        this.name = name
    }

    this.getPlayer = function()
    {
        let container = document.querySelector(".player-info")
        
        let playerInput = document.createElement("div")
        playerInput.className = "player-input"
        let playerText = document.createElement("p")
        playerText.innerHTML = "Player Name:"
        playerInput.appendChild(playerText)
        let inputfield = document.createElement("input")
        inputfield.type = "text"
        playerInput.appendChild(inputfield)
        
        container.appendChild(playerInput)
    }

    
}

const GameController = function ()
{
    this.gameBoard = new Gameboard
    this.player1 = new Player
    this.Player2 = new Player

    this.init = function ()
    {
        this.player1.getPlayer("X")
        this.Player2.getPlayer("O")
        this.playRound()
    }
    this.restart = function ()
    {

    }

    this.playRound = function ()
    {
        this.gameBoard.clearboard()
        this.gameBoard.renderBoard()
    }

}


const Gameboard = function ()
{
    this.gameBoardArray = [["x", "X", "O"], ["O", "O", "X"], ["X", "X", "O"]]
    this.currentSymbol = "X"

    this.displayBoard = function ()
    {
        this.gameBoardArray.forEach(Array =>
        {
            console.log(Array)
        });
    }

    this.switchsymbol = function()
    {
        if (this.currentSymbol === "X")
        {
            this.currentSymbol = "O"
        }
        else
        {
            this.currentSymbol = "X"
        }
    }

    this.selectPostion = function (char, array, postion) 
    {
        if (this.gameBoardArray[array][postion] === " ")
        {
            this.gameBoardArray[array][postion] = this.currentSymbol
            this.switchsymbol()
        }
        else
        {
            console.log("postion is taken already.")
        }

    };

    this.clearboard = function()
    {
        this.gameBoardArray = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    }

    this.renderBoard = function()
    {
        let gameContainer = document.querySelector(".Tic-Tac-Toe-container")
        gameContainer.innerHTML = ""

        this.gameBoardArray.forEach((array,postion)=>{
            array.forEach((index,secondaryPostion)=>{
                let tile = document.createElement("div")
                tile.className = "board"
                tile.id = `tile-${postion}-${secondaryPostion}`
                tile.innerHTML = index
                gameContainer.appendChild(tile)
                tile.addEventListener("click", function (){
                    if (!this.checkWin()) // stops input when we have a win.
                    {
                        this.selectPostion("x",postion,secondaryPostion) // maybe move this out of the if so it checks win after the selection and just not render the board if it is a win.
                        this.renderBoard()
                    }
                }.bind(this))
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
                console.log(`${this.gameBoardArray[0][i]} Is the winner`)
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

let gamecontroller = new GameController

gamecontroller.init()