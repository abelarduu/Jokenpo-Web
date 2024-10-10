class Card{
    constructor(type){
        this.type = type;
        this.wasSelected = false;
        this.select = () => this.wasSelected = true;
        this.deselect = () => this.wasSelected = false;
    }
}