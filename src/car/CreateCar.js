import React, { Component } from "react";
import { createCar } from "../service/car";
import { Redirect } from 'react-router-dom';
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
      selectedDate: new Date(),
      redirect: false,
      loading: false,
    };
  }


  isValid = () => {
    const { title } = this.state.car;
    if (title.length === 0) {
      this.setState({ error: "Car model is required.", loading: false });
      return false;
    }

    const { brand } = this.state.car;
    if (brand.length === 0) {
      this.setState({ error: "Car brand is required.", loading: false });
      return false;
    }

    const { price } = this.state.car;
    if (price.length === 0) {
      this.setState({ error: "Car price is required.", loading: false });
      return false;
    }

    return true
  };

  componentDidMount() {
    let year = this.state.selectedDate.toLocaleDateString('en-us', { year: "numeric" })
    this.setState({
      car: {
        ...this.state.car,
        ["age"]: year
      },
    })
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.setState({
      car: {
        ...this.state.car,
        [name]: value
      }
    });
  };

  handleDate = date => {
    let year = date.toLocaleDateString('en-us', { year: "numeric" })
    this.setState({
      car: {
        ...this.state.car,
        ["age"]: year
      },
      selectedDate: date
    })
  };


  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let data = this.state.car;
    if (this.isValid()) {
      createCar(data).then((data) => {
        this.setState({ loading: false })
        if (!data._id) return this.setState({ error: data.msg })
        this.setState({ redirect: `/` })
      })
    }

  };

  signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Model</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Brand</label>
        <input
          onChange={this.handleChange("brand")}
          type="brand"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <form method="post" action="#">
        <label className="form-label" for="typeNumber">Price</label>
        <input type="text" name="currency-field" id="currency-field" 
        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" placeholder="R$" />
        {/* <textarea
          onChange={this.handleChange("price")}
          type="text"
          className="form-control"
        /> */}
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
        />

      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Save
      </button>
    </form>
  );

  render() {
    const { error, loading, redirect } = this.state
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Register Your New Car</h2>
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
          ""
        )}


        {this.signupForm()}
      </div>
    );
  }
}

export default EditCar;
