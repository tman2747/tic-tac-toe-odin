const Player = function (symbol)
{
    this.name = null
    this.symbol = symbol
    Player.prototype.playercount = 1

    this.setname = function (name)
    {
        this.name = name
    }

    this.getPlayer = function ()
    {
        let container = document.querySelector(".player-info")

        let playerInput = document.createElement("div")
        playerInput.className = "player-input"
        let playerText = document.createElement("p")
        playerText.innerHTML = `Player ${Player.prototype.playercount}:`
        playerInput.appendChild(playerText)
        let inputfield = document.createElement("input")
        inputfield.type = "text"
        playerInput.appendChild(inputfield)

        container.appendChild(playerInput)

        Player.prototype.playercount++
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
        this.getPlayers()
    }

    this.gameover = function()
    {

        console.log(`${this.player1.name} is the winner`)
    }

    events.on("gameOver", this.gameover.bind(this));

    this.getPlayers = function ()
    {
        let container = document.querySelector(".player-info")
        let restart = document.createElement("button")
        restart.innerHTML = "restart"
        restart.addEventListener("click", ()=>{
            this.restart()
        })
        let play = document.createElement("button")
        play.innerHTML = "Play"
        play.addEventListener("click", ()=>{
            let playernames = document.querySelectorAll(".player-input")
            this.player1.setname(playernames[0].lastChild.value)
            this.Player2.setname(playernames[1].lastChild.value)
            this.playRound()
        })
        container.appendChild(restart)
        container.appendChild(play)

    }
    this.restart = function ()
    {
        this.gameBoard.clearboard()
        this.gameBoard.renderBoard()
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

    this.switchsymbol = function ()
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

    this.clearboard = function ()
    {
        this.gameBoardArray = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    }

    this.renderBoard = function ()
    {
        let gameContainer = document.querySelector(".Tic-Tac-Toe-container")
        gameContainer.innerHTML = ""

        this.gameBoardArray.forEach((array, postion) =>
        {
            array.forEach((index, secondaryPostion) =>
            {
                let tile = document.createElement("div")
                tile.className = "board"
                tile.id = `tile-${postion}-${secondaryPostion}`
                tile.innerHTML = index
                gameContainer.appendChild(tile)
                tile.addEventListener("click", function ()
                {
                    if (!this.checkWin()) // stops input when we have a win.
                    {
                        this.selectPostion("x", postion, secondaryPostion) // maybe move this out of the if so it checks win after the selection and just not render the board if it is a win.
                        this.renderBoard()
                        if (this.checkWin())
                        {
                            events.emit("gameOver")
                        }
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
                return this.gameBoardArray[0][i]
            }
        }

        // check for any row win
        for (let i = 0; i <= this.gameBoardArray.length - 1; i++)
        {
            if (this.gameBoardArray[i][0] == this.gameBoardArray[i][0] && this.gameBoardArray[i][1] == this.gameBoardArray[i][0] && this.gameBoardArray[i][2] == this.gameBoardArray[i][0] && this.gameBoardArray[i][0] != " ")
            {
                return this.gameBoardArray[i][0] // change all these to return the winning postion
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
                return this.gameBoardArray[i][i]
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
                return this.gameBoardArray[primaryIndex][j]
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


//events - a super-basic Javascript (publish subscribe) pattern

var events = {
    events: {},
    on: function (eventName, fn) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.events[eventName]) {
        for (var i = 0; i < this.events[eventName].length; i++) {
          if (this.events[eventName][i] === fn) {
            this.events[eventName].splice(i, 1);
            break;
          }
        };
      }
    },
    emit: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }
  };

let gamecontroller = new GameController

gamecontroller.init()