import React, { useEffect, useState } from 'react'
import './styles.css'
const ListUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const user = await data.json();
        //Muestro solo 4 resultados
        setUsers(user.slice(0, 4));
    }
    return (
        <>
            <div className="text-users">
                MAYORES VISITAS DEL MES
            </div>
            {users.map((user) =>
                <div className="card-users card m-auto mt-2" key={user.id}>
                    <div className="name">
                        {user.name}
                    </div>
                    <div className="text-start p-3">
                        <div>
                            <span className="fw-bolder">Nick: </span>
                            {user.username}
                        </div>
                        <div>
                            <span className="fw-bolder">Email: </span>{user.email}
                        </div>
                        <div>
                            <span className="fw-bolder">Website: </span>{user.website}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ListUsers
