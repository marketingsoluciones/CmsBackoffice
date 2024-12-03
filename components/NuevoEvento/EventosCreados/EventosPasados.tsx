import { FC, useState } from "react";
import Card1 from "./CardEvento"
import { Modal } from "../../modals/Modal";
import { Alerta1 } from "../CrearEvento/Modales/AlertaMoDe";
interface propsEventosPasados {
    componentState: any;
    setComponentState: any;
  
  }

const EventosPasados: FC <propsEventosPasados> = ({componentState,setComponentState}) => {
  const [addAlerta, setAddAlerta] = useState(false);
  const DataEvento = [
    {
      title:"Concierto de Los Iracundos",
      fecha1:"SAB",
      fecha2:"29",
      fecha3:"C/M",
      hora: "00:00 - 07:30",
      image: "https://imagedelivery.net/EfbdVs7eFECYhyroHhep9w/056eb590-a8cd-430a-e2a7-a86733134d00/public",
      component: ()=>{setAddAlerta(!addAlerta)},
    },
    {
      title:"Electric Sunset",
      fecha1:"DO",
      fecha2:"29",
      fecha3:"SEP",
      hora: "16:00 - 02:30",
      image: "https://imagedelivery.net/EfbdVs7eFECYhyroHhep9w/074ede13-1071-4f5d-006a-5c18b952fd00/public",
      component: ()=>{setAddAlerta(!addAlerta)},
      
    },
    
  ]
  

  return (
        <div className="w-auto flex flex-col items-start justify-start gap-[14px]">
          <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block text-left text-sm">
            No Disponibles
          </div>
          <div className="flex flex-wrap items-start justify-start gap-4">
          {DataEvento.map((items,idx) => ( 
            <div key={idx} >
          <Card1 items={items} componentState={componentState} setComponentState={setComponentState}/>
          </div>
        ))}
        </div>

{
  addAlerta ? (
      <Modal  
      setOpenIcon="" 
      openIcon="" 
      classe={"w-[26%] h-[36%]"}>

          <Alerta1 addAlerta={addAlerta} setAddAlerta={setAddAlerta} />
      </Modal>
  ) :
      null
}
        </div>
        

    
  );
};

export default EventosPasados;