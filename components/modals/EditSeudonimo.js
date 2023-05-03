import { BlackFacebookIcon, BlackInstagramIcon, BlackTwitterIcon, BlackWhatsappIcon, EyeIcon } from "../Icons/index";
import { AddPerfilImg } from "../formularios/Inputs/AddPerfilImg";

export const EdicionDeSeudonimo = ({ modal, setModal }) => {
  return (
    <>
      <div
        className="bg-white rounded-2xl pt-2.5 pr-[5px] pb-2.5 pl-[5px] flex flex-col gap-2.5 items-center justify-center w-[577px] h-[610px] relative"
        style={{
          boxShadow:
            "0px 12px 24px -4px rgba(145, 158, 171, 0.16), 0px 16px 16px 0px rgba(0, 0, 0, 0.25)",
        }}>
        <div
          style={{ font: "600 20px/24px 'Public Sans', sans-serif" }}
          className="flex flex-row gap-2 items-center  shrink-0 relative mt-3">
          <span>
            Editando seudónimo:
          </span>
          <span
            style={{ font: "var(--body-1, 400 16px/24px 'Public Sans', sans-serif)" }}
          >
            Admin [Admin]
          </span>
        </div>
        <div className="p-2 flex flex-col gap-4 items-start justify-start shrink-0 relative">
          <div className="flex flex-row items-center gap-2.5 shrink-0 relative">
            <AddPerfilImg />
            <div className="flex flex-col gap-2 shrink-0  relative">
              <div
                className="text-color-gray-1 text-left relative"
                style={{
                  font: "var(--subtitle-2, 600 14px/22px 'Public Sans', sans-serif)",
                }}>
                Ingresa tu seudonimo
              </div>
              <div className="flex flex-row gap-4 items-start justify-start shrink-0 w-[260px] h-14 relative">
                <input placeholder="Pedro Gonzales" className=" pl-2 focus:outline-none rounded-lg border-solid border-_14-others-button-input border flex-1 h-14 relative" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 relative">
            <div className="pt-0 pr-[5px] pb-0 pl-[5px] flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden">
              <BlackFacebookIcon />
              <div className="flex flex-row gap-[5px] items-center justify-center shrink-0 relative">
                <div className="pt-px pr-0 pb-px pl-0 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden">
                  <div className="flex flex-row gap-[9px] items-center justify-end shrink-0 relative">
                    <div
                      className="text-gris text-right relative"
                      style={{
                        font: "var(--body-2, 400 14px/22px 'Public Sans', sans-serif)",
                      }}>
                      Publico
                    </div>
                  </div>
                  <EyeIcon />
                </div>
              </div>
              <input placeholder="www.facebook.com/pgonza" className="focus:outline-none pl-2 rounded-lg border-solid border-_14-others-button-input border shrink-0 w-[250px] h-8 relative" />
            </div>
            <div className="pt-0 pr-[5px] pb-0 pl-[5px] flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden">
              <BlackInstagramIcon />
              <div className="flex flex-row gap-[5px] items-center justify-center shrink-0 relative">
                <div className="pt-px pr-0 pb-px pl-0 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden">
                  <div className="flex flex-row gap-[9px] items-center justify-end shrink-0 relative">
                    <div
                      className="text-gris text-right relative"
                      style={{
                        font: "var(--body-2, 400 14px/22px 'Public Sans', sans-serif)",
                      }}>
                      Publico
                    </div>
                  </div>
                  <EyeIcon />
                </div>
              </div>
              <input placeholder="www.instagram.com/pgonza" className="focus:outline-none pl-2 rounded-lg border-solid border-_14-others-button-input border shrink-0 w-[250px] h-8 relative" />
            </div>
            <div className="pt-0 pr-[5px] pb-0 pl-[5px] flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden">
              <BlackTwitterIcon />
              <div className="flex flex-row gap-[5px] items-center justify-center shrink-0 relative">
                <div className="pt-px pr-0 pb-px pl-0 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden">
                  <div className="flex flex-row gap-[9px] items-center justify-end shrink-0 relative">
                    <div
                      className="text-gris text-right relative"
                      style={{
                        font: "var(--body-2, 400 14px/22px 'Public Sans', sans-serif)",
                      }}>
                      Publico
                    </div>
                  </div>
                  <EyeIcon />
                </div>
              </div>
              <input placeholder="www.twitter.com/pgonza" className="focus:outline-none pl-2 rounded-lg border-solid border-_14-others-button-input border shrink-0 w-[250px] h-8 relative" />
            </div>
            <div className="pt-0 pr-[5px] pb-0 pl-[5px] flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden">
              <BlackWhatsappIcon />
              <div className="flex flex-row gap-[5px] items-center justify-center shrink-0 relative">
                <div className="pt-px pr-0 pb-px pl-0 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden">
                  <div className="flex flex-row gap-[9px] items-center justify-end shrink-0 relative">
                    <div
                      className="text-gris text-right relative"
                      style={{
                        font: "var(--body-2, 400 14px/22px 'Public Sans', sans-serif)",
                      }}>
                      Publico
                    </div>
                  </div>
                  <EyeIcon />
                </div>
              </div>
              <input placeholder="www.whatsapp.com/pgonza" className=" focus:outline-none pl-2 rounded-lg border-solid border-_14-others-button-input border shrink-0 w-[250px] h-8 relative" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 relative">
            <div className="flex flex-row gap-[9px] items-center justify-end shrink-0 w-[525px] relative">
              <div
                className="flex-1"
                style={{ font: "700 14px/22px 'Public Sans', sans-serif" }}>
                Comentarios
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 relative">
              <div className="flex flex-row gap-2.5 items-center justify-center shrink-0 relative">
                <input type="checkbox" />
                <div
                  style={{
                    font: "var(--body-2, 400 14px/22px 'Public Sans', sans-serif)",
                  }}>
                  Permitir comentarios
                </div>
              </div>
              <div className="flex flex-row gap-2.5 items-center justify-center shrink-0 relative">
                <input type="checkbox" />
                <div
                  style={{
                    font: "var(--body-2, 400 14px/22px 'Public Sans', sans-serif)",
                  }}>
                  permitir trackbacks y pingbacks en esta pagina
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-row gap-3 items-center justify-end self-stretch shrink-0 h-14 relative">
          <div
            className="bg-green-700 rounded-lg pt-1.5 pr-4 pb-1.5 pl-4 flex flex-row gap-0 items-center justify-center shrink-0 relative"
            style={{
              boxShadow:
                "var(--_01-shadows-color-01-primary-box-shadow, 0px 8px 16px 0px rgba(0, 171, 85, 0.24))",
            }}>
            <div
              className="text-white text-center relative flex items-center justify-center cursor-pointer"
              style={{
                font: "var(--_01-button-02-medium, 700 14px/24px 'Public Sans', sans-serif)",
              }}>
              Guardar
            </div>
          </div>
          <div
            style={{ font: "var(--_01-button-02-medium, 700 14px/24px 'Public Sans', sans-serif)" }}
            onClick={() => setModal(!modal)} className="cursor-pointer rounded-lg border-solid border pt-1.5 pr-4 pb-1.5 pl-4 shrink-0 ">
              Cancelar
          </div>
        </div>
      </div>
    </>

  );
};
