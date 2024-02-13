import { FunctionComponent } from "react";
import { ArrowLeft } from "../../Icons/index";
import { DataBase } from "../WeddingCustomWebs";

interface propsDescripcionCardEmpresas {
  setPage: any
  page: any
  findData: string
}

export const DescripcionCardEmpresas: FunctionComponent<propsDescripcionCardEmpresas> = ({ setPage, page, findData }) => {

  const FindDataPlantilla = DataBase.find(elm => elm.title === findData)



  return (
    <section className="flex flex-col items-center justify-start gap-[10px]  text-xl text-azulCorporativo h-[calc(100vh-75px)] overflow-y-auto ">
      {/* header */}
      <header className="flex flex-col   text-[32px]  ">
        <div onClick={() => setPage("principal")} className="w-5 h-5  top-2 left-3 text-gray-700 cursor-pointer">
          <ArrowLeft />
        </div>
        <div className="capitalize font-semibold flex items-center md:h-14 text-rosa ">
          Lista de paginas para Empresas
        </div>
        <div className=" flex items-center justify-between text-sm  bg-white px-2 py-3 rounded-[5px] leading-[18px] ">
          Haz que tu red conozca Bodas de Hoy y EventosOrganizador. Recibirán una prueba ampliada de 30 días, y puedes recibir increíbles recompensas.
        </div>
      </header>
      {/* subHeader */}
      <div className=" flex flex-col md:flex-row items-center justify-between w-full space-y-2 md:space-y-0">
        {/* titulo de la plantilla */}
        <div className="flex flex-col items-start justify-start ">
          <div className=" font-semibold  ">
            {FindDataPlantilla.Titulo}
          </div>
          <div className="flex flex-row items-start justify-start gap-[10px] text-xs text-gray">
            <div className="flex flex-row items-start justify-start">
              <b className="relative">Valoraciones</b>
              <div className="flex flex-row items-center justify-start gap-[2px]">
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/weddingPageFotos/favorite--24--outline.svg"
                />
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/weddingPageFotos/favorite--24--outline.svg"
                />
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/weddingPageFotos/favorite--24--outline.svg"
                />
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/weddingPageFotos/favorite--24--outline.svg"
                />
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/weddingPageFotos/favorite--24--outline.svg"
                />
              </div>
            </div>
            <div className="flex flex-row items-start justify-start">
              <b className="relative">
                <span>{`Comentarios: `}</span>
                <span className="text-dodgerblue">37</span>
              </b>
            </div>
          </div>
        </div>
        {/* botones */}
        <div className="flex flex-row items-start justify-start text-center text-sm text-white font-montserrat">
          <div className="flex flex-col items-start justify-start gap-[5px]">
            <button className=" flex items-center justify-center space-x-2  rounded-md bg-rosa w-[330px] h-[35px]">
              <img className="" alt="" src="ImagePlantilla/vector.svg" />
                <b >
                  Añadir al carrito
                </b>
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-black relative rounded-md w-[330px] h-[35px]">
              <img
                className="absolute h-[calc(100%_-_23px)] w-[calc(100%_-_308px)] top-[10px] right-[241.5px] bottom-[13px] left-[66.5px] max-w-full overflow-hidden max-h-full"
                alt=""
                src="ImagePlantilla/img--previsualizacin-en-vivomargin.svg"
              />
              <b className="absolute top-[7.5px] left-[88.3px] text-sm leading-[14px] flex font-montserrat text-white text-left items-center w-[175.8px] h-[17.5px]">
                Previsualización en vivo
              </b>
            </button>
          </div>
        </div>
      </div>
      {/* imagenes */}
      <div className="flex flex-row w-full items-center justify-center p-2.5 gap-[10px] ">
        <img
          className=" rounded-2xl w-[63%] h-[381px]  shrink-0 object-cover "
          alt={FindDataPlantilla.Titulo}
          src={FindDataPlantilla.img1}
        />
        <div className="flex flex-col items-start justify-start gap-[10px]">
          <img
            className="relative rounded-2xl w-80 h-[120px] object-cover"
            alt={FindDataPlantilla.Titulo}
            src={FindDataPlantilla.img2}
          />
          <img
            className="relative rounded-2xl w-80 h-[120px] object-cover"
            alt={FindDataPlantilla.Titulo}
            src={FindDataPlantilla.img3}
          />
          <img
            className="relative rounded-2xl w-80 h-[120px] object-cover"
            alt={FindDataPlantilla.Titulo}
            src={FindDataPlantilla.img4}
          />
        </div>
      </div>
      {/* descripciones */}
      <div className="flex flex-col md:flex-row items-start justify-start p-2.5 gap-[10px] text-[16px] font-segoe-ui">
        <div className=" leading-[26px] md:w-[680px]">
          <p className="">
            {FindDataPlantilla.Descripcion}
          </p>
          <ul className="">
            <li >3 esquemas únicos</li>
            <li >Diseños adaptables</li>
            <li > Formulario de contacto con Google Recapcha</li>
            <li >Fondo de paralaje</li>
            <li>Íconos de fuentes ligeras</li>
          </ul>
        </div>
        <div className="flex flex-row items-start justify-start  box-border text-xs font-montserrat">
          <div className="relative w-[201.5px] h-[173px]">
            <div className="absolute top-[0px] left-[18.5px] flex flex-col items-start justify-start gap-[18px]">
              <div className="flex flex-col items-start justify-start gap-[5px]">
                <div className="relative leading-[16px] font-extrabold flex items-center w-[183px] h-4 shrink-0">
                  Tipos de archivo incluidos
                </div>
                <div className="relative text-smi leading-[16px] font-segoe-ui flex items-center w-[89px] h-4 shrink-0">
                  HTML, CSS, JS.
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[5px]">
                <div className="relative leading-[16px] font-extrabold flex items-center w-[183px] h-4 shrink-0">
                  Adiciones
                </div>
                <div className="relative text-smi leading-[16px] font-segoe-ui flex items-center w-[183px] h-[37px] shrink-0">
                  <span className="w-full">
                    <p className="m-0">Responsivo</p>
                    <p className="m-0">Documentación incluida</p>
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[5px]">
                <div className="relative leading-[16px] font-extrabold flex items-center w-[183px] h-4 shrink-0">
                  Licencia comercial
                </div>
                <div className="relative text-smi [text-decoration:underline] leading-[16px] font-segoe-ui flex items-center w-[161px] h-4 shrink-0">
                  Información adicional
                </div>
              </div>
            </div>
            <div className="absolute top-[0.5px] left-[0px] w-2 h-[142px]">
              <div className="absolute h-[45.07%] top-[0%] bottom-[54.93%] left-[3.5px] bg-rosa w-px" />
              <div className="absolute top-[0px] left-[0px] rounded bg-white box-border w-2 h-2 border-[1px] border-solid border-rosa" />
              <div className="absolute h-[49.3%] top-[45.07%] bottom-[5.63%] left-[3.5px] bg-rosa w-px" />
              <div className="absolute top-[59px] left-[0px] rounded bg-white box-border w-2 h-2 border-[1px] border-solid border-rosa" />
              <div className="absolute top-[134px] left-[0px] rounded bg-white box-border w-2 h-2 border-[1px] border-solid border-rosa" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

