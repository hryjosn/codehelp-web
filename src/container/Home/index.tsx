'use client'
import { useEffect } from 'react'
import rootStore from '~/store'
import MentorList from './components/MentorList'

const Home = () => {
    const {
        homeStore: { checkIsAuth },
    } = rootStore
    useEffect(() => {
        checkIsAuth()
    }, [])

    return (
        <div>
            <MentorList />
        </div>
    )
}

export default Home
