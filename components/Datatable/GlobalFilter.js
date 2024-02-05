import { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ setGlobalFilter }) => {
  const [value, setValue] = useState()
  const onChange = useAsyncDebounce(value => {
    return setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input className="bg-transparent focus:outline-none text-sm ml-2" variant={"filled"} value={value} onChange={e => {
      setValue(e.target.value);
      onChange(e.target.value);
    }}
      placeholder={`Buscar...`} />
  )
};

export default GlobalFilter;