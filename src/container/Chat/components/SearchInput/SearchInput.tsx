import { CiSearch } from 'react-icons/ci'

const SearchInput = ({ ...props }) => {
    return (
        <div className="flex items-center rounded-lg bg-gray-100 px-3">
            <CiSearch size={25} />
            <input
                {...props}
                className="ml-3 w-full bg-transparent py-3 font-bold outline-none"
                type="text"
            />
        </div>
    )
}

export default SearchInput
