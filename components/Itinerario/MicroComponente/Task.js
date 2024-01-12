import { Form, Formik } from "formik";
import { SubHeader } from "./SubHeader";
import { AddEvent, Description, Duration, GuardarButtom, IconList, Responsable, ResponsableList, SelectIcon, Time, Tips } from ".";
import { Modal } from "../../modals/Modal";
import { useEffect, useState } from "react";
import { InputTime } from "../../formularios/Inputs/InputTime";
import { EventContextProvider } from "../../../context/EventContext";
import { fetchApiEventos, queries } from "../../../utils/Fetching";
import { string } from "yup";



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

export const Task = ({ itinerario, task }) => {
  const [openResponsableList, setOpenResponsableList] = useState(false)
  const { event, setEvent } = EventContextProvider()
  const initialValues = {
    icon: !task?.icon ? "" : task?.icon,
    time: !task?.hora ? "" : task?.hora,
    duration: !task?.duracion ? "30" : task?.duracion,
    description: !task?.descripcion ? "" : task?.descripcion,
    responsible: !task?.responsable ? "" : task?.responsable,
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
    <>

      <Formik enableReinitialize initialValues={initialValues} >
        {({ values, }) => {
          return (
            <Form>
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center justify-center md:px-20 lg:px-20 2xl:px-56 py-1" >
                <div className="flex lg:col-span-7 justify-end">
                  <SelectIcon name="icon" handleChange={handleBlurData} />
                  <div className="flex flex-col justify-center">
                    <InputTime name="time" onBlur={() => { handleBlurData("hora", values.time) }} />
                    <Duration name="duration" onBlur={() => { handleBlurData("duracion", values.duration.toString()) }} />
                  </div>
                  <Description name="description" onBlur={() => { handleBlurData("descripcion", values.description) }} />
                  <Responsable openModal={openResponsableList} setOpenModal={setOpenResponsableList} />
                </div>
                <div className="flex lg:col-span-5">
                  <Tips name="tips" onBlur={() => { handleBlurData("tips", values.tips) }} />
                </div>

                {openResponsableList
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
    </>
  )
}

/* const AutoFormik = ({ values }) => {
  useEffect(() => {
    console.log(values.icon)
  }, [values])
  return (null)
} */