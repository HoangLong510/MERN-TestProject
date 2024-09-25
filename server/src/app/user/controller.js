import service from './service'
import messages from '~/messages'

class ctrl {
    checkEmailExists = async (req, res) => {
        const { email } = req.body

        const response = await service.checkEmailExists(email)

        res.status(response.status).json(response)
    }

    register = async (req, res) => {
        const {
            name,
            email,
            password,
            confirmPassword
        } = req.body

        const response = await service.register(
            name,
            email,
            password,
            confirmPassword
        )

        res.status(response.status).json(response)
    }

    login = async (req, res) => {
        const {
            email,
            password
        } = req.body

        const response = await service.login(email, password)

        if (response.token) {
            res.cookie("token", response.token.value, {
                httpOnly: true,
                maxAge: response.token.maxAge,
                secure: process.env.NODE_ENV === "production",
                path: '/'
            })
        }

        res.status(response.status).json({
            success: response.success,
            status: response.status,
            message: response.message
        })
    }

    loginWithGoogle = async (req, res) => {
        const {
            access_token
        } = req.body

        const response = await service.loginWithGoogle(access_token)

        if (response.token) {
            res.cookie("token", response.token.value, {
                httpOnly: true,
                maxAge: response.token.maxAge,
                path: '/',
                secure: process.env.NODE_ENV === "production",
            })
        }

        res.status(response.status).json({
            success: response.success,
            status: response.status,
            message: response.message
        })
    }

    logout = async (req, res) => {
        res.clearCookie("token")

        res.status(200).json({
            success: true,
            status: 200,
            message: [
                messages.LogoutSuccessfully
            ]
        })
    }

    fetchData = async (req, res) => {
        const { userId, refresh } = req.body

        const response = await service.fetchData(userId, refresh)

        if (response.token) {
            res.cookie("token", response.token.value, {
                httpOnly: true,
                maxAge: response.token.maxAge,
                path: '/',
                secure: process.env.NODE_ENV === "production",
            })
        }

        res.status(response.status).json({
            success: response.success,
            status: response.status,
            user: response.user
        })
    }
}

export default new ctrl()