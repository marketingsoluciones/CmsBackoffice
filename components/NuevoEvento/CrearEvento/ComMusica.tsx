import { FC, memo } from "react";
interface propsComMusica {
  componentState: any;
  setComponentState: any;

}


const ComMusica: FC <propsComMusica> = memo(({componentState,setComponentState}) => {

  return (
    <div className="w-full rounded-md bg-white flex flex-col items-center justify-start py-[21px] pr-[18px] pl-[21px] box-border gap-[28px]">
{/*         seccion 1 */}
        <div className="self-stretch flex flex-row items-start justify-start gap-[7px] text-sm max-w-full mq975:flex-wrap">
          <div className="flex flex-col items-start justify-start gap-[7px] min-w-[350px] max-w-full mq450:min-w-full mq975:flex-1">
           
            <div className="w-auto h-[17.5px] relative text-base leading-[17.5px] font-semibold text-black text-left inline-block max-h-[17.5px]">
              Genero musical (Máx 5)
            </div>

            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-5 pl-[25px] whitespace-nowrap">
                <div className="h-6 w-[67px] relative leading-[24px] inline-block">
                  Acid house
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[31px] pl-8">
                
                <div className="h-6 w-[49px] relative leading-[24px] inline-block">
                  Acústico
                </div>

              </div>
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[30px] pl-[31px]">
                <div className="h-6 w-[50px] relative leading-[24px] inline-block">
                  Afrobeat
                </div>
              </div>

            </div>
            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-10 pl-[41px]">
                <div className="h-6 w-[31px] relative leading-[24px] inline-block">
                  Blues
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[43px] pl-11">
                <div className="h-6 w-[25px] relative leading-[24px] inline-block">
                  Chill
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[35px] pl-9">
                <div className="h-6 w-[41px] relative leading-[24px] inline-block">
                  Clásica
                </div>
              </div>

            </div>
            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[39px] pl-10">
                <div className="h-6 w-8 relative leading-[24px] inline-block">
                  Disco
                </div>
              </div>
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[9px] pl-3.5 whitespace-nowrap">
                <div className="h-6 w-[89px] relative leading-[24px] inline-block">
                  Drum and Bass
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[42px] pl-[43px]">
                <div className="h-6 w-[27px] relative leading-[24px] inline-block">
                  EDM
                </div>
              </div>

            </div>

            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              <div className="rounded-6xs bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-8 pl-[33px]">
                <div className="h-6 w-[46px] relative leading-[24px] inline-block">
                  Hip-hop
                </div>
              </div>
              <div className="rounded-6xs bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-11 pl-[45px]">
                <div className="h-6 w-[23px] relative leading-[24px] inline-block">
                  Hits
                </div>
              </div>
              <div className="rounded-6xs bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[37px] pl-[38px]">
                <div className="h-6 w-9 relative leading-[24px] inline-block">
                  House
                </div>
              </div>
            </div>

            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[42px] pl-[43px]">
                <div className="h-6 w-[27px] relative leading-[24px] inline-block">
                  Jazz
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[31px] pl-8">
                <div className="h-6 w-[49px] relative leading-[24px] inline-block">
                  Kizomba
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[41px] pl-[42px]">
                <div className="h-6 w-7 relative leading-[24px] inline-block">
                  Latin
                </div>
              </div>

            </div>
            
            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[39px] pl-10">
                <div className="h-6 w-8 relative leading-[24px] inline-block">
                  Metal
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[33px] pl-[34px]">
                <div className="h-6 w-11 relative leading-[24px] inline-block">
                  Minimal
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[22px] pl-[26px] whitespace-nowrap">
                <div className="h-6 w-[63px] relative leading-[24px] inline-block">
                  Old school
                </div>
              </div>

            </div>

            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-11 pl-[45px]">
                <div className="h-6 w-[23px] relative leading-[24px] inline-block">{`R&B`}</div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[34px] pl-[35px]">
                <div className="h-6 w-[43px] relative leading-[24px] inline-block">
                  Reggae
                </div>
              </div>

              <div className="rounded-6xs bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[25px] pl-[26px]">
                <div className="h-6 w-[61px] relative leading-[24px] inline-block">
                  Reggaeton
                </div>
              </div>

            </div>

            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[41px] pl-[42px]">
                <div className="h-6 w-7 relative leading-[24px] inline-block">
                  Rock
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-10 pl-[41px]">
                <div className="h-6 w-[31px] relative leading-[24px] inline-block">
                  Salsa
                </div>
              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[21px] pl-[26px] whitespace-nowrap">
                <div className="h-6 w-[65px] relative leading-[24px] inline-block">
                  Sing Along
                </div>
              </div>

            </div>
            
            <div className="flex flex-row items-start justify-start gap-[7px] mq450:flex-wrap">
              <div className="flex flex-col items-start justify-start gap-[7px]">
                
                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[19px] pl-6 whitespace-nowrap">
                  <div className="h-6 w-[69px] relative leading-[24px] inline-block">
                    Tech house
                  </div>
                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[18px] pl-[19px]">
                  <div className="h-6 w-[75px] relative leading-[24px] inline-block">
                    Underground
                  </div>
                </div>

              </div>

              <div className="flex flex-col items-start justify-start gap-[7px]">
                
                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[34px] pl-[35px]">
                  <div className="h-6 w-[42px] relative leading-[24px] inline-block">
                    Techno
                  </div>
                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[38px] pl-[39px]">
                  <div className="h-6 w-[35px] relative leading-[24px] inline-block">
                    Urban
                  </div>
                </div>

              </div>

              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-9 pl-[37px]">
                <div className="h-6 w-[39px] relative leading-[24px] inline-block">
                  Trance
                </div>
              </div>

            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[7px] min-w-[396px] max-w-full mq725:min-w-full">
            
            <div className="w-[387px] h-[18px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-left text-smi-3 text-darkslategray-100">
              <div className="h-[17.5px] w-auto relative leading-[17.5px] font-semibold inline-block max-h-[17.5px]">
                Ambiente (Máx 2)
              </div>
            </div>

            <div className="self-stretch flex flex-row items-start justify-center gap-[28px] max-w-full mq725:flex-wrap">
              
              <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-8 pl-[33px]">
                <div className="h-6 w-[46px] relative leading-[24px] inline-block">
                  Bachata
                </div>
              </div>

              <div className="flex-1 flex flex-row items-start justify-center gap-[7px] min-w-[305px] max-w-full mq725:flex-wrap">
                
                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[30px] pl-[31px]">
                  <div className="h-6 w-[51px] relative leading-[24px] inline-block">
                    LGTBIQ+
                  </div>
                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[25px] pl-[26px]">
                  <div className="h-6 w-[61px] relative leading-[24px] inline-block">
                    Alternativo
                  </div>
                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[31px] pl-8">
                  <div className="h-6 w-12 relative leading-[24px] inline-block">
                    Erasmus
                  </div>
                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[19px] pl-5">
                  <div className="h-6 w-[73px] relative leading-[24px] inline-block">
                    Internacional
                  </div>
                </div>

              </div>
            </div>

            <div className="self-stretch flex flex-row items-start justify-center gap-[28px] max-w-full mq725:flex-wrap">
              <div className="flex flex-col items-start justify-start gap-[7px]">
                
                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[37px] pl-[38px]">
                  <div className="h-6 w-9 relative leading-[24px] inline-block">
                    Dance
                  </div>
                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[17px] pl-[21px] whitespace-nowrap">
                  <div className="h-6 w-[73px] relative leading-[24px] inline-block">
                    Hard techno
                  </div>
                </div>

              </div>

              <div className="flex-1 flex flex-row items-start justify-start gap-[7px] min-w-[305px] max-w-full mq450:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start gap-[7px] min-w-[73px]">
                  
                  <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[34px] pl-[35px]">
                    <div className="h-6 w-[43px] relative leading-[24px] inline-block">
                      Selecto
                    </div>
                  </div>

                  <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[37px] pl-[38px]">
                    <div className="h-6 w-9 relative leading-[24px] inline-block">
                      Young
                    </div>
                  </div>

                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[18px] pl-[19px]">
                  <div className="h-6 w-[75px] relative leading-[24px] inline-block">
                    Underground
                  </div>
                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-5 pl-[21px]">
                  <div className="h-6 w-[71px] relative leading-[24px] inline-block">
                    Universitario
                  </div>
                </div>

                <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[38px] pl-[39px]">
                  <div className="h-6 w-[35px] relative leading-[24px] inline-block">
                    Urban
                  </div>
                </div>

              </div>
            </div>

            <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[41px] pl-[42px]">
              <div className="h-6 w-7 relative leading-[24px] inline-block">
                Indie
              </div>
            </div>

            <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-2 pl-[13px] whitespace-nowrap">
              <div className="h-6 w-[91px] relative leading-[24px] inline-block">
                Melodic techno
              </div>
            </div>

            <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-11 pl-[45px]">
              <div className="h-6 w-[22px] relative leading-[24px] inline-block">
                Pop
              </div>
            </div>

            <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[25px] pl-[26px]">
              <div className="h-6 w-[61px] relative leading-[24px] inline-block">
                Remember
              </div>
            </div>

            <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[43px] pl-11">
              <div className="h-6 w-[25px] relative leading-[24px] inline-block">
                Soul
              </div>
            </div>

            <div className="rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-center py-0 pr-[42px] pl-[43px]">
              <div className="h-6 w-[26px] relative leading-[24px] inline-block">
                Trap
              </div>
            </div>

          </div>
        </div>
{/*         seccion3 */}
        <div className="self-stretch flex flex-col items-start justify-start">
      <div className="self-stretch h-[1.3px] relative box-border border-t-[1.3px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-catskill-white1" />
      <div className="self-stretch flex flex-row items-start justify-center pt-7 px-5 pb-0 z-[1]">
        <button onClick={()=>{ 
                setComponentState(3)
              }}
        className="cursor-pointer [border:none] p-0 bg-[transparent] w-[85px] flex flex-col items-start justify-start">
          <div className="w-full rounded-md bg-rosa box-border flex flex-row items-center justify-center pt-[9.739999771118164px] px-[17px] pb-[9.750001907348633px] max-w-[85.44999694824219px] border-[1px] border-solid border-rosa">
            <div className="flex flex-col items-center justify-start">
              <div className="w-full h-[17.5px] relative text-sm leading-[17.5px] font-semibold text-white text-center inline-block max-h-[17.5px]">
                Guardar
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
{/*         seccion3 */}
        <div className="self-stretch h-[119px] flex flex-col items-start justify-start gap-[9px] max-w-full text-left text-sm text-black">
      <div className="w-auto h-[21px] relative leading-[21px] inline-block">
        Artistas
      </div>
      <div className="flex flex-row items-end justify-start gap-[2px] max-w-full text-2xs-5 text-rosa">
        <div className="h-3.5 w-auto relative leading-[14px] font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-1977x8595-default-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray inline-block">
          {" "}
          Añade artistas para que puedan verlo tus clientes desde las
          aplicaciones de venta
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-row items-start justify-center pt-7 px-5 pb-0 text-center text-smi-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-pickled-bluewood">
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="flex-1 rounded-md flex flex-row items-center justify-center py-2.5 px-[18px] box-border gap-[7px] max-w-[137.91000366210938px]">
            <div className="flex flex-col items-center justify-start font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-1977x8595-default-inter-semi-bold-123">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block max-h-[17.5px]">
                Añadir artista
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>


    
  );
});

export default ComMusica;