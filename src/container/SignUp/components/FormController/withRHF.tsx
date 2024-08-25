import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { ReactNode, FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../Button/Button'
import { DataProps } from '../../store/types'

export const StorybookFormProvider: FC<{
    onSubmit: SubmitHandler<DataProps>
    schema: Joi.Schema
    children: ReactNode
}> = ({ children, schema, onSubmit }) => {
    const methods = useForm<DataProps>({
        resolver: joiResolver(schema),
    })
    const {
        formState: { errors },
    } = methods
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-3"
            >
                {children}
                <Button text={'Sign Up'} errors={errors} />
            </form>
        </FormProvider>
    )
}
