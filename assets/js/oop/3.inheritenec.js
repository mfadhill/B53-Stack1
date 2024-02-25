class Car {
    // propertis
    constructor(brand, model) {
        this.brand = brand //mengacu kebagian parameter
        this.model = model
    }

    //method
    getInfo() {
        return `The car is ${this.brand} & ${this.model}`;
    }
}

//object
// let myCar = new Car("Toyota", "Camry");
// console.log(myCar.getInfo());

//inheritance
class ElectricCar extends Car {
    //properties yg dimili paren yaitu Car
    constructor(brand, model, batteryCapacity) {
        super(brand, model)
        this.batteryCapacity = batteryCapacity
    }
    getInformation() {
        return `${super.getInfo()} it has battery capacity ${this.batteryCapacity} Kwh`;
    }
}

let myElecricar = new ElectricCar("tesla", "model S", 300)
console.log(myElecricar.getInformation());