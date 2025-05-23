
import './LoginContainer.css'
import { NavLink, useNavigate } from 'react-router-dom'
import DropdownMenuContainer from '../DropdownMenuContainer/DropdownMenuContainer';
import { useState } from 'react'


const LoginContainer = ({ user, setUser }) => {
    const [userItems, setUserItems] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    const navigateToPage = useNavigate()

    //Get all usernames for the dropdown
    if (!userItems) {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users`)
        .then(response => response.json())
        .then(data => {
            setUserItems(data)
        })
        .catch(error => {
            console.error("Error: ", error)
        })
    }

    const processUserSelection = (username) => {
        console.log("Newly selected user: ", username)
        setSelectedUser(username)
    }

    const processLogin = () => {
        const userId = findUserId(selectedUser)
        console.log("Logging in user:", selectedUser)
        console.log(`${selectedUser}'s ID:`, userId)
        
        setUser(userId)
        navigateToPage(`/user/${userId}/saved`)
      }
      
    const findUserId = (username) => {
        return userItems.find((user) => {
            return user.username === username
        }).id
    }

    let usernames = []
    if (userItems) {
        usernames = userItems.map((user) => {
            return user.username
        })
    }

    return (
        <div className='loginContainer'>
            <div className='loginInfo'>
                <p>
                    {"User:  "} 
                </p>
                {userItems && (
                    <DropdownMenuContainer key="login-menu" itemsList={usernames} defaultText="Select username" processSelection={processUserSelection} />
                )}
                <br></br>
                {selectedUser ? (
                    <button onClick={() => processLogin()}>Login!</button>
                ) : (
                    <button className="button-disabled" disabled={true}>Pick a user...</button>
                )}
            </div>
        </div>
    )
}

export default LoginContainer;

