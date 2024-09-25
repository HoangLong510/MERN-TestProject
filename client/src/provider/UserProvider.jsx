import { useDispatch, useSelector } from 'react-redux'
import { fetchDataUserApi } from './service'
import { clearUser, setUser } from '~/libs/features/user/userSlice'
import { useEffect, useState } from 'react'

export default function UserProvider({ children }) {

    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        const res = await fetchDataUserApi()

        if (res.success === true) {
            dispatch(setUser(res.user))
        } else {
            if (user.exists) {
                dispatch(clearUser())
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUser()
        setInterval(() => {
            fetchUser()
        }, 5 * 60 * 1000)
    }, [])

    if (!loading) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return (
            <>
                
            </>
        )
    }
}
