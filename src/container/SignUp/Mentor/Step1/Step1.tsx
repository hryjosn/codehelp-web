'use client'
import { observer } from 'mobx-react-lite'
import genderList from '~/constant/data/gender.json'
import countryList from '~/constant/data/countries.json'
import FormSelect from '../../components/FormSelect/FormSelect'
import FormPhoneInput from '../../components/FormPhoneInput/FormPhoneInput'
import educationList from '~/constant/data/education.json'

const Step1 = () => {
    return (
        <div className="flex h-full items-center justify-center ">
            <div className="flex flex-col items-center gap-10">
                <div className="text-lg font-bold md:text-3xl">
                    {"Hello! What's your origin story?"}
                </div>
                <div>
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
                    <FormSelect
                        label="Education"
                        registerName={'education'}
                        dataList={educationList}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(Step1)
