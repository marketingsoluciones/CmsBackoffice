import { ActionsCell } from "../Datatable/ActionsCell"
import { DeleteIcon, } from "@chakra-ui/icons";
import { Text, Button } from "@chakra-ui/react";

export const ModalAlert = ({ setModal, modal, id, handleRemoveItem }) => {
    return (
        <>
            <div className="z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden" />
            <div className="backdrop-blur backdrop-filter bg-gray-919EAB opacity-10 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className="space-y-4 bg-white w-max h-fit shadow-lg fixed m-auto inset-0 z-50 rounded-xl px-10 py-5">
                <h1 className="text-xl ">Estas seguro de que deseas eliminar este registro ?</h1>
                <div className="flex justify-center items-center gap-3">
                    <button className="bg-botonBack h-10 w-20 rounded-lg text-white" onClick={() => setModal(!modal)}>Descartar</button>
                    <ActionsCell id={id} handleRemoveItem={handleRemoveItem} modal={modal} setModal={setModal} />
                </div>
            </div>
        </>
    )
}

export const ModalMasivoAlert = ({ setModalMasivo, modalMasivo, onClickList, handleRemoveItem }) => {
    return (
        <>
            <div className="z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden" />
            <div className="backdrop-blur backdrop-filter bg-gray-919EAB opacity-10 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className="space-y-4 bg-white w-max h-fit shadow-lg fixed m-auto inset-0 z-50 rounded-xl px-10 py-5">
                <h1 className="text-xl ">Estas seguro de que deseas eliminar estos registros ?</h1>
                <div className="flex justify-center items-center gap-3">
                    <button className="bg-botonBack h-10 w-20 rounded-lg text-white" onClick={() => setModalMasivo(!modalMasivo)}>Descartar</button>
                    <Button
                        transition={"all"}
                        bg={"red.400"}
                        color={"white"}
                        _hover={{ bg: "red.500" }}
                        onClick={() => {
                            [handleRemoveItem(onClickList), setModalMasivo(!modalMasivo)]
                        }}
                    >
                        <Text
                            display={"flex"}
                            gap={"2px"}
                            alignItems={"center"}
                            justifyItems={"center"}
                            w={"3rem"}
                            fontSize={"sm"}
                            justifyContent={"center"}
                            fontWeight={"medium"}
                        >
                            <DeleteIcon />
                            Eliminar
                        </Text>
                    </Button>
                </div>
            </div>
        </>
    )
}

export const DeleteModall = ({ setModal, modal, handleRemove }) => {
    return (
        <>
            <div className="z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden" />
            <div className="backdrop-blur backdrop-filter bg-gray-919EAB opacity-10 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className="space-y-4 bg-white w-max h-fit shadow-lg fixed m-auto inset-0 z-50 rounded-xl px-10 py-5">
                <span className="text-xl ">Estas seguro de que deseas eliminar este registro ?</span>
                <div className="flex justify-center items-center gap-3">
                    <button className="bg-botonBack h-10 w-20 rounded-lg text-white text-sm" onClick={() => setModal(!modal)}>Descartar</button>
                    <Button
                        _hover={{ bg: "red.400" }}
                        //_focus={"none"}
                        rounded={"xl"}
                        color={"white"}
                        bg={"red.500"}
                        onClick={() => {
                            handleRemove()
                            setModal(!modal)
                        }}
                        className='text-sm flex items-center gap-2 bg-red-600 h-10 w-20 rounded-lg justify-center text-white'>
                        <DeleteIcon />
                        <span>Eliminar</span>
                    </Button>
                    {/*  <IconButton size={"sm"} onClick={() => [setModal(!modal),handleRemoveItem(id)]} icon={<DeleteIcon />} /> */}
                </div>
            </div>
        </>
    )
}