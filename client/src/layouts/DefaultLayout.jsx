import { LinearProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '~/components/Footer/Footer'
import Navbar from '~/components/Navbar/Navbar'

export default function DefaultLayout({ children }) {

    const loading = useSelector(state => state.loading.value)

    return (
        <>
            <header>
                <div style={{ width: '100%', position: 'fixed', top: 0 }}>
                    {loading && (
                        <LinearProgress />
                    )}
                </div>
                <Navbar />
            </header>

            <main>
                {children}
                <Footer />
            </main>
        </>
    )
}
