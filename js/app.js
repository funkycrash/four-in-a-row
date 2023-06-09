const beginButton = document.getElementById('begin-game')
if (beginButton) {
    const game = new Game()
    
    /* This code is adding an event listener to the "begin-game" button. When the button is clicked, it
    will call the `startGame()` method of the `game` object. */
    beginButton.addEventListener('click', function() {
        this.style.display = 'none';
        document.getElementById('play-area').style.opacity = '1';
        game.startGame()
    })
    document.addEventListener('keydown', function(event){
        game.handleKeyDown(event)
    });
}
