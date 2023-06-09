class Game {
  constructor () {
    this.board = new Board()
    this.players = this.createPlayers()
    this.ready = false
  }

  /**
   * The function returns the active player from an array of players.
   * @returns The `activePlayer` object is being returned. This object is found in the `players` array
   * using the `find()` method, which returns the first element in the array that satisfies the provided
   * testing function. In this case, the testing function checks for the `active` property of each player
   * object and returns the player object that has `active` set to `true`.
   */
  get activePlayer () {
    return this.players.find(player => player.active)
  }

  /**
   * The function creates two players with specific properties and returns them as an array.
   * @returns An array containing two player objects, one for Player 1 and one for Player 2.
   */
  createPlayers () {
    const player1 = new Player('Carly', 1, '#e15258', true)
    const player2 = new Player('Nico', 2, '#e59a13')
    return [player1, player2]
  }

  /* starts the game */
  startGame () {
    this.board.drawHTMLBoard()
    this.activePlayer.activeToken.drawHTMLToken()
    this.ready = true
  }

  handleKeyDown (event) {
    if (this.ready) {
      if (event.key === 'ArrowLeft') {
        this.activePlayer.activeToken.moveLeft()
      } else if (event.key === 'ArrowRight') {
        this.activePlayer.activeToken.moveRight(this.board.columns)
      } else if (event.key === 'ArrowDown') {
        this.playToken()
      }
    }
  }

  playToken () {
    let spaces = this.board.spaces
    let activeToken = this.activePlayer.activeToken
    let targetColumn = spaces[activeToken.columnLocation]
    let targetSpace = null

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space
      }
    }

    if (targetSpace !== null) {
      const game = this
      this.ready = false
      activeToken.drop(targetSpace, game.updateGameState(activeToken, targetSpace))
    }
  }

  switchPlayers () {
    this.players.forEach(player => {
      player.active = !player.active
    })
  }

  /**
   * Displays game over message.
   * @param {string} message - Game over message.
   */
  gameOver (string) {
    const gameOverElem = document.getElementById('game-over')
    if (gameOverElem) {
      gameOverElem.textContent = string
      gameOverElem.style.display = 'block'
    }
  }

  /**
   * Checks if there a winner on the board after each token drop.
   * @param   {Object}    Targeted space for dropped token.
   * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
   */
  checkForWin (target) {
    const owner = target.token.owner
    let win = false

    // vertical
    for (let x = 0; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x][y + 1].owner === owner &&
          this.board.spaces[x][y + 2].owner === owner &&
          this.board.spaces[x][y + 3].owner === owner
        ) {
          win = true
        }
      }
    }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y].owner === owner &&
          this.board.spaces[x + 2][y].owner === owner &&
          this.board.spaces[x + 3][y].owner === owner
        ) {
          win = true
        }
      }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y + 1].owner === owner &&
          this.board.spaces[x - 2][y + 2].owner === owner &&
          this.board.spaces[x - 3][y + 3].owner === owner
        ) {
          win = true
        }
      }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y - 1].owner === owner &&
          this.board.spaces[x - 2][y - 2].owner === owner &&
          this.board.spaces[x - 3][y - 3].owner === owner
        ) {
          win = true
        }
      }
    }

    return win
  }

  /**
   * Updates game state after token is dropped.
   * @param   {Object}  token  -  The token that's being dropped.
   * @param   {Object}  target -  Targeted space for dropped token.
   */
  updateGameState (token, target) {
    target.mark(token)
    let win = this.checkForWin(target)

    if (win) {
      this.gameOver(`Player ${token.owner.name} has won the game!`)
    } else {
      this.switchPlayers()

      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken()
        this.ready = true
      } else {
        this.gameOver(`Game Over!`)
      }
    }
  }
}
