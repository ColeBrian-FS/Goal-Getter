import axios from "axios";

const API_URL = `${process.env.API_URL}/api/users/`


// Register User - Sends user info
const register = async (userData) => {

    const response = await axios.post(API_URL, userData)

    // returns web token
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login User - Sends user info
const login = async (userData) => {

    const response = await axios.post(API_URL + "login", userData)

    // returns web token
    if (response.data) {
        localStorage.setItem('goal-getter-user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}
const authService = {
    register,
    logout,
    login
}
export default authService

