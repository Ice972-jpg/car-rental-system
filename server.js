import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());


// GET ALL CARS

app.get("/cars", (req, res) => {

    const cars = JSON.parse(
        fs.readFileSync("./data/cars.json")
    );

    res.json(cars);
});


// ADD CAR

app.post("/cars", (req, res) => {

    const cars = JSON.parse(
        fs.readFileSync("./data/cars.json")
    );

    const newCar = {
        id: Date.now(),
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        available: req.body.available
    };

    cars.push(newCar);

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 2)
    );

    res.json(newCar);
});

// DELETE CAR

app.delete("/cars/:id", (req, res) => {

    const cars = JSON.parse(
        fs.readFileSync("./data/cars.json")
    );

    const filteredCars = cars.filter(
        car => car.id != req.params.id
    );

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(filteredCars, null, 2)
    );

    res.json({
        message: "Car deleted"
    });
});

// UPDATE CAR

app.put("/cars/:id", (req, res) => {

    const cars = JSON.parse(
        fs.readFileSync("./data/cars.json")
    );

    const carIndex = cars.findIndex(
        car => car.id == req.params.id
    );

    cars[carIndex] = {
        ...cars[carIndex],
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        available: req.body.available
    };

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 2)
    );

    res.json(cars[carIndex]);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});