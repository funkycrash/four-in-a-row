class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
}
    /**
     * The function returns an array of unused tokens by filtering out dropped tokens.
     * @returns The `get unusedTokens()` method is returning an array of tokens that have not been dropped,
     * filtered from the `tokens` array.
     */
    get unusedTokens() {
        return this.tokens.filter(token => token.dropped === false)
    }

    /**
     * The function returns the first unused token.
     * @returns The `activeToken` method is returning the first element of the `unusedTokens` array.
     */
    get activeToken() {
        return this.unusedTokens[0]
    }


    /**
     * The function creates an array of tokens with a specified number of elements.
     * @param [number=21] - The "number" parameter is a number that determines how many tokens will be
     * created. The default value is 21, but it can be changed to create a different number of tokens.
     * @returns An array of Token objects with a length of `number`, which is set to a default value of 21
     * if no argument is passed to the function.
     */
    createTokens(number = 21) {
        let tokens = []
        for (let i = 0; i < number; i++) {
            tokens.push(new Token(i, this))
        }
        return tokens
    }

    /**
     * Check if a player has any undropped tokens left
     * @return {Boolean} 
     */
    checkTokens () {
        return this.unusedTokens.length === 0 ? false : true
    }

}