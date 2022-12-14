import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { deleteCar } from '../service/car';
import { signout } from '../auth';

class DeleteCar extends Component {
    state = {
        redirect: false
    };

    deleteCar = () => {
        const carId = this.props.carId;
        console.log('userId in deleteAccount ', carId);
        deleteCar(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // signout user
                signout(() => console.log('Car is deleted'));
                // redirect
                this.setState({ redirect: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your account?');
        if (answer) {
            this.deleteAccount();
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                Delete Profile
            </button>
        );
    }
}

export default DeleteUser;
