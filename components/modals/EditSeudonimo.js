import { BlackFacebookIcon, BlackInstagramIcon, BlackTwitterIcon, BlackWhatsappIcon, EyeIcon } from "../Icons/index";
import { AddPerfilImg } from "../formularios/Inputs/AddPerfilImg";
import { Formik, Form } from "formik";
import { InputFieldGlobal } from "../formularios/Inputs/InputFieldGlobal"
import { fetchApi,queries } from "../../utils/Fetching";

export const EdicionDeSeudonimo = ({ modal, setModal, user }) => {

  console.log(user?.uid )

  const initialValue = {
    nickName: "",
    facebook: "",
    twitter: "",
    instagram: "",
    whatsapp: "",
  }

  const onsubmit = async(values) =>{
    console.log(values)
    try{
      await fetchApi({
        query: queries.createNickName,
        variables: { ...values, development: "diariocivitas",uid: user?.uid ,nickName:"ediardp" },
        type:"formData"
      });
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <div className="z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden" />
      <div className="backdrop-blur backdrop-filter bg-gray-919EAB opacity-10 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />

      <div
        className=" inset-0 m-auto z-50 bg-white rounded-2xl pt-2.5 md:px-[5px] pb-2.5  flex flex-col gap-2.5 items-center justify-center  md:w-[577px] w-screen h-[680px] md:h-[550px]  fixed "
        style={{
          boxShadow:
            "0px 12px 24px -4px rgba(145, 158, 171, 0.16), 0px 16px 16px 0px rgba(0, 0, 0, 0.25)",
        }}>
        <div
          style={{ font: "600 20px/24px 'Public Sans', sans-serif" }}
          className="flex flex-col md:flex-row  gap-2 items-center  shrink-0 relative mt-3">
          <span>
            Editando seudónimo:
          </span>
          <span
            style={{ font: "var(--body-1, 400 16px/24px 'Public Sans', sans-serif)" }}
          >
            Admin [Admin]
          </span>
        </div>
        <Formik
          onSubmit={onsubmit}
          initialValues={initialValue}
        >
          <Form>
            <div className="p-2 flex flex-col gap-4 md:items-start items-center md:justify-start shrink-0 relative">
              <div className="flex md:flex-row flex-col  items-center gap-2.5 shrink-0 *relative">
                <AddPerfilImg />
                <div className="flex flex-col gap-2 shrink-0  relative">
                  <div
                    className="text-color-gray-1 text-left relative"
                    style={{
                      font: "var(--subtitle-2, 600 14px/22px 'Public Sans', sans-serif)",
                    }}>
                    Ingresa tu seudonimo
                  </div>
                  <div className="flex flex-row gap-4 items-start justify-start shrink-0 md:w-[260px] h-14 relative">
                    {/*  <input placeholder="Pedro Gonzales" className=" pl-2 focus:outline-none rounded-lg border-solid border-_14-others-button-input border flex-1 h-14 relative" /> */}
                    <InputFieldGlobal
                      name="nickName"
                      className="focus:outline-none w-full border border-solid rounded-lg py-1 px-3 truncate "
                      placeholder="Pedro Gonzales"
                    />
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
                  <InputFieldGlobal
                    name="facebook"
                    className="focus:outline-none w-full border border-solid rounded-md h-8 pl-2 pr-1 w-[250px] truncate "
                    placeholder="www.facebook.com/pgonza"
                  />
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
                  <InputFieldGlobal
                    name="instagram"
                    className="focus:outline-none w-full border border-solid rounded-md h-8 pl-2 pr-1 w-[250px] truncate "
                    placeholder="www.instagram.com/pgonza"
                  />
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
                  <InputFieldGlobal
                    name="twitter"
                    className="focus:outline-none w-full border border-solid rounded-md h-8 pl-2 pr-1 w-[250px] truncate "
                    placeholder="www.twitter.com/pgonza"
                  />
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
                  <InputFieldGlobal
                    name="whatsapp"
                    className="focus:outline-none w-full border border-solid rounded-md h-8 pl-2 pr-1 w-[250px] truncate "
                    placeholder="www.whatsapp.com/pgonza"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 relative">
                <div className="flex flex-row gap-[9px] items-center justify-end shrink-0 md:w-[525px] relative">
                  <div
                    className="flex-1"
                    style={{ font: "700 14px/22px 'Public Sans', sans-serif" }}>
                    Comentarios
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 relative">
                  <div className="flex flex-row gap-2.5 items-center justify-center shrink-0 relative">
                    <input type="checkbox" className="cursor-pointer" />
                    <div
                      style={{
                        font: "var(--body-2, 400 14px/22px 'Public Sans', sans-serif)",
                      }}>
                      Permitir comentarios
                    </div>
                  </div>
                  <div className="flex flex-row gap-2.5 items-center justify-center shrink-0 relative">
                    <input type="checkbox" className="cursor-pointer" />
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
                <button
                  type="submit"
                  className="text-white text-center relative flex items-center justify-center cursor-pointer"
                  style={{
                    font: "var(--_01-button-02-medium, 700 14px/24px 'Public Sans', sans-serif)",
                  }}>
                  Guardar
                </button>
              </div>
              <div
                style={{ font: "var(--_01-button-02-medium, 700 14px/24px 'Public Sans', sans-serif)" }}
                onClick={() => setModal(!modal)} className="cursor-pointer rounded-lg border-solid border pt-1.5 pr-4 pb-1.5 pl-4 shrink-0 ">
                Cancelar
              </div>
            </div>

          </Form>
        </Formik>

      </div>
    </>

  );
};
