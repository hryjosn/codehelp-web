'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '../EditProfileModal/components/ui/dialog'
import { Button } from '../EditProfileModal/components/ui/button'
import { Label } from './components/ui/label'
import { Badge } from './components/ui/badge'

import { X } from 'lucide-react'
import { useEditSelectOptionModalStore } from './store/EditSelectOptionModalStore'
import { Separator } from '~/container/UserProfile/components/separator'

export default function EditSelectOptionModal() {
    const {
        isOpen,
        title,
        dataList,
        selectedOptionList,
        selectedError,
        setSelectedOptionList,
        setSelectedError,
        closeModal,
        onSave,
    } = useEditSelectOptionModalStore()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedOptionList.length === 0) {
            setSelectedError(`You have to select at least one ${title}`)
            return
        }
        onSave(selectedOptionList)
        closeModal()
    }
    const handleSelect = (data: string) => {
        setSelectedError('')
        if (selectedOptionList.includes(data)) {
            setSelectedOptionList(
                selectedOptionList.filter((item) => item !== data)
            )
        } else {
            if (selectedOptionList.length < 3) {
                setSelectedOptionList([...selectedOptionList, data])
            } else {
                setSelectedError(`You can select a maximum of 3 ${title} areas`)
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit {title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <div>
                        <div className="space-y-2 pb-3">
                            <Label>Selected {title} (Max 3)</Label>
                            <div className="mb-2 flex flex-wrap gap-2">
                                {selectedOptionList.length > 0 ? (
                                    selectedOptionList.map((option, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="flex items-center gap-1 px-3 py-1"
                                        >
                                            {option}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedOptionList(
                                                        selectedOptionList.filter(
                                                            (item) =>
                                                                item !== option
                                                        )
                                                    )
                                                }
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <X className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Remove {option}
                                                </span>
                                            </button>
                                        </Badge>
                                    ))
                                ) : (
                                    <div className="py-2 text-sm text-muted-foreground">
                                        No option selected
                                    </div>
                                )}
                            </div>
                            {selectedError && (
                                <p className="text-sm text-red-500">
                                    {selectedError}
                                </p>
                            )}
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label>Available {title}</Label>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                {dataList.map((data, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <Button
                                            type="button"
                                            variant={
                                                selectedOptionList.includes(
                                                    data
                                                )
                                                    ? 'secondary'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            className="w-full justify-start"
                                            onClick={() => handleSelect(data)}
                                        >
                                            {data}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
