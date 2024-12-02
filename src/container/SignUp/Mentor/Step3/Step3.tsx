'use client'
import { observer } from 'mobx-react-lite'
import toolList from '~/constant/data/tools.json'
import disciplineList from '~/constant/data/disciplines.json'
import expertiseList from '~/constant/data/expertise.json'
import skillList from '~/constant/data/skills.json'
import FormSelect from '../../components/FormSelect/FormSelect'
import { Box, Chip } from '@mui/material'

const Step3 = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-10 items-center">
                <div className="text-3xl font-bold">
                    {"What's your super power like?"}
                </div>
                <div>
                    <FormSelect
                        label="Expertise"
                        multiple
                        registerName={'expertise'}
                        dataList={expertiseList}
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
                        label="Disciplines"
                        multiple
                        registerName={'disciplines'}
                        dataList={disciplineList}
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
                        label="Skills"
                        multiple
                        registerName={'skills'}
                        dataList={skillList}
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
                        label="Tools"
                        multiple
                        registerName={'tools'}
                        dataList={toolList}
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
                </div>
            </div>
        </div>
    )
}
export default observer(Step3)
