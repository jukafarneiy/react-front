import React, { Component } from "react";
import { getCarById, updateCar } from "../service/car";
import { Redirect } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditCar extends Component {
  constructor() {
    super();
    this.state = {
      car: {
        title: "",
        brand: "",
        price: 0,
        age: "",
      },
      error: "",
      selectedDate: "",
      redirect: false,
      loading: true,
    };
  }

  init = carId => {
    getCarById(carId).then(data => {
      let y = new Date()
      y.setFullYear(data.age)
      this.setState({
        car: {
          id: data._id,
          title: data.title,
          brand: data.brand,
          price: data.price,
          age: data.age,
        },
        selectedDate: y,
        error: "",
        loading: false
      });
    });
  };

  componentDidMount() {
    this.carData = new FormData();
    const carId = this.props.match.params.carId;
    this.init(carId);
  }

  handleDate = date => {
    let year = date.toLocaleDateString('en-us', { year: "numeric" })
    this.carData.set("age", year);
    this.setState({
      car: {
        ...this.state.car,
        ["age"]: year
      },
      selectedDate: date
    })
  };

  handlePrice = currency => {
    this.carData.set("price", currency);
    this.setState({
      car: {
        ...this.state.car,
        ["price"]: currency
      },
    })
  };

  isValid = () => {
    // ADICIONAR VALIDACOES


    // IMPORTANTE PORRA JUKA N ESQUECE

    
    const { title } = this.state.car;
    if (title.length === 0) {
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.carData.set(name, value);
    this.setState({
      car: {
        ...this.state.car,
        [name]: value,
      }
    });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let data = this.state.car
    delete data.error;
    delete data.loading;
    if (this.isValid()) {
      updateCar(data).then(() => {
        this.setState({ loading: false });
        this.setState({ redirect: `/` })
      })
    }
  };

  signupForm = (car) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Model</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={car.title}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Brand</label>
        <input
          onChange={this.handleChange("brand")}
          type="brand"
          className="form-control"
          value={car.brand}
        />
      </div>

      <div className="form-group">
        <form method="post" action="#">
          <label className="text-muted" for="typeNumber">Price</label> <br></br>
          <CurrencyInput
            id="currency-field"
            name="currency-field"
            placeholder="R$"
            prefix="R$ "
            onValueChange={(currency) => this.handlePrice(currency)}
            value={car.price}
          />
        </form>
      </div>

      <div className="form-group">
        <label className="text-muted">Year</label>
        <DatePicker
          selected={this.state.selectedDate}
          onChange={(date) => this.handleDate(date)}
          showYearPicker
          dateFormat="yyyy"
          yearItemNumber={10}
          value={car.age}
        />

      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Save
      </button>
    </form>
  );

  render() {
    const {
      car, error, loading, redirect
    } = this.state;

    debugger

    if (redirect) {
      return <Redirect to={redirect} />;
    }
    
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Car</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.signupForm(car)
        )}
      </div>
    );
  }
}

export default EditCar;
