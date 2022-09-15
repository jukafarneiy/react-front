import React, { Component } from "react";
import { getCars } from "../service/car";
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

    renderCars = cars => (
        <div className="row">
            {cars.map((car, i) => (
                <div className="card col-md-4" key={i}>
                    <div className="card-body">
                        <h5 className="card-title">{car.title}</h5>
                        <p className="card-text">{car.brand}</p>
                        <p className="card-text">{car.price}</p>
                        <p className="card-text">{car.age}</p>
                        <Link
                            to={`/cars/${car._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Edit Car
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { cars } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Cars</h2>

                {this.renderCars(cars)}
            </div>
        );
    }
}

export default Cars;
