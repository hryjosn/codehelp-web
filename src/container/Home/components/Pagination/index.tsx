'use client'
import { Pagination as CustomPagination } from '@mui/material'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from '~/i18n/routing'
const Pagination = ({ count }: { count: number }) => {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const currentPage = Number(searchParams.get('page')) || 1
    const handleOnChange = (_: React.ChangeEvent<unknown>, page: number) => {
        const params = new URLSearchParams(searchParams)
        if (page) {
            params.set('page', page.toString())
        } else {
            params.delete('page')
        }
        replace(`?${params.toString()}`)
    }
    return (
        <CustomPagination
            count={count}
            page={currentPage}
            onChange={handleOnChange}
        />
    )
}

export default Pagination
