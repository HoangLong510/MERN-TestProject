import axios from "~/axios"
import messages from '~/messages'

export const checkEmailApi = async (email) => {
    try {
        const res = await axios.post('/user/check-email',
            {
                email: email,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        return res.data
    } catch (err) {
        return
    }
}

export const registerApi = async (data) => {
    try {
        const res = await axios.post('/user/register',
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
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