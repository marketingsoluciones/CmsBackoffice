import { Form, Formik } from "formik";
import { Description, Duration, Responsable, ResponsableList, SelectIcon, Tips } from ".";
import { Modal } from "../../modals/Modal";
import { useState } from "react";
import { InputTime } from "../../formularios/Inputs/InputTime";
import { EventContextProvider } from "../../../context/EventContext";
import { fetchApiEventos, queries } from "../../../utils/Fetching";
import { MdOutlineDeleteOutline } from "react-icons/md";



export const Task = ({ itinerario, task }) => {
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

  const deleteTask = async () => {
    try {
      const delet = await fetchApiEventos({
        query: queries.deleteTask,
        variables: {
          eventID: event._id,
          itinerarioID: itinerario._id,
          taskID: task._id,
        }
      })
      setEvent((old) => {
        const f1 = old.itinerarios_array.findIndex(elem => elem._id === itinerario._id)
        const taskArray = old.itinerarios_array[f1].tasks.map(elem => elem._id === task._id ? { ...elem, _id: null} : elem)
        return { ...old, taskArray }

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
                  <Responsable />
                </div>
                <div className="flex lg:col-span-5 items-center">
                  <Tips name="tips" onBlur={() => { handleBlurData("tips", values.tips) }} />
                  <div className="-ml-3" >
                    <MdOutlineDeleteOutline className="w-7 h-auto cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => deleteTask()} />
                  </div>
                </div>
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