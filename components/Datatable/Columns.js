import { BodyStaticAPP } from "../../utils/schemas";
import MenuFilter from "../MenuFilter";

//componente para visualizar las columnas deacuerdo al esquema 

export const columnsDataTable = ({ slug, user }) => {

  const options = FindOption(slug)

  // Verificar si la seleccion no es nula
  if (options) {
    const newVisibleColumns = user?.visibleColumns?.reduce((acc, item) => {//options?.visibleColumns?.reduce((acc, item) => {
      item?.show && acc.push(item.accessor)
      return acc
    }, [])
    options.hiddenColumns = options?.schema?.reduce((acc, item) => {
      !newVisibleColumns?.includes(item?.accessor) &&
        acc?.push(item?.accessor);
      return acc;
    }, []);
    return options;
  } else {
    return null
  }
};

//Los FindOption son las funciones para mapear el esquema y definir las columnas

export const FindOption = (slug) => {

  //Unificar hijos a un mismo nivel | Sustraer de grupos
  const children = BodyStaticAPP.reduce((acc, item) => {
    const childrenMap = item.children.map(elem => { return { ...elem, father: item.title } })
    acc = [...acc, ...childrenMap, item]
    return acc
  }, [])
  //Seleccionar de acuerdo al slug
  const options = children.find(item => item.route === slug)
  return options
}
