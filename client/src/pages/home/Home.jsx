import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Home() {
    const { t } = useTranslation()

    return (
        <>
            {Array.from({length: 100}).map((_, i) => {
                return <p key={i}>{t("Homepage")}</p>
            })}
        </>
    )
}
