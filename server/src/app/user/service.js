import Users from '~/models/user'
import regex from '~/utils/regex'
import messages from '~/messages'
import bcrypt from 'bcryptjs'
import generateToken from '~/config/jsonwebtoken'

const salt = bcrypt.genSaltSync(10)

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

// config
const selectUserFields = 'email name phone gender address image role activeEmail createdAt updatedAt'
const expIn = '1d'
const maxAge = 24 * 60 * 60 * 1000

class service {
    checkEmailExists = (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const emailExists = await Users.exists({ email })
                resolve({
                    success: true,
                    status: 200,
                    emailExists
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    register = (
        name,
        email,
        password,
        confirmPassword
    ) => {
        return new Promise(async (resolve, reject) => {
            try {
                let errors = []

                if (!name || name.trim() === '') {
                    errors.push(messages.nameIsRequired)
                } else {
                    if (!regex.name.rx.test(name)) {
                        errors.push(regex.name.message)
                    }
                }

                if (!email || email.trim() === '') {
                    errors.push(messages.emailIsRequired)
                } else {
                    if (!regex.email.rx.test(email)) {
                        errors.push(regex.email.message)
                    } else {
                        const checkEmail = await Users.exists({ email })
                        if (checkEmail) {
                            errors.push(messages.emailAlreadyExists)
                        }
                    }
                }

                if (!password || password.trim() === '') {
                    errors.push(messages.passwordIsRequired)
                } else {
                    if (!regex.password.rx.test(password)) {
                        errors.push(regex.password.message)
                    }
                }

                if (!confirmPassword || confirmPassword.trim() === '') {
                    errors.push(messages.confirmPasswordIsRequired)
                } else {
                    if (confirmPassword !== password) {
                        errors.push(messages.confirmPasswordDoesNotMatch)
                    }
                }

                if (errors.length > 0) {
                    resolve({
                        success: false,
                        status: 400,
                        message: errors
                    })
                } else {
                    const hashPassword = await hashUserPassword(password)
                    const newUser = new Users({
                        name,
                        email,
                        password: hashPassword
                    })
                    await newUser.save()

                    resolve({
                        success: true,
                        status: 200,
                        message: [
                            messages.RegisterSuccess
                        ]
                    })
                }

            } catch (err) {
                reject(err)
            }
        })
    }

    login = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                let errors = []

                if (!email || email.trim() === '') {
                    errors.push(messages.emailIsRequired)
                }

                if (!password || password.trim() === '') {
                    errors.push(messages.passwordIsRequired)
                }

                if (errors.length > 0) {
                    resolve({
                        success: false,
                        status: 400,
                        message: errors
                    })
                } else {
                    const user = await Users.findOne({ email })
                    if (!user) {
                        errors.push(messages.EmailOrPasswordIncorrect)
                        resolve({
                            success: false,
                            status: 401,
                            message: errors
                        })
                    } else {
                        const isMatch = await bcrypt.compare(password, user.password)
                        if (!isMatch) {
                            errors.push(messages.EmailOrPasswordIncorrect)
                            resolve({
                                success: false,
                                status: 401,
                                message: errors
                            })
                        } else {
                            if (!user.active) {
                                errors.push(messages.AccountNotActive)
                                resolve({
                                    success: false,
                                    status: 401,
                                    message: errors
                                })
                            } else {
                                const token = await generateToken(user, expIn)
                                resolve({
                                    success: true,
                                    status: 200,
                                    message: [
                                        messages.LoginSuccess
                                    ],
                                    token: {
                                        value: token,
                                        maxAge: maxAge
                                    }
                                })
                            }
                        }
                    }
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    loginWithGoogle = (
        access_token
    ) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                const res = await response.json()

                if (res) {
                    const checkEmail = await Users.exists({ email: res.email })

                    if (!checkEmail) {
                        const newUser = new Users({
                            name: res.name,
                            email: res.email,
                            password: 'google-password',
                            image: res.picture,
                            activeEmail: true
                        })
                        await newUser.save()
                    }

                    const user = await Users.findOne({ email: res.email }).select(selectUserFields)
                    const token = await generateToken(user, expIn)

                    resolve({
                        success: true,
                        status: 200,
                        message: [
                            messages.LoginSuccess
                        ],
                        token: {
                            value: token,
                            maxAge: maxAge
                        }
                    })

                } else {
                    resolve({
                        success: false,
                        status: 400,
                        message: [
                            messages.LoginFailed
                        ]
                    })
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    fetchData = (userId, refresh) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Users.findById(userId).select(selectUserFields)
                if (!user) {
                    resolve({
                        success: false,
                        status: 401
                    })
                } else {
                    if (refresh) {
                        const token = await generateToken(user, expIn)
                        resolve({
                            success: true,
                            status: 200,
                            user,
                            token: {
                                value: token,
                                maxAge: maxAge
                            }
                        })
                    } else {
                        resolve({
                            success: true,
                            status: 200,
                            user
                        })
                    }
                }
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default new service()