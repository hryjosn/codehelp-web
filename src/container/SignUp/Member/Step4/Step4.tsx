'use client'
import { observer } from 'mobx-react-lite'
import FormInput from '../../components/FormInput/FormInput'

const Step4 = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col">
                <div className="text-3xl font-bold mb-10">
                    {"Lastly, what's your introduction?"}
                </div>
                <FormInput
                    label="Introduction"
                    registerName={'introduction'}
                    multiline
                    rows={5}
                />
            </div>
        </div>
    )
}
export default observer(Step4)
