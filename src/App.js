import React, { useEffect, useState } from "react";
import PageCustomerReward from "./PageCustomerReward";

import './App.css';
import { getData } from './utils';

function App() {

    const [customerData, setCustomerDate] = useState([]);
    const [transactionData, setTransactionData] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        (async () => {
            const { customerData, transactionData, error=null } = await getData(setSpinner);
            console.log(customerData);
            setCustomerDate(customerData);
            setTransactionData(transactionData);
            setError(error);
        })();
    }, []);

    return (
        <PageCustomerReward 
            customerData={customerData}
            transactionData={transactionData}
            spinner={spinner}
            error={error}
        />
    );
}

export default App;