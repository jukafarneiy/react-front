import React, { Component } from "react";
import { getCarById, updateCar } from "../service/car";

class EditCar extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      brand: "",
      price: 0,
      age: 0,

      error: "",
      loading: false,
    };
  }

  init = carId => {
    getCarById(carId).then(data => {
      this.setState({
        id: data._id,
        title: data.title,
        brand: data.brand,
        price: data.price,
        age: data.age,

        error: "",
      });

    });
  };

  componentDidMount() {
    this.carData = new FormData();
    const carId = this.props.match.params.carId;
    this.init(carId);
  }

  isValid = () => {
    // ADICIONAR VALIDACOES
    const { title } = this.state;
    if (title.length === 0) {
      // this.setState({ error: "Name is required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = event.target.value;

    this.carData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let data = this.state
    delete data.error;
    delete data.loading;
    if (this.isValid()) {
      updateCar(data).then(() => {
        this.setState({ loading: false })
      })
    }
  };

  signupForm = (id, title, brand, price, age) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Model</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Brand</label>
        <input
          onChange={this.handleChange("brand")}
          type="brand"
          className="form-control"
          value={brand}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <textarea
          onChange={this.handleChange("price")}
          type="text"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Age</label>
        <textarea
          onChange={this.handleChange("age")}
          type="text"
          className="form-control"
          value={age}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Update
      </button>
    </form>
  );

  render() {
    const {
      id, title, brand, price, age, error, loading
    } = this.state;

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
          ""
        )}


        {this.signupForm(id, title, brand, price, age)}
      </div>
    );
  }
}

export default EditCar;
