import { FC } from "react";
import Componente1CE from "./Componente1CE";
import ModoDemo from "../Principal/ModoDemo";
import { useRouter } from 'next/router';
interface props {
  componentState: any;
  setComponentState: any;

}

const InicioCE: FC <props> = ({componentState,setComponentState}) => {
  const router = useRouter()
  return (
    <div className="w-[100%] h-[90vh] flex flex-col items-center justify-start overflow-auto py-[30px] px-5 box-border gap-[37px]">

      <div className="flex items-center justify-center">
        <ModoDemo />
      </div>

     
      <div className="self-stretch gap-4 flex flex-row items-start justify-between box-border">
        <div className="flex flex-row items-center justify-center gap-3">
                  <div onClick={() => { router.push("/events/tiketing") }}

                    className="cursor-pointer">

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
          <div className="w-auto flex flex-col items-start justify-start">
            <div className=" flex flex-col items-start justify-start">
              <div className="w-[171px] h-[31.5px] relative leading-[31.5px] font-semibold inline-block">
                Crear evento
              </div>
            </div>
          </div>
          </div>
          
      </div>
      <Componente1CE componentState={componentState} setComponentState={setComponentState}/>
    </div>
  );
};

export default InicioCE;
