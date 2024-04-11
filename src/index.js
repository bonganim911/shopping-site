import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./context/cart-context";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Elements} from '@stripe/react-stripe-js';
import {stripePromise} from "./utils/stripe/stripe.util";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <CartProvider>
                    <Elements stripe={stripePromise}>
                        <App/>
                    </Elements>
                </CartProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
reportWebVitals();
