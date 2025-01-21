'use client'

import Header from '~/components/Header/Header'
import MentorList from './components/MentorList'
import { observer } from 'mobx-react-lite'

const Home = () => {
    return (
        <div>
            <Header />
            <MentorList />
        </div>
    )
}

export default observer(Home)
