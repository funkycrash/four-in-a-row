class Board {
    constructor() {
        this.rows = 6
        this.columns = 7
        this.spaces = this.createSpaces()
    }

    /**
     * The function creates a two-dimensional array of Space objects with the specified number of rows and
     * columns.
     * @returns The `createSpaces()` method returns a two-dimensional array of `Space` objects. The array
     * represents the game board, with each element being a column of `Space` objects. Each `Space` object
     * has an `x` and `y` coordinate representing its position on the board.
     */
    createSpaces() {
        const spaces = [];
        
		for (let x = 0; x < this.columns; x++) {
			const col = [];
			
			for (let y = 0; y < this.rows; y++) {
				const space = new Space(x, y);
				col.push(space);
			}
			
			spaces.push(col);
		}
        
        return spaces;
    }
    
    /**
     * The function draws an HTML board by iterating through each space and calling its drawSVGSpace
     * method.
     */
	drawHTMLBoard() {
        for (let column of this.spaces) {
            for (let space of column) {
                space.drawSVGSpace();
            }
        }
	} 
}