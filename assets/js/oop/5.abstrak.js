class Car {
    constructor(brand, model) {
        this._brand = brand
        this._model = model
    }

    get brand() {
        return this._brand;
    }
}

let myCar = new Car("Toyota", "Camry")
console.log(myCar.brand);