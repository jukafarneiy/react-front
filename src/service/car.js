export const deleteCar = (id) => {
    return fetch(`/cars/${id}`, {
        method: "DELETE",
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCars = () => {
    return fetch("/cars", {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        });
};

export const getCarById = (id) => {
    return fetch(`/cars/${id}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        });
};

export const updateCar = (carData) => {
    let id = carData.id;
    delete carData.id;
    return fetch(`/cars/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData) 
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        });
};
export const createCar = (carData) => {
    return fetch(`/cars`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData) 
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        });
};

