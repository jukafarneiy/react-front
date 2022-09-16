import React, { Component } from "react";
import { createCar } from "../service/car";
import { Redirect } from 'react-router-dom';

class EditCar extends Component {
  constructor() {
    super();

    this.state = {
      car: {
        title: "",
        brand: "",
        price: 0,
        age: 0,
      },

      error: "",
      redirect: false,
      loading: false,
    };
  }


  isValid = () => {
    const { title } = this.state.car;
    if (title.length === 0) {
      this.setState({ error: "Car name is required.", loading: false });
      return false;
    }

    const { brand } = this.state.car;
    if (brand.length === 0) {
      this.setState({ error: "Brand is required.", loading: false });
      return false;
    }

    const { price } = this.state.car;
    if (price.length === 0) {
      this.setState({ error: "Price is required.", loading: false });
      return false;
    }

    const { age } = this.state.car;
    if (age.length === 0) {
      this.setState({ error: "Age is required.", loading: false });
      return false;
    }
    return true;

  };

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

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let data = this.state.car
    if (this.isValid()) {
      createCar(data).then((data) => {
        this.setState({ loading: false })
        if (!data._id) return this.setState({ error: data.msg })
        this.setState({ redirect: `/cars/${data._id}` })
      })
    }
  };

  signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Title</label>
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
        <label className="text-muted">Price</label>
        <textarea
          onChange={this.handleChange("price")}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Age</label>
        <textarea
          onChange={this.handleChange("age")}
          type="text"
          className="form-control"
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
        <h2 className="mt-5 mb-5">Add New Car</h2>
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
