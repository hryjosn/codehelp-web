'use client'
import { useState } from 'react'
import SearchInput from '~/components/SearchInput/SearchInput'

const SearchInputSection = () => {
    const [searchingValue, setSearchingValue] = useState('') //temporary
    return (
        <SearchInput
            placeholder="Search Members"
            value={searchingValue}
            onChange={(e) => {
                setSearchingValue(e.target.value)
            }}
            onSubmit={(e) => {
                e.preventDefault()
                setSearchingValue('')
            }}
        />
    )
}

export default SearchInputSection
