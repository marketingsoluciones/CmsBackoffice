import { FC, FunctionComponent, memo } from "react";
import { useRouter } from 'next/router';
interface propsInicioCE {
  componentState: any;
  setComponentState: any;

}

const Component2CE: FC <propsInicioCE> = memo(({componentState,setComponentState}) => {
  const router = useRouter()
  return (
    <div className="self-stretch flex flex-row items-center justify-between py-0 px-5 gap-[20px] text-left text-7xl-3 text-black font-semibold">
      <div className="flex flex-row items-center justify-center gap-[12px]">
        <div className="flex flex-col items-start justify-start">
          <div onClick={() => { router.push("/events/create-event") }} className="cursor-pointer flex flex-row items-start justify-start">
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
        <div className="overflow-hidden flex flex-col items-start justify-start">
          <div className="w-auto h-auto relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq450:text-2xl mq450:leading-[25px]">
            Configurar evento
          </div>
        </div>
      </div>
    </div>
  );
});

export default Component2CE;