'use client'
import { observer } from 'mobx-react-lite'
import FormInput from '../../components/FormInput/FormInput'

const Step2 = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-10 items-center">
                <div className="text-lg font-bold md:text-3xl">
                    What do you do as a professional?
                </div>
                <div>
                    <FormInput label="Your title" registerName={'title'} />
                    <FormInput
                        label="Company/School"
                        registerName={'company'}
                    />
                </div>
            </div>
        </div>
    )
}
export default observer(Step2)
