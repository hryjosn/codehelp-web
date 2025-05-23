'use client'

import { Label } from '~/components/ui/label'
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select'
import { Props } from './types'

const ExpertiseDropDown = ({
    title,
    htmlFor,
    value,
    placeholder,
    content,
    required,
    onValueChange,
}: Props) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={htmlFor} className="font-medium">
                {title}
                {required && <span className="ml-1 text-red-500">*</span>}
            </Label>
            <Select
                value={value || ''}
                onValueChange={onValueChange}
                required={required}
            >
                <SelectTrigger id={htmlFor}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>{content}</SelectContent>
            </Select>
        </div>
    )
}

export default ExpertiseDropDown
