//polymorphihem
class Vehicle{
    constructor(type){
        this.type=type
    }

    getInfo(){
        return `vehicle is driven`
    }
}

class Car extends Vehicle{
    getInfo(){
        return`${suoer.getInfo()} car is driven`
    }
}

class ElectricCar extends Car{
    getInfo(){
        return`ElectricCar is driven`
    }
}

let myVehicle = new Vehicle()
let myCar = new Car()
let myElecricar = new ElectricCar()

console.log(myVehicle.getInfo());
console.log(myCar.getInfo());
console.log(myElecricar.getInfo());