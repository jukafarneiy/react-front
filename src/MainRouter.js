import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./core/Menu";
import Cars from "./car/Cars";
import EditCar from "./car/EditCar"; 
import CreateCar from "./car/CreateCar"; 

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Cars} />
            <Route exact path="/cars" component={Cars} />
            <Route exact path="/cars/new" component={CreateCar} />
            <Route exact path="/cars/:carId" component={EditCar} />
        </Switch>
    </div>
);

export default MainRouter;
