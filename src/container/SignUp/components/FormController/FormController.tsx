import { useFormContext } from 'react-hook-form'
import { DataProps } from '../../store/types'
import FormInput from '../FormInput/FormInput'
export interface FormControllerProps {
    placeholder: string
    label: "email" | "password" | "userName"
    type?: string
}

const FormController = ({ placeholder, label, type }: FormControllerProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<DataProps>()

    const errorMessage = errors[label]?.message

    return (
        <div className="flex flex-col items-center gap-1">
            <div>
                <p className="text-sm">{label}</p>
                <FormInput
                    register={register}
                    registerName={label}
                />
            </div>
            {errorMessage && typeof errorMessage === 'string' && (
                <p className="text-red-400 text-base">{errorMessage}</p>
            )}
        </div>
    )
}

export default FormController
