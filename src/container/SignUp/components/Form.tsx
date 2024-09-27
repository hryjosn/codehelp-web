import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi/lib'
import { ReactNode } from 'react'
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form'

interface FormProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>
    schema: Joi.Schema
    children: ReactNode
}
export const Form = <T extends FieldValues>({
    schema,
    children,
    onSubmit,
}: FormProps<T>) => {
    const methods = useForm<T>({
        resolver: joiResolver(schema),
        mode: 'onChange',
    })
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-1 flex-col items-center"
            >
                {children}
            </form>
        </FormProvider>
    )
}
