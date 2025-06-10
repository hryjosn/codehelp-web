'use client'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Props } from './types'

const Selector = ({ label, value, dataList, onChange }: Props) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value)
    }
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select value={value} label={label} onChange={handleChange}>
                {dataList.map((data) => (
                    <MenuItem key={data.code} value={data.value}>
                        {data.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default Selector
