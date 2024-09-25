import axios from "~/axios"

export const fetchDataUserApi = async () => {
    try {
        const res = await axios.get("/user/fetch-data", {
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
                success: false
            }
        }
    }
}