import React, { Component } from "react";
import { deleteCar, getCars } from "../service/car";
import { Link } from "react-router-dom";
import MyStyle from "../service/mystyle.css";

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
        <div className="table text-align-center font">
            <thead class="bg-white w-100">
                <tr>
                    <th scope="col"><strong>Num</strong></th>
                    <th scope="col"><strong>Model</strong></th>
                    <th scope="col"><strong>Brand</strong></th>
                    <th scope="col"><strong>Price</strong></th>
                    <th scope="col"><strong>Year</strong></th>
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
                        <td>R$ {car.price}  </td>
                        <td>{car.age}  </td>
                        <td><Link
                            to={`/cars/${car._id}`}
                            className="buttonEdit btn-rounded btn-primary btn-sm">
                            Edit Car
                        </Link>  </td>
                        <td><button onClick={this.dCar(car)} class="buttonDelete btn-rounded btn-primary btn-sm" >
                            Delete Car
                        </button> </td>
                    </tr>
                ))}
            </tbody>

        </div>
    );

    render() {
        const { fontStyle } = {
            fontFamily: "Times New Roman"
        };
        const { cars } = this.state;
        return (
            <div className="container ">
                <h2 className="mt-5 mb-5"><em>All Cars</em></h2>

                <div style={{ textAlign: "center" }}>
                    {this.renderCars(cars)}
                </div>
            </div>
        );
    }
}

export default Cars;
