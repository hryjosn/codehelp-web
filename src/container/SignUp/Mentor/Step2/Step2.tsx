'use client'
import { observer } from 'mobx-react-lite'
import FormInput from '../../components/FormInput/FormInput'
import FormSelect from '../../components/FormSelect/FormSelect'
import yearsList from '~/constant/data/years.json'
import levelList from '~/constant/data/level.json'

const Step2 = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-10">
                <div className="text-lg font-bold md:text-3xl">
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
