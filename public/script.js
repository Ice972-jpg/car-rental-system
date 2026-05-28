const carForm = document.getElementById("carForm");
const carList = document.getElementById("carList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const availabilityFilter =
    document.getElementById("availabilityFilter");

let editCarId = null;

const alertBox = document.getElementById("alertBox");
const totalCars = document.getElementById("totalCars");
const availableCars = document.getElementById("availableCars");
const averagePrice = document.getElementById("averagePrice");


// LOAD CARS

async function loadCars() {

    const response = await fetch("/cars");
    const cars = await response.json();

    carList.innerHTML = "";

    totalCars.innerText = cars.length;

const availableCount = cars.filter(
    car => car.available
).length;

availableCars.innerText = availableCount;

const avgPrice = cars.length > 0

    ? cars.reduce(
        (sum, car) => sum + Number(car.price),
        0
      ) / cars.length

    : 0;

averagePrice.innerText =
    "$" + avgPrice.toFixed(0);

    const filteredCars = cars.filter(car => {
        if (
    availabilityFilter.value === "available"
    && !car.available
) {
    return false;
}

if (
    availabilityFilter.value === "unavailable"
    && car.available
) {
    return false;
}

        const text = (
            car.brand + " " + car.model
        ).toLowerCase();

        return text.includes(
            searchInput.value.toLowerCase()
        );
    });


    // SORTING

    if (sortSelect.value === "low") {

        filteredCars.sort((a, b) =>
            a.price - b.price
        );
    }

    if (sortSelect.value === "high") {

        filteredCars.sort((a, b) =>
            b.price - a.price
        );
    }


    // DISPLAY CARS

    if (filteredCars.length === 0) {

    carList.innerHTML = `

        <div class="col-12">

            <div class="alert alert-warning">

                No cars found.

            </div>

        </div>

    `;
}

    filteredCars.forEach(car => {

        carList.innerHTML += `
        
            <div class="col-md-6">

                <div class="card bg-dark text-light p-3 h-100">

                    <h4>
                        ${car.brand} ${car.model}
                    </h4>

                    <p class="mb-1">
                        Year: ${car.year}
                    </p>

                    <p class="mb-1">
                        Price: $${car.price} / day
                    </p>

                    <span class="
                        badge
                        ${car.available ? "bg-success" : "bg-danger"}
                    ">
                        ${car.available ? "Available" : "Unavailable"}
                    </span>

                    <button
                        class="btn btn-danger mt-3"
                        onclick="deleteCar(${car.id})"
                    >
                        Delete
                    </button>

                    <button
                        class="btn btn-warning mt-2"
                        onclick="editCar(${car.id})"
                    >
                        Edit
                    </button>

                </div>

            </div>
        
        `;
    });
}


// ADD + EDIT CAR

carForm.addEventListener("submit", async e => {

    e.preventDefault();

    const year = Number(
    document.getElementById("year").value
);

const price = Number(
    document.getElementById("price").value
);

if (year < 2000) {

    showAlert("Year must be 2000 or newer!");

    return;
}

if (price <= 0) {

    showAlert("Price must be positive!");

    return;
}

    const newCar = {
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        year: document.getElementById("year").value,
        price: document.getElementById("price").value,
        available: document.getElementById("available").checked
    };

    // EDIT

    if (editCarId) {

        await fetch(`/cars/${editCarId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCar)
        });

        editCarId = null;

        document.getElementById("formTitle").innerText =
            "Add New Car";

    }

    // ADD

    else {

        await fetch("/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCar)
        });
    }

    carForm.reset();

    document.getElementById("available").checked = true;

    loadCars();

    showAlert("Car saved successfully!");
});


// DELETE CAR

async function deleteCar(id) {

    const confirmed = confirm(
    "Are you sure you want to delete this car?"
);

if (!confirmed) return;

    await fetch(`/cars/${id}`, {
        method: "DELETE"
    });

    loadCars();

    showAlert("Car deleted!");
}


// EDIT CAR

async function editCar(id) {

    const response = await fetch("/cars");
    const cars = await response.json();

    const car = cars.find(c => c.id == id);

    document.getElementById("brand").value =
        car.brand;

    document.getElementById("model").value =
        car.model;

    document.getElementById("year").value =
        car.year;

    document.getElementById("price").value =
        car.price;

    document.getElementById("available").checked =
        car.available;

    editCarId = id;

    document.getElementById("formTitle").innerText =
        "Edit Car";
}


// ALERT

function showAlert(message) {

    alertBox.innerText = message;

    alertBox.classList.remove("d-none");

    setTimeout(() => {

        alertBox.classList.add("d-none");

    }, 2000);
}


availabilityFilter.addEventListener(
    "change",
    () => {
        loadCars();
    }
);

// SEARCH

searchInput.addEventListener("input", () => {

    loadCars();
});


// SORT

sortSelect.addEventListener("change", () => {

    loadCars();
});


// INITIAL LOAD

loadCars();