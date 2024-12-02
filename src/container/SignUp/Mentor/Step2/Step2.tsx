'use client'
import { observer } from 'mobx-react-lite'
import FormInput from '../../components/FormInput/FormInput'
import FormSelect from '../../components/FormSelect/FormSelect'
import yearsList from '~/constant/data/years.json'
import levelList from '~/constant/data/level.json'

const Step2 = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-10 items-center">
                <div className="text-3xl font-bold">
                    What do you do as a professional?
                </div>
                <div>
                    <FormInput label="Your title" registerName={'title'} />
                    <FormInput
                        label="Company/School"
                        registerName={'company'}
                    />
                    <FormSelect
                        label="Level"
                        registerName={'level'}
                        dataList={levelList}
                    />
                    <FormSelect
                        label="Years"
                        registerName={'years'}
                        dataList={yearsList}
                    />
                </div>
            </div>
        </div>
    )
}
export default observer(Step2)
