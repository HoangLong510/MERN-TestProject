import axios from "~/axios"
import messages from "~/messages"

export const loginApi = async (data) => {
    try {
        const res = await axios.post('/user/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        } else {
            return {
                success: false,
                message: [
                    messages.InternalServerError
                ]
            }
        }
    }
}

export const loginWithGoogleApi = async (access_token) => {
    try {
        const res = await axios.get('/user/login-with-google',
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            }
        )
        return res.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        } else {
            return {
                success: false,
                message: [
                    messages.InternalServerError
                ]
            }
        }
    }
}

export const fetchDataUserApi = async () => {
    try {
        const res = await axios.get('/user/fetch-data', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.data
    } catch (error) {
        return {
            success: false,
            message: [
                messages.ErrorWhenFetchingUserData
            ]
        }
    }
}