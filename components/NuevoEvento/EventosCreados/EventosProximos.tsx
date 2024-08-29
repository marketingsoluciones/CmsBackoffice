import { FC, useState } from "react";
import Card1 from "./CardEvento"
import { Modal } from "../../modals/Modal";
import { Alerta1 } from "../CrearEvento/Modales/AlertaMoDe";
interface propsEventosProximos {
    componentState: any;
    setComponentState: any;
  
  }

const EventosProximos: FC <propsEventosProximos> = ({componentState,setComponentState}) => {
  const [addAlerta, setAddAlerta] = useState(false);


  const DataEvento = [
    {
      title:"Concierto de Los Iracundos",
      fecha1:"SAB",
      fecha2:"29",
      fecha3:"C/M",
      hora: "00:00 - 07:30",
      image: "ModuloEvento/evento1.jpg",
      component: ()=>{setAddAlerta(!addAlerta)},
    },
    {
      title:"Noche de Divas",
      fecha1:"VIE",
      fecha2:"29",
      fecha3:"NV",
      hora: "29:00 - 02:30",
      image: "ModuloEvento/banner3.svg",
      component: ()=>{setComponentState(7)},
      
    },
    {
      title:"Electric Sunset",
      fecha1:"DO",
      fecha2:"29",
      fecha3:"SEP",
      hora: "16:00 - 02:30",
      image: "ModuloEvento/banner1.svg",
      component: ()=>{setAddAlerta(!addAlerta)},
      
    },
    {
      title:"Simposio Médico Nacional",
      fecha1:"MAR",
      fecha2:"29",
      fecha3:"OCT",
      hora: "09:00 - 18:30",
      image: "ModuloEvento/banner2.svg",
      component: ()=>{setAddAlerta(!addAlerta)},
      
    },

    {
      title:"Tech Summit",
      fecha1:"LUN",
      fecha2:"09",
      fecha3:"JUN",
      hora: "08:00 - 18:30",
      image: "ModuloEvento/banner4.svg",
      component: ()=>{setAddAlerta(!addAlerta)},
      
    },
    
  ]
  

  return (
        <div className="w-auto flex flex-col items-start justify-start gap-[14px]">
          <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block text-left text-sm">
            Disponibles
          </div >
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
/* onClick={() => {setAddUbicacion(!addUbicacion)}} */


    
  );
};

export default EventosProximos;