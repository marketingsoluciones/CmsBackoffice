import { BodyStaticAPP, CivitasStaticAPP } from "../../utils/schemas";
import MenuFilter from "../MenuFilter";

//componente para visualizar las columnas deacuerdo al esquema 

export const columnsDataTable = ({ slug }) => {

  const options = FindOptionBodas(slug)
  const optionsCivitas = FindOptionCivitas(slug)

  // Verificar si la seleccion no es nula
  if (options) {
    // Construir hiddenColumns a partir de definir los que sí quiero ver
    options.hiddenColumns = options?.schema?.reduce((acc, item) => {
      !options?.visibleColumns?.includes(item?.accessor) &&
        acc?.push(item?.accessor);
      return acc;
    }, []);
    return options;
  } else if (optionsCivitas) {
    optionsCivitas.hiddenColumns = optionsCivitas?.schema?.reduce((acc, item) => {
      !optionsCivitas?.visibleColumns?.includes(item?.accessor) &&
        acc?.push(item?.accessor);
      return acc;
    }, []);
    return optionsCivitas;
  } else {
    return null
  }
};

//Los FaindOption son las funciones para mapear el esquema y definir las columnas

// findOptionBodas funcion map para las columnas de la tabla de Bodasdehoy.com
export const FindOptionBodas = (slug) => {

  //Unificar hijos a un mismo nivel | Sustraer de grupos
  const childrenBodas = BodyStaticAPP.reduce((acc, item) => {
    acc = [...acc, ...item.children, item]
    return acc
  }, [])
  //Seleccionar de acuerdo al slug
  const optionsBodas = childrenBodas.find(item => item.route === slug)
  return optionsBodas
}

// findOptionCivitas funcion map para las columnas de la tabla de Diariocivitas.com
export const FindOptionCivitas = (slug) => {

  const childrenCivitas = CivitasStaticAPP.reduce((acc, item) => {
    acc = [...acc, ...item.children, item]
    return acc
  }, [])

  const optionsCivitas = childrenCivitas.find(item => item.route === slug)
  return optionsCivitas
}