'use client'
import { observer } from 'mobx-react-lite'
import countryList from '~/constant/data/countries.json'
import genderList from '~/constant/data/gender.json'
import FormSelect from '../../components/FormSelect/FormSelect'
import FormPhoneInput from '../../components/FormPhoneInput/FormPhoneInput'

const Step1 = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-10">
                <div className="text-3xl font-bold">
                    {"Hello! What's your origin story?"}
                </div>
                <div className="flex flex-col">
                    <FormPhoneInput
                        label="Phone number"
                        registerName={'phoneNumber'}
                    />
                    <FormSelect
                        label="Gender"
                        registerName={'gender'}
                        dataList={genderList}
                    />
                    <FormSelect
                        label="Country"
                        registerName={'country'}
                        dataList={countryList}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(Step1)
