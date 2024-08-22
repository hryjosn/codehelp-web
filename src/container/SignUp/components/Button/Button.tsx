import classNames from 'classnames'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string
    errors: object
}
const Button = ({ text, errors, ...props }: ButtonProps) => {
    return (
        <button
            type="submit"
            className={classNames(
                {
                    'bg-slate-800 hover:bg-slate-700':
                        Object.keys(errors).length === 0,
                },
                {
                    'bg-gray-400': Object.keys(errors).length !== 0,
                },
                'text-white p-3 rounded-full w-40'
            )}
            disabled={Object.keys(errors).length !== 0}
            {...props}
        >
            {text}
        </button>
    )
}

export default Button
