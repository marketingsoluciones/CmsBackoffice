import { Anillos, Baile, Baile2, Brindis, Carro, Cena, Cocteles, Comida, Dividersvg, Fotografo, FuegosArtificiales, Iglesia, Maquillaje, Merienda, Novios, PlusIcon, Salida, SesionFotos, Sol, Torta, Vestido, Dress, Dots } from "../../Icons/index"
import { Form, Formik } from "formik";
import { SubHeader } from "./SubHeader";
import { AddEvent, Description, Duration, GuardarButtom, IconList, Responsable, ResponsableList, SelectIcon, Time, Tips } from ".";
import { Modal } from "../../modals/Modal";
import { useEffect, useState } from "react";
import { InputTime } from "../../formularios/Inputs/InputTime";
import { EventContextProvider } from "../../../context/EventContext";
import { fetchApiEventos, queries } from "../../../utils/Fetching";
import { string } from "yup";

const IconArray = [
  {
    title: "Anillos",
    icon: <Anillos />,
  },
  {
    title: "FuegosArtificiales",
    icon: <FuegosArtificiales />,
  },
  {
    title: "Baile",
    icon: <Baile />,
  },
  {
    title: "Baile2",
    icon: <Baile2 />,
  },
  {
    title: "Brindis",
    icon: <Brindis />,
  },
  {
    title: "Carro",
    icon: <Carro />,
  },
  {
    title: "Cena",
    icon: <Cena />
  },
  {
    title: "Cocteles",
    icon: <Cocteles />,
  },
  {
    title: "Comida",
    icon: <Comida />,
  },
  {
    title: "Fotografo",
    icon: <Fotografo />,
  },
  {
    title: "Iglesia",
    icon: <Iglesia />,
  },
  {
    title: "Maquillaje",
    icon: <Maquillaje />,
  },
  {
    title: "Merienda",
    icon: <Merienda />,
  },
  {
    title: "Novios",
    icon: <Novios />,
  },
  {
    title: "Salida",
    icon: <Salida />,
  },
  {
    title: "SesionFotos",
    icon: <SesionFotos />,
  },
  {
    title: "Sol",
    icon: <Sol />,
  },
  {
    title: "Torta",
    icon: <Torta />,
  },
  {
    title: "Vestido",
    icon: <Vestido />,
  },
  {
    title: "Dress",
    icon: <Dress />,
  },
]

const ResponsablesArry = [
  {
    icon: "/rol_Decorador.png",
    title: "Decorador",
  },
  {
    icon: "/rol_Fotografo.png",
    title: "Fotográfor",
  },
  {
    icon: "/rol_Catering.png",
    title: "Catering",
  },
  {
    icon: "/rol_Musica.png",
    title: "Música",
  },
  {
    icon: "/rol_Maquillista.png",
    title: "Maquillista",
  },
  {
    icon: "/rol_novio.png",
    title: "Oficiante",
  },
]

export const Task = ({ itinerario, task, date }) => {
  const [openIcon, setOpenIcon] = useState(false)
  const resultadoIcon = IconArray.find((Icon) => Icon.id == selectIcon);
  const [selectIcon, setSelectIcon] = useState(null)
  const [openResponsableList, setOpenResponsableList] = useState(false)
  const { event, setEvent } = EventContextProvider()

  const initialValues = {
    icon: !task?.icon ? "" : task?.icon,
    time: !task?.hora ? "" : task?.hora,
    duration: !task?.duracion ? "30" : task?.duracion,
    descripction: !task?.descripction ? "" : task?.descripction,
    responsible: !task?.responsible ? "" : task?.responsible,
    tips: !task?.tips ? "" : task?.tips,
  }

  const handleBlurData = async (variable, valor) => {
    try {
      const result = await fetchApiEventos({
        query: queries.editTask,
        variables: {
          eventID: event._id,
          itinerarioID: itinerario._id,
          taskID: task._id,
          variable,
          valor
        }
      })
      setEvent((old) => {
        const f1 = old.itinerarios_array.findIndex(elem => elem._id === itinerario._id)
        const f2 = old.itinerarios_array[f1].tasks.findIndex(elem => elem._id === task._id)
        old.itinerarios_array[f1].tasks[f2][`${variable}`] = valor
        return { ...old }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik  >
      {({ values, setValues }) => {
        return (
          <Form>
            <AutoFormik values={values} itinerario={itinerario} initialValues={initialValues} setValues={setValues} />
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center justify-center md:px-20 lg:px-20 2xl:px-56 py-1" >
              <div className="flex lg:col-span-7 justify-end">
                <SelectIcon openIcon={openIcon} setOpenIcon={setOpenIcon} resultadoIcon={resultadoIcon} />
                <div className="flex flex-col justify-center">
                  <InputTime name="time" onBlur={() => { handleBlurData("hora", values.time) }} />
                  <Duration name="duration"  onBlur={() => { handleBlurData("duracion", values.duration.toString()) }} />
                </div>
                <Description name="descripction" onBlur={() => { handleBlurData("descripcion", values.descripction) }} />
                <Responsable openModal={openResponsableList} setOpenModal={setOpenResponsableList} />
              </div>
              <div className="flex lg:col-span-5">
                <Tips name="tips" onBlur={() => { handleBlurData("tips", values.tips) }} />
              </div>
              {openIcon
                ? <Modal openIcon={openIcon} setOpenIcon={setOpenIcon} classe={"h-max md:w-[30%]"} >
                  <IconList IterArry={IconArray} openIcon={openIcon} setOpenIcon={setOpenIcon} setSelectIcon={setSelectIcon} />
                </Modal>
                : null
              }
              {
                openResponsableList
                  ? <Modal openIcon={openResponsableList} setOpenIcon={setOpenResponsableList} classe={"h-max w-[16%]"} >
                    <ResponsableList DataArry={ResponsablesArry} openModal={openResponsableList} setOpenModal={setOpenResponsableList} />
                  </Modal>
                  : null
              }
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

const AutoFormik = ({ itinerario, initialValues, setValues }) => {
  useEffect(() => {
    setValues(initialValues)
  }, [itinerario])
  return (null)
}