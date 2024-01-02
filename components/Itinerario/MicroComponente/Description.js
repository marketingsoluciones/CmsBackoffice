import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { InputFieldGlobal } from '../../formularios/Inputs/InputFieldGlobal'

export const Description = () => {
    return (
        <div className='w-[25%]'>
            {/* <div className='w-60'>
                <Editable defaultValue='What do you want to do.' >
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </div> */}

            <InputFieldGlobal
                name="Descripcion"
                className="focus:outline-none border* border-gray-300 rounded-lg py-1 px-3  w-full truncate text-[15px] "
                placeholder="Agrega la descripcion de tu tarea "
            />

        </div>
    )
}