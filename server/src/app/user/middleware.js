import jwt from 'jsonwebtoken'
import messages from '~/messages'

class middleware {
    loginWithGoogle = (req, res, next) => {
        const access_token = req.headers.authorization.split(' ')[1]
        if (!access_token){
            return res.status(401).json({
                error: true,
                message: [
                    messages.LoginFailed
                ]
            })
        } else {
            req.body.access_token = access_token
            next()
        }
    }

    fetchData = (req, res, next) => {
        const token = req.cookies.token
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, token) => {
                if (err) {
                    res.clearCookie("token")
                    return res.status(404).json({
                        error: true
                    })
                } else {
                    const { userId, exp } = token

                    if (exp * 1000 < Date.now() + 30 * 60 * 1000) {
                        req.body.refresh = true
                    }

                    req.body.userId = userId

                    next()
                }
            })
        } else {
            return res.status(404).json({
                success: false
            })
        }
    }
}

export default new middleware()