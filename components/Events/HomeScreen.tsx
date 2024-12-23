import { FC } from "react";
import ModoDemo from "../NuevoEvento/Principal/ModoDemo";
import { ButtonEvents } from "./ButtonEvents";
import { useRouter } from "next/router";


export const HomeScreen: FC = () => {
  const router = useRouter()

  const DataEventos = [
    {
      img: "ModuloEvento/frame-481889@2x.png",
      title: "Bodas"
    },
    {
      img: "ModuloEvento/frame-4818891@2x.png",
      title: "Cumpleaños"
    },
    {
      img: "ModuloEvento/frame-4818892@2x.png",
      title: "Baby Shower"
    },
    {
      img: "ModuloEvento/frame-4818893@2x.png",
      title: "Despedidas"
    },
    {
      img: "ModuloEvento/frame-4818894@2x.png",
      title: "Bautizos"
    },
    {
      img: "ModuloEvento/frame-4818895@2x.png",
      title: "Comunión"
    },
  ]

  return (
    <div className="w-[100%] h-[100vh] flex flex-col bg-whitesmoke-100 items-center justify-start overflow-auto py-6 px-6 box-border gap-[20px] text-center text-xl text-slategray-300 font-poppins">

      <div className="flex items-center justify-center">
        <ModoDemo />
      </div>

      {/* seccion 1 */}
      <div className="rounded-md bg-white w-[100%]  flex flex-col items-center justify-center py-6 px-10 box-border text-base">

        <p>
          Estás a un paso de lograr los mejores eventos. Genera experiencias de impacto para tus usuarios con nuestras herramientas y funciones profesionales.
        </p>
        <p>
          Es la plataforma que buscas para ser creativo y llevar con rigurosidad  tu evento.
        </p>

      </div>

      {/* Seccion 2 */}
      <div className="rounded-md bg-white w-[100%]  flex flex-col items-center justify-center py-[20px] px-[16px] box-border">
        <div className="flex md:flex-row flex-col  items-center justify-center gap-[20px]">
          <div className="flex flex-col  items-center justify-center gap-[10px]">
            <img
              className="relative w-[65.1px] h-[61.3px]"
              alt=""
              src="ModuloEvento/group-2336.svg"
            />
            <div className="relative flex items-center w-[206px]">
              <span className="w-full">
                <p className="m-0 leading-[30px] font-semibold">
                  Eventos Sociales
                </p>
                <p className="m-0 text-sm leading-[25px]">
                  Organiza eventos sociales o familiares como profesional.
                </p>
              </span>
            </div>
            <ButtonEvents text="¡Comienza Ahora!" onClick={() => { router.push("/events/social") }} />
          </div>
          <div className="flex md:flex-row flex-wrap  items-start justify-center gap-[12px] text-sm text-white ">
            {
              DataEventos.map((item, idx) => {
                return (
                  <div key={idx} className="relative w-[120px] h-[120px] ">
                    <img
                      className="absolute top-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
                      alt=""
                      src={item.img}
                    />
                    <div className="absolute top-[calc(50%_-_19px)] left-[calc(50%_-_60px)] leading-[30px] font-semibold flex items-center justify-center w-[120px]">
                      {item.title}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      {/* seccion 3 */}
      <div className="rounded-md w-[100%] bg-white flex flex-col items-center justify-start py-[20px] px-[16px] border-[2px] border-solid border-rosa">
        <div className=" flex md:flex-row flex-col md:items-start items-center md:justify-start justify-center gap-[60px]">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <img
              className="relative w-[77px] h-[77px] overflow-hidden shrink-0"
              alt=""
              src="ModuloEvento/heroiconsticket.svg"
            />
            <div className="relative flex items-center w-[206px]">
              <span className="w-full">
                <p className="m-0 leading-[30px] font-semibold">
                  Eventos con Tiketing
                </p>
                <p className="m-0 text-sm leading-[25px]">
                  Aumenta tus ganancias. Vende tus entradas sin intermediarios.
                </p>
              </span>
            </div>
            <ButtonEvents text="¡Comienza Ahora!" onClick={() => { router.push("/events/tiketing") }} />
          </div>
          <div className="h-auto flex md:flex-row flex-col  items-center justify-start gap-[20px] text-left text-base">
            <div className="flex flex-col items-end justify-start gap-[16px]">
              <div className="flex flex-row items-start justify-start gap-[10px]">
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="ModuloEvento/banquete@2x.png"
                />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative leading-[30px] font-semibold flex items-center w-[195px] h-[29px] shrink-0">
                    Restaurantes y Hoteles
                  </div>
                  <div className="relative text-xs leading-[20px] flex items-center w-[191px] h-14 shrink-0">
                    Ofrece a tus clientes el mejor servicio de reservas online
                    con nuestro sistema.
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[9px]">
                <img
                  className="relative w-[29px] h-[29px] overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="ModuloEvento/charmwififair@2x.png"
                />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative leading-[30px] font-semibold flex items-center w-[195px] h-[29px] shrink-0">
                    Ferias y Congresos
                  </div>
                  <div className="relative text-xs leading-[20px] flex items-center w-[191px] h-14 shrink-0">
                    Organiza a tus asistentes y visitantes con nuestro motor de
                    reservas online.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-start gap-[16px]">
              <div className="flex flex-row items-start justify-start gap-[5px]">
                <img
                  className="relative w-[29px] h-[29px] overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="ModuloEvento/materialsymbolslightfestivalrounded@2x.png"
                />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative leading-[30px] font-semibold flex items-center w-[195px] h-[29px] shrink-0">
                    Festivales
                  </div>
                  <div className="relative text-xs leading-[20px] flex items-center w-[191px] h-14 shrink-0">
                    Reduce el tiempo de espera en la entrada de tus eventos con
                    asistencia masiva.
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[8px]">
                <img
                  className="relative w-[31px] h-[31px] overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="ModuloEvento/materialsymbolslightbeachaccessoutlinerounded@2x.png"
                />
                <div className="relative w-[195px] h-[88px]">
                  <div className="absolute top-[calc(50%_-_44px)] left-[calc(50%_-_97.5px)] leading-[30px] font-semibold flex items-center w-[195px] h-[29px]">
                    Beach Club
                  </div>
                  <div className="absolute top-[calc(50%_-_18px)] left-[calc(50%_-_97.5px)] text-xs leading-[20px] flex items-center w-[191px] h-[62px]">
                    Lleva todos tus registros de asistencia y consumos en tus
                    espacios de forma coodinada.
                  </div>
                </div>
              </div>
            </div>
            <div className="h-auto flex flex-col items-start justify-start">
              <div className="flex flex-row items-start justify-start gap-[8px]">
                <img
                  className="relative w-[25px] h-[25px] overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="ModuloEvento/mynauimusic@2x.png"
                />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative leading-[30px] font-semibold flex items-center w-[195px] h-[29px] shrink-0">
                    Discotecas
                  </div>
                  <div className="relative text-xs leading-[20px] flex items-center w-[191px] h-[75px] shrink-0">
                    Controla la organización y centraliza las ventas en una
                    misma plataforma en tiempo real.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* seccion 4 */}
      <div className="w-[100%] flex md:flex-row flex-col  md:items-start items-center justify-center gap-[8px]">
        <div className="rounded-lg bg-white h-auto flex flex-col items-center justify-center py-6 md:px-0 px-3 box-border md:min-w-[320px]">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <img
              className="relative w-[105px] h-[93px] object-cover"
              alt=""
              src="ModuloEvento/suscripcion-1-1@2x.png"
            />
            <div className="relative flex items-center w-[290.3px]">
              <span className="w-full">
                <p className="m-0 leading-[30px] font-semibold">Suscripción</p>
                <p className="m-0 text-xs leading-[25px]">
                  Explora todas las opciones para tu beneficio en nuestra
                  plataforma
                </p>
              </span>
            </div>
            <button className="cursor-pointer [border:none] p-2.5 bg-rosa rounded-md h-[30px] flex flex-row items-center justify-center box-border">
              <div className="relative text-base leading-[24px] text-white text-center flex items-center w-[187px] h-[23px] shrink-0">
                <span className="w-full">
                  <b className="font-poppins">¡Registrarme</b>
                  <span className="font-poppins">{` `}</span>
                  <b className="font-poppins">AHORA!</b>
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-white h-auto flex flex-col items-center justify-center py-6 md:px-0 px-3 box-border md:min-w-[320px]">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <img
              className="relative w-[93px] h-[93px] object-cover"
              alt=""
              src="ModuloEvento/ebook-1@2x.png"
            />
            <div className="relative flex items-center w-[290.3px]">
              <span className="w-full">
                <p className="m-0 leading-[30px] font-semibold">eBooks</p>
                <p className="m-0 text-sm leading-[25px]">
                  Encuentra todas las herramientas para crear y gestionar tus
                  eBooks.
                </p>
              </span>
            </div>
            <button className="cursor-pointer [border:none] p-2.5 bg-rosa rounded-md h-[30px] flex flex-row items-center justify-center box-border">
              <b className="relative text-base leading-[24px] flex font-poppins text-white text-center items-center justify-center w-[187px] h-[23px] shrink-0">
                ¡Registrarme AHORA!
              </b>
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-white flex flex-col items-center justify-center py-6 md:px-0 px-3 box-border md:min-w-[320px]">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <img
              className="relative w-[103px] h-[103px] object-cover"
              alt=""
              src="ModuloEvento/reunionenlinea-1@2x.png"
            />
            <div className="relative flex items-center w-[290.3px]">
              <span className="w-full">
                <p className="m-0 leading-[30px] font-semibold">
                  Eventos Online
                </p>
                <p className="m-0 text-sm leading-[25px]">
                  Organiza eventos con calidad profesional sin complicaciones.
                </p>
              </span>
            </div>
            <button className="cursor-pointer [border:none] p-2.5 bg-rosa rounded-md h-[30px] flex flex-row items-center justify-center box-border">
              <b className="relative text-base leading-[24px] flex font-poppins text-white text-center items-center justify-center w-[187px] h-[23px] shrink-0">
                ¡Registrarme AHORA!
              </b>
            </button>
          </div>
        </div>
      </div>

      {/* seccion 5 */}
      <div className="w-[100%]  flex flex-row items-center justify-start py-0 px-[22px] box-border">
        <button className="flex cursor-pointer [border:none] p-0 bg-[transparent] relative gap-2 w-auto h-[23px]">

          <div className="md:text-sm text-xs font-poppins text-rosa text-right">
            Ver todos los eventos disponibles
          </div>
          <img
            className="w-3.5 h-4"
            alt=""
            src="ModuloEvento/img@2x.png"
          />

        </button>
      </div>

    </div>
  );
};

