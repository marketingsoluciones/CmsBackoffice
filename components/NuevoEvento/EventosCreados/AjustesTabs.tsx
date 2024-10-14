import { FC } from "react";
import Card1 from "./card1";
import { useRouter } from 'next/router';
interface propsAjustesTabs {
    componentState: any;
    setComponentState: any;
  
  }

const AjustesTabs: FC <propsAjustesTabs> = ({componentState,setComponentState}) => {
  const router = useRouter()

  return (

    <div className="w-[100%] flex flex-row items-start justify-center gap-[20px] tracking-[normal] leading-[normal] text-left text-base">
    
    <div className="w-[100%] flex flex-col items-end justify-start gap-2 box-border">

    <div className="w-[100%] flex flex-col items-end justify-start box-border max-w-full mq750:min-w-full">
      
      <div className="w-full self-stretch flex flex-col items-start justify-start pt-0 pb-[7.799999999999272px] pr-5 pl-0">
        <div className="relative leading-[25px] font-semibold inline-block mq750:max-w-full">
          Cuenta de Bodasdehoy.com
        </div>
      </div>

      <div className="w-full self-stretch flex flex-row items-center justify-between box-border gap-[10px] max-w-full text-sm mq450:flex-col mq750:pr-[39px] mq750:box-border">
        
        <Card1
        onClick={() => { router.push("/events/date-bussines") }} 
        icon="/ModuloEvento/a1.svg" 
        title={"Datos del negocio"} 
        content={"Cambia el nombre o la descripción del negocio, modifica los datos de contacto y configura los complementos web disponibles."}
        componentState={componentState}
        setComponentState={setComponentState}
        />
        <Card1 
        onClick={() => { router.push("/events/general-settings") }} 
        icon={"/ModuloEvento/a2.svg"} 
        title={"Ajustes generales"} 
        content={"Configura ciertos parámetros de tu negocio que afectarán directamente al funcionamiento del sistema"}
        componentState={componentState}
        setComponentState={setComponentState}
        />
        
      </div>
    
    </div>

    <div className="w-[100%] flex flex-col items-end justify-start box-border max-w-full mq750:min-w-full">
      
      <div className="w-full self-stretch flex flex-col items-start justify-start pt-0 pb-[7.799999999999272px] pr-5 pl-0">
        <div className="relative leading-[25px] font-semibold inline-block mq750:max-w-full">
        Usuarios y canales de venta externos
        </div>
      </div>

      <div className="w-full self-stretch flex flex-col items-start justify-between box-border gap-[10px] max-w-full text-sm mq450:flex-col mq750:pr-[39px] mq750:box-border">
        <div className="w-full self-stretch flex flex-row items-center justify-between box-border gap-[10px] max-w-full text-sm mq450:flex-col mq750:pr-[39px] mq750:box-border">
        
        <Card1 
        onClick={() => { router.push("/events/users") }} 
        icon="/ModuloEvento/a3.svg" 
        title={"Usuarios"} 
        content={"Gestiona usuarios, equipos y solicitudes a tu negocio."}
        componentState={componentState}
        setComponentState={setComponentState}
        />
        <Card1 
        onClick={() => { router.push("/events/tiketing") }} 
        icon="/ModuloEvento/a4.svg" 
        title={"Permisos"} 
        content={"Asigna roles específicos a tus usuarios y limita acciones e información."}
        componentState={componentState}
        setComponentState={setComponentState}
        />
        </div>
        <Card1 
        onClick={() => { router.push("/events/tiketing") }} 
        icon="/ModuloEvento/a5.svg" 
        title={"Términos y condiciones"} 
        content={"Especifica los términos y condiciones del negocio"}
        componentState={componentState}
        setComponentState={setComponentState}
        />

      </div>
    </div>
    
    <div className="w-[100%] flex flex-col items-end justify-start box-border max-w-full mq750:min-w-full">
      
      <div className="w-full self-stretch flex flex-col items-start justify-start pt-0 pb-[7.799999999999272px] pr-5 pl-0">
        <div className="relative leading-[25px] font-semibold inline-block mq750:max-w-full">
        Ajustes de venta al público
        </div>
      </div>

      <div className="w-full self-stretch flex flex-col items-start justify-between box-border gap-[10px] max-w-full text-sm mq450:flex-col mq750:pr-[39px] mq750:box-border">
        <div className="w-full flex flex-row items-start justify-start gap-[10px] ">
        <Card1 
        onClick={() => { router.push("/events/tiketing") }} 
        icon="/ModuloEvento/a6.svg" 
        title={"Zonas"} 
        content={"Crea las zonas de tu negocio, espacios y tarifas sobre el plano interactivo."}
        componentState={componentState}
        setComponentState={setComponentState}
        />
                <Card1 
                onClick={() => { router.push("/events/tiketing") }} 
        icon="/ModuloEvento/a7.svg" 
        title={"Códigos de descuento"} 
        content={"Configura los códigos de descuento y aplicalos a tantas tarifas como quieras"}
        componentState={componentState}
        setComponentState={setComponentState}
        />
        </div>
        <div className="w-full flex flex-row items-start justify-start gap-[10px] ">
        <Card1 
        onClick={() => { router.push("/events/tiketing") }} 
        icon="/ModuloEvento/a8.svg" 
        title={"Microsite"} 
        content={"Configura el microsite de tu organización."}
        componentState={componentState}
        setComponentState={setComponentState}
        />
        <Card1 
        onClick={() => { router.push("/events/tiketing") }} 
        icon="/ModuloEvento/a9.svg" 
        title={"Plantillas para PDF"} 
        content={"Selecciona una plantilla para los PDF de tus ventas"}
        componentState={componentState}
        setComponentState={setComponentState}
        />
        </div>
        <Card1 
        onClick={() => { router.push("/events/tiketing") }} 
        icon="/ModuloEvento/a10.svg" 
        title={"Etiquetas de ventas"} 
        content={"Configura aquí las etiquetas para tus ventas."}
        componentState={componentState}
        setComponentState={setComponentState}
        />
      </div>
    </div>

    <div className="w-[100%] flex flex-col items-end justify-start box-border max-w-full mq750:min-w-full">
      
      <div className="w-full self-stretch flex flex-col items-start justify-start pt-0 pb-[7.799999999999272px] pr-5 pl-0">
        <div className="relative leading-[25px] font-semibold inline-block mq750:max-w-full">
            Finanzas
        </div>
      </div>

      <div className="w-full self-stretch flex flex-row items-center justify-between box-border gap-[10px] max-w-full text-sm mq450:flex-col mq750:pr-[39px] mq750:box-border">
        
      <Card1
      onClick={() => { router.push("/events/tiketing") }}  
        icon="/ModuloEvento/a11.svg" 
        title={"Monedero"} 
        content={"Visualiza las ventas realizadas por la pasarela de pago."}
        componentState={componentState}
        setComponentState={setComponentState}
        />
            <Card1
            onClick={() => { router.push("/events/tiketing") }} 
        icon="/ModuloEvento/a12.svg" 
        title={"Facturas"} 
        content={"Descarga las facturas de nuestros servicios."}
        componentState={componentState}
        setComponentState={setComponentState}
        />
        
      </div>
    </div>

    </div>


    <div className="w-[30%]  flex flex-col items-start justify-start py-0 px-5 box-border gap-[11px] shrink-0 mq450:min-w-full">
      <div className="self-stretch flex flex-col items-start justify-start pt-0 pb-[0.7999999999992724px] pr-5 pl-0">
        <div className="relative leading-[25px] font-semibold inline-block mq1100:max-w-full">
          Más opciones
        </div>
      </div>
      <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-start justify-start pt-3.5 px-3.5 pb-[31px] text-sm">
       
       <div className="flex flex-row gap-2 items-start justify-start py-[3.5px] px-0">
         <img src="/ModuloEvento/a1,1.svg" alt="" />
         <div className="relative leading-[18px] font-semibold inline-block ">
           Ubicaciones
         </div>
       
     </div>
     <div className="flex flex-col items-start justify-start py-0 pr-5 pl-0 text-xs text-gray-600">
       <div className="relative leading-[14px] inline-block ">
         Configura la ubicación de tu negocio para crear tus primeros
         eventos.
       </div>
     </div>
   </div>
   <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-start justify-start pt-3.5 px-3.5 pb-[31px] text-sm">
       
       <div className="flex flex-row gap-2 items-start justify-start py-[3.5px] px-0">
       <img src="/ModuloEvento/a1,2.svg" alt="" />
         <div className="relative leading-[18px] font-semibold inline-block ">
           Carta QR
         </div>
       
     </div>
     <div className="flex flex-col items-start justify-start py-0 pr-5 pl-0 text-xs text-gray-600">
       <div className="relative leading-[14px] inline-block ">
         Configura la ubicación de tu negocio para crear tus primeros
         eventos.
       </div>
     </div>
   </div>
   <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-start justify-start pt-3.5 px-3.5 pb-[31px] text-sm">
       
       <div className="flex flex-row gap-2 items-start justify-start py-[3.5px] px-0">
       <img src="/ModuloEvento/a1,3.svg" alt="" />
         <div className="relative leading-[18px] font-semibold inline-block ">
           Mis Anfitriones
         </div>
       
     </div>
     <div className="flex flex-col items-start justify-start py-0 pr-5 pl-0 text-xs text-gray-600">
       <div className="relative leading-[14px] inline-block ">
         Configura la ubicación de tu negocio para crear tus primeros
         eventos.
       </div>
     </div>
   </div>
   <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-start justify-start pt-3.5 px-3.5 pb-[31px] text-sm">
       
       <div className="flex flex-row gap-2 items-start justify-start py-[3.5px] px-0">
       <img src="/ModuloEvento/a1,4.svg" alt="" />
         <div className="relative leading-[18px] font-semibold inline-block ">
           Cuentas de retiradas
         </div>
       
     </div>
     <div className="flex flex-col items-start justify-start py-0 pr-5 pl-0 text-xs text-gray-600">
       <div className="relative leading-[14px] inline-block ">
         Configura la ubicación de tu negocio para crear tus primeros
         eventos.
       </div>
     </div>
   </div>

    </div>
  </div>
  );
};

export default AjustesTabs;