import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Input,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'

export const Time = () => {
    return (
        <>
            <div className='w-full flex flex-col items-center justify-center relative'>
                <Input  type='time'/>
            </div>


        </>
    )
}