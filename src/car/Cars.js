import React, { Component } from "react";
import { deleteCar, getCars } from "../service/car";
import { Link } from "react-router-dom";

class Cars extends Component {
    constructor() {
        super();
        this.state = {
            cars: []
        };
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
            })
    }

    renderCars = cars => (
        <div className="table text-align-center bg-white" style={{ width: "max-content" }}>
            <thead class="bg-light w-100">
                <tr>
                    <th scope="col">Num</th>
                    <th scope="col">Model</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Price</th>
                    <th scope="col">Year</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {cars.map((car, i) => (
                    <tr >
                        <th scope="row">{i}</th>
                        <td> <div class="d-flex align-items-center"> {car.title} </div>   </td>
                        <td>{car.brand}  </td>
                        <td>{car.price}  </td>
                        <td>{car.age}  </td>
                        <td><Link
                            to={`/cars/${car._id}`}
                            className="btn btn-rounded btn-primary btn-sm"
                        >
                            Edit Car
                        </Link>  </td>
                        <td><button onClick={this.dCar(car)} class="btn btn-rounded btn-primary btn-sm" >
                            Delete Car
                        </button> </td>
                    </tr>
                ))}
            </tbody>

        </div>
    );

    render() {
        const { cars } = this.state;
        return (
            <div className="container ">
                <h2 className="mt-5 mb-5">All Cars</h2>

                <div style={{ textAlign: "center" }}>
                    {this.renderCars(cars)}
                </div>
            </div>
        );
    }
}

export default Cars;
