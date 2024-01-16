import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';

export const ActionsCell = ({ id, handleRemoveItem, modal, setModal }) => {
  return (
    <>
      <Flex alignItems={"center"} gap={"0.5rem"}>
        <button onClick={() => [handleRemoveItem(id), setModal(!modal)]} className=' flex items-center gap-2 bg-rosa h-10 w-20 rounded-lg justify-center text-white'>
          <DeleteIcon />
          <h1>Eliminar</h1>
        </button>
      </Flex>
    </>
  )
};

