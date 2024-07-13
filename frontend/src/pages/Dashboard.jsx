import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from '../components/Users'



function Dashboard() {

    const [balance, setBalance] = useState("")

    async function getBalance() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token is not available");
            return;
        }

        try {
            const res = await axios.get('http://localhost:4000/api/v1/account/balance', {
                headers: { Authorization: "Bearer " + token }
            });
            if (res.data && res.data.balance !== undefined) {
                setBalance(res.data.balance);
            } else {
                console.error("Unexpected response structure:", res.data);
            }
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }


    useEffect(() => {
        getBalance()
    }, [])

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}

export default Dashboard
