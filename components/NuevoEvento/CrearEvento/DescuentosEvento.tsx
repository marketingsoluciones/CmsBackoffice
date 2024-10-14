import { FC, useState } from "react";
import ModalDescuentos from "./Modales/ModalDescuento";
import { Modal } from "../../modals/Modal";
import { useRouter } from 'next/router';
import { ButtonEvents } from "../../Events/ButtonEvents";
import ModoDemo from "../Principal/ModoDemo";
interface propsDescuentosEvento {
    componentState: any;
    setComponentState: any;
  
  }

const DescuentosEvento: FC <propsDescuentosEvento> = ({componentState,setComponentState}) => {
      const router = useRouter()
    const [addDescuento, setAddDescuento] = useState(false);

  return (
    <div className="md:w-[1050px] w-full h-[90vh] flex flex-col items-start justify-start overflow-auto py-[30px] px-[20px] box-border gap-[30px]">
     
     <div className="flex items-center justify-center">
        <ModoDemo />
      </div>
          
          <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px]">
            
            <div className="self-stretch flex flex-row items-center justify-start py-0 pr-[7px] pl-0 box-border max-w-full">

                  <div onClick={() => { router.push("/events/configure-event") }}
                  
                  className="cursor-pointer flex flex-col items-start justify-start">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src="/ModuloEvento/FlechaIzquerda.svg"
                          />
                        </div>
                  </div>

                      <div className="w-auto h-[31.5px] leading-[31.5px] text-[16px] font-semibold">
                        Códigos de descuento
                      </div>
            </div>

            <div className="self-stretch flex flex-row items-center justify-center gap-[10px] text-center text-sm text-primary-contrast">
                    <div className="w-[25px] h-full flex flex-row bg-slate-200 rounded-md items-center justify-center">
                      <img
                        className="h-[16.3px] w-[15.8px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/ModuloEvento/trespuntos.svg"
                      />
                    </div>
                  
                
              
              
                <ButtonEvents text={"Nuevo"} onClick={() => {setAddDescuento(!addDescuento)}}/>
              
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start gap-[14px]">
              
              <div className="self-stretch flex flex-row items-start justify-center">
                
                  <img
                    className=""
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/porciento1.svg"
                  />
                
              </div>
                
                <div className="self-stretch flex flex-col items-center justify-center">
                  <div className="w-auto leading-[21px] font-semibold text-sm flex items-center justify-center text-gray-600">
                    No hay códigos de descuento en este evento
                  </div>
                  <p className="m-0 text-xs">
                    Crea un código de descuento único para este evento o importa
                    un
                  </p>
                  <p className="m-0 text-xs">
                    código de descuento ya creado de tu negocio.
                  </p>
                </div>
              
          </div>

          
        
      
      {
  addDescuento ? (
      <Modal  
      setOpenIcon="" 
      openIcon="" 
      classe={"w-[36%] h-[76%]"}>

          <ModalDescuentos addDescuento={addDescuento} setAddDescuento={setAddDescuento} />
      </Modal>
  ) :
      null
}
    </div>
  );
};

export default DescuentosEvento;