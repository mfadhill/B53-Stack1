class Car{
    // propertis
    constructor(make,model){
this.make = make
this.model = model
    }

    //method
    getinfo(){
        return `The car is ${this.make} & ${this.model}`;
    }
}