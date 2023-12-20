import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'

export const Description = () => {
    return (
        <>
            <div className='w-60'>
                <Editable defaultValue='What do you want to do.' >
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </div>

        </>
    )
}