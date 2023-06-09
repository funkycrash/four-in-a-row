class Space {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.id = `space-${x}-${y}`
        this.token = null
        this.diameter = 76
        this.radius = this.diameter/2
    }


    get owner () {
        let owner = null
        if (this.token) {
            owner = this.token.owner
        } 
        return owner
    }
    /**
     * This function creates a black circle SVG element with specific attributes and appends it to an HTML
     * element with the ID "mask".
     */
    drawSVGSpace() {
        const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svgSpace.setAttributeNS(null, "id", this.id);
        svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "r", this.radius - 8);
        svgSpace.setAttributeNS(null, "fill", "black");
        svgSpace.setAttributeNS(null, "stroke", "none");
        document.getElementById("mask").appendChild(svgSpace);   
    }

    /**
     * Updates space to reflect a token has been dropped into it.
     * @param {Object} token - The dropped token
     */
    mark (token) {
        this.token = token
    }
}