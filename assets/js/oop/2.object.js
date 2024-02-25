class Car{
    // propertis
    constructor(brand,model){
this.brand = brand //mengacu kebagian parameter
this.model = model
    }

    //method
    getinfo(){
        return `The car is ${this.brand} & ${this.model}`;
    }

    turnOnEngine(){
        return "Engine is turn on";
    }
}

//object
let myCar = new Car("Toyota","Camry");
console.log(myCar.getinfo());
console.log(myCar.turnOnEngine());