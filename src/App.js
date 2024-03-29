import Home from "./routes/home/home.component";
import {Route, Routes} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import AuthenticationComponent from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout";

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path='/shop/*' element={<Shop/>}/>
                <Route path='/sign-in' element={<AuthenticationComponent/>}/>
                <Route path='/checkout' element={<Checkout />}/>
            </Route>
        </Routes>
    );
}

export default App;
