'use client'
import { useEffect } from 'react'
import { Header } from '~/components/Header/Header'
import rootStore from '~/store'
import MentorList from './components/MentorList'
import { observer } from 'mobx-react-lite'

const Home = () => {
    const {
        homeStore: { isAuth, checkIsAuth },
    } = rootStore
    useEffect(() => {
        checkIsAuth()
    }, [])

    return (
        <div>
            <Header isAuth={isAuth} />
            <MentorList />
        </div>
    )
}

export default observer(Home)
