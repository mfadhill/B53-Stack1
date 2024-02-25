class Car {
    constructor(brand, model) {
        this._brand = brand
        this._model = model
    }

    get brand() {
        return this._brand
    }

    //setter mengisi nilai get

    set brand(value) {
        if (value === "") {
            console.log("the Brand Empty");
            return
        }

        this._brand = value
    }
}

let myCar = new Car("Toyota", "Camry");
console.log(myCar.brand);
myCar.brand = " Homda";
console.log(myCar.brand);