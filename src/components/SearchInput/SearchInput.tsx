import { CiSearch } from 'react-icons/ci'
import { Props } from './types'

const SearchInput = ({ value, placeholder, onChange, onSubmit }: Props) => {
    return (
        <form
            className="flex items-center rounded-lg bg-gray-100 px-3"
            onSubmit={onSubmit}
        >
            <CiSearch size={25} />
            <input
                placeholder={placeholder}
                className="ml-3 w-full bg-transparent py-3 font-bold outline-none"
                type="text"
                value={value}
                onChange={onChange}
            />
        </form>
    )
}

export default SearchInput
