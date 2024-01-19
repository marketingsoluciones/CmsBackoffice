import { ActionsCell } from "../Datatable/ActionsCell"
import { DeleteIcon, } from "@chakra-ui/icons";
import { Text, Button } from "@chakra-ui/react";

export const ModalAlert = ({ setModal, modal, id, handleRemoveItem }) => {
    return (
        <>
            <div className="z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden" />
            <div className="backdrop-blur backdrop-filter bg-gray-919EAB opacity-10 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className="space-y-4 bg-white w-max h-fit shadow-lg fixed m-auto inset-0 z-50 rounded-xl px-10 py-5">
                <h1 className="text-xl ">¿Estás seguro de que deseas eliminar este registro?</h1>
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
                <h1 className="text-xl ">¿Estás seguro de que deseas eliminar estos registros?</h1>
                <div className="flex justify-center items-center gap-3 ">
                    <button
                        className="bg-botonBack h-10 w-20 rounded-lg text-white text-base font-base"
                        onClick={() => setModalMasivo(!modalMasivo)}
                    >
                        Descartar
                    </button>
                    <button
                        transition={"all"}
                        color={"white"}
                        _hover={{ bg: "red.100" }}
                        className="flex items-center gap-2 bg-rosa h-10 w-20 rounded-lg justify-center text-white"
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
                    </button>
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
                <span className="text-xl ">¿Estás seguro de que deseas eliminar este registro?</span>
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
                        className='text-sm flex items-center gap-2 bg-rosa h-10 w-20 rounded-lg justify-center text-white'>
                        <DeleteIcon />
                        <span>Eliminar</span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export const Modal = ({ setShowModal, showModal, handle, title }) => {
    return (
        <>
            <div className="z-50 absolute top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className="backdrop-blur backdrop-filter bg-gray-919EAB opacity-10 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className="space-y-4 bg-white w-max md:min-w-[33%] h-fit shadow-lg fixed m-auto inset-0 z-50 rounded-xl px-10 py-5">
                <span className="text-xl ">{title}</span>
                <div className="flex justify-center items-center gap-6">
                    <Button
                        size={"md"}
                        width={"30%"}
                        bg={"gray.400"}
                        _hover={false}
                        fontFamily={""}
                        textColor={"white"}
                        onClick={async () => {
                            await handle()
                            setShowModal(!showModal)
                        }}>
                        <span>Salir</span>
                    </Button>
                    <Button
                        size={"md"}
                        width={"30%"}
                        bg={"#15803d"}
                        _hover={false}
                        fontFamily={""}
                        textColor={"white"}
                        onClick={() => setShowModal(!showModal)}>
                        <span>Volver</span>
                    </Button>
                </div>
            </div>
        </>
    )
}