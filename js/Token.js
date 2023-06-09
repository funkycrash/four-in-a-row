class Token {
  constructor (index, owner) {
    this.owner = owner
    this.id = `token-${index}-${owner.id}`
    this.dropped = false
    this.columnLocation = 0
  }

  /**
   * This function returns the HTML element with the ID specified by the object's "id" property.
   * @returns The `htmlToken` method is returning the HTML element with the ID that matches the `id`
   * property of the object.
   */
  get htmlToken () {
    return document.getElementById(this.id)
  }

  get offsetLeft () {
    const token = this.htmlToken
    return token.offsetLeft
  }

  get offsetTop () {
    return this.htmlToken.offsetTop
  }

  /**
   * This function creates and appends a new HTML div element representing a game token with a specific
   * owner and color.
   */
  drawHTMLToken () {
    const token = document.createElement('div')
    const gameBoardUnderlay = document.getElementById('game-board-underlay')
    gameBoardUnderlay.append(token)

    token.setAttribute('id', this.id)
    token.setAttribute('class', 'token')
    token.style.backgroundColor = this.owner.color
  }

/**
 * The function moves a token to the left if it is not already at the leftmost column.
 */
  moveLeft () {
    if (this.columnLocation > 0) {
      this.htmlToken.style.left = this.offsetLeft - 76
      this.columnLocation = this.columnLocation - 1
    }
  }

/**
 * The function moves a token to the right by changing its left offset and updating its column
 * location.
 * @param columns - The number of columns on the game board.
 */
  moveRight (columns) {
    if (this.columnLocation < columns - 1) {
      this.htmlToken.style.left = this.offsetLeft + 76
      this.columnLocation = this.columnLocation + 1
    }
  }

  /**
   * The "drop" function animates the HTML token to a target location and executes a reset function.
   * @param target - The target parameter is an object that contains information about where the token
   * should be dropped. It has two properties: y and diameter. The y property represents the vertical
   * position where the token should be dropped, and the diameter property represents the size of the
   * target area.
   * @param reset - reset is a function that will be called after the animation is complete. It is used
   * to reset the game board or perform any other necessary actions after a token has been dropped.
   */
  drop (target, reset) {
    this.dropped = true

    $(this.htmlToken).animate(
      {
        top: target.y * target.diameter
      },
      750,
      'easeOutBounce',
      reset
    )
  }
}
