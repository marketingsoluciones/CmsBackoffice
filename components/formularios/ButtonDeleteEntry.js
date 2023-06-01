import { useState } from "react";
import { DeleteModall } from "../modals/Alert";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export const ButtonDeleteEntry = ({ title, handleRemove, isLoading }) => {
  const [modal, setModal] = useState(false)
  return (
    <>
      {
        modal ? (
          <DeleteModall setModal={setModal} modal={modal} handleRemove={handleRemove} />
        ) : null
      }
      <Button
        bg={"white"}
        rounded={"xl"}
        size={"sm"}
        w={"100%"}
        color={"red.500"}
        leftIcon={<DeleteIcon />}
        isLoading={isLoading}
        onClick={() => setModal(!modal)}
      >
        {title}
      </Button>
    </>
  );
};
