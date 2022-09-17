import React, { Component } from "react";
import { deleteCar, getCars } from "../service/car";
import { Link } from "react-router-dom";

class Cars extends Component {
    constructor() {
        super();
        this.state = {
            cars: []
        };
        // this.limit = 100
    }

    componentDidMount() {
        getCars().then(data => {
            if (data) this.setState({ cars: data });
            else console.log(data)
        })
    }

    dCar = car => () => {
        const confirm = window.confirm(`Are you sure that you want to delete the car '${car.title} ${car.age}' from brand '${car.brand}'?`)
        if (confirm) 
        deleteCar(car._id).then(response => {
            console.log(response)
            this.setState({ 
                cars: this.state.cars.filter(car => {
                    return car._id !== response._id
                })
            })
            // console.log(this.limit)
            // this.limit--
            // if(this.limit <= 0) window.location.reload()
        })
    }

    renderCars = cars => (
        <div className="row">
            {cars.map((car, i) => (
                <div className="card col-md-4" key={i}>
                    <div className="card-body">
                        <h5 className="card-title">{car.title}</h5>
                        <p className="card-text text-uppercase">{car.brand}</p>
                        <p className="card-text">{car.price}</p>
                        <p className="text-uppercase">{car.age}</p>
                        <Link
                            to={`/cars/${car._id}`}
                            className="btn btn-rounded btn-primary btn-sm" 
                        >
                            Edit Car
                        </Link>
                        <button onClick={this.dCar(car)} class="btn btn-rounded btn-primary btn-sm" >
                            Delete Car
                        </button>

                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { cars } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">All Cars</h2>

                {this.renderCars(cars)}
            </div>
        );
    }
}

export default Cars;
