import { FC, FunctionComponent } from "react";
import Dato1 from "./ComDato1";
import ModoDemo from "../Principal/ModoDemo";
import TabComponent from "./TabComponent";
import { useRouter } from 'next/router';
interface propsDatoEvento {
    componentState: any;
    setComponentState: any;
  
  }

const DatoEvento: FC <propsDatoEvento> = ({componentState,setComponentState}) => {
  const router = useRouter()
  return (
    <div className="w-[100%] h-[90vh] flex flex-col items-center justify-start py-[20px] px-[10px] gap-[37px] overflow-auto text-center ">
      

        {/* Alerta Modo demo */}
        <div className="flex items-center justify-center">
        <ModoDemo />
        </div>

        {/* Seccion 2 */}

      <div className="w-[100%] flex flex-row items-start justify-between py-0 px-5 box-border gap-[20px] max-w-full text-left">
        <div className="w-[278px] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border">
          <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-center justify-start py-0 pr-px pl-0">
              
              <div onClick={() => { router.push("/events/configure-event") }}

              className=" cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="w-[37px] h-[37px] rounded-9980xl flex flex-row items-center justify-center pt-[5.369999885559082px] px-[7px] pb-[5.370001792907715px] box-border">
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-row items-start justify-start">
                    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_3756_6172)">
                    <path d="M18.834 29.4502C18.5293 29.721 18.2415 29.721 17.9707 29.4502L7.35742 18.7861C7.05273 18.5153 7.05273 18.2445 7.35742 17.9736L17.9707 7.30957C18.2415 7.03874 18.5293 7.03874 18.834 7.30957L19.8496 8.3252C20.1204 8.59603 20.1204 8.88379 19.8496 9.18848L11.9785 17.0596H29.2949C29.7012 17.0596 29.9043 17.2627 29.9043 17.6689V19.0908C29.9043 19.4971 29.7012 19.7002 29.2949 19.7002H11.9785L19.8496 27.5713C20.1204 27.876 20.1204 28.1637 19.8496 28.4346L18.834 29.4502Z" fill="#1E293B"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_3756_6172">
                    <rect width="22.97" height="26" fill="white" transform="matrix(1 0 0 -1 7.01953 31.3799)"/>
                    </clipPath>
                    </defs>
                    </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[9px] pl-0 ml-[-0.01px]">
                <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                  <div className="w-[214px] h-[31.5px] relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq450:text-2xl mq450:leading-[25px]">
                    Datos del evento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" cursor-pointer flex flex-col items-start justify-start">
          <div className="w-auto rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.25px] px-[9px] pb-[6.250001907348633px] border-[1px] border-slate-200">
            <div className="flex flex-col items-center justify-start pt-[3.75px] px-0 pb-[4.489999771118164px]">
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-[16.3px] w-[15.8px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/ModuloEvento/trespuntos.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Seccion 3 */}
      <div className="w-auto flex flex-col items-start justify-start py-0 pr-[22px] pl-5 gap-6 box-border shrink-0">        

<TabComponent  componentState={componentState} setComponentState={setComponentState} />       
      </div>
    </div>
  );
};

export default DatoEvento;