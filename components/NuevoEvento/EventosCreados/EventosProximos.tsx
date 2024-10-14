import { FC, useState } from "react";
import Card1 from "./CardEvento"
import { Modal } from "../../modals/Modal";
import { Alerta1 } from "../CrearEvento/Modales/AlertaMoDe";
import { useRouter } from 'next/router';
interface propsEventosProximos {
    componentState: any;
    setComponentState: any;
  
  }

const EventosProximos: FC <propsEventosProximos> = ({componentState,setComponentState}) => {
const router = useRouter()
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
      title:"Noche de Divas",
      fecha1:"VIE",
      fecha2:"29",
      fecha3:"NV",
      hora: "20:00 - 02:30",
      image: "https://imagedelivery.net/EfbdVs7eFECYhyroHhep9w/3ac78aef-a237-4dd3-b02a-880d095c6d00/public",
      component: () => { router.push("/events/events-description") },
      
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
    {
      title:"Simposio Médico Nacional",
      fecha1:"MAR",
      fecha2:"29",
      fecha3:"OCT",
      hora: "09:00 - 18:30",
      image: "https://imagedelivery.net/EfbdVs7eFECYhyroHhep9w/6b33d438-f3de-4fb3-6220-b881068d1700/public",
      component: ()=>{setAddAlerta(!addAlerta)},
      
    },

    {
      title:"Tech Summit",
      fecha1:"LUN",
      fecha2:"09",
      fecha3:"JUN",
      hora: "08:00 - 18:30",
      image: "https://imagedelivery.net/EfbdVs7eFECYhyroHhep9w/ec047645-30ce-415e-df39-de39173d7500/public",
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