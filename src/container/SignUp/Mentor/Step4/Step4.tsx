'use client'
import { observer } from 'mobx-react-lite'
import FormInput from '../../components/FormInput/FormInput'

const Step4 = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col rounded-xl">
                <div className="mb-10 text-3xl font-bold">
                    {"Lastly, what's your introduction?"}
                </div>
                <div className="flex flex-col items-center">
                    <FormInput
                        label="LinkedIn URL"
                        registerName={'linkedIn'}
                        placeholder="https://www.linkedin.com/in/"
                    />
                    <FormInput
                        label="Introduction"
                        registerName={'introduction'}
                        multiline
                        rows={5}
                    />
                </div>
            </div>
        </div>
    )
}
export default observer(Step4)
