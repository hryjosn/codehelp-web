'use client'
import { observer } from 'mobx-react-lite'
import workList from '~/constant/data/work.json'
import levelList from '~/constant/data/level.json'
import FormSelect from '../../components/FormSelect/FormSelect'
import { Box, Chip } from '@mui/material'

const Step3 = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col gap-10 items-center">
                <div className="text-3xl font-bold">
                    {"What's your super power like?"}
                </div>
                <div>
                    <FormSelect
                        label="Work"
                        multiple
                        registerName={'work'}
                        dataList={workList}
                        renderValue={(value) => {
                            const selected = value as string[]
                            return (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                    }}
                                >
                                    {selected?.map((value, index) => (
                                        <Chip key={index} label={value} />
                                    ))}
                                </Box>
                            )
                        }}
                    />
                    <FormSelect
                        label="Level"
                        registerName={'level'}
                        dataList={levelList}
                    />
                </div>
            </div>
        </div>
    )
}
export default observer(Step3)
