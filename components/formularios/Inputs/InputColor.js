import { Box, Input, Divider } from "@chakra-ui/react";
import { useField } from "formik";
import { memo, useEffect, useRef, useState } from "react";
import { FormLabelMod } from "./FormLabelMod";
import { Popup } from "../../Popup";

export const InputColor = memo(({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [provValue, setProvValue] = useState()
  const inputRef = useRef(null)

  useEffect(() => {
    if (!field?.value) {
      helpers.setValue("#FFFFFF")
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleOnBlur(e)
    }
  };

  const handleOnBlur = (e) => {
    if (provValue?.length === 7) {
      const asd = provValue.slice(1, 7)
      setProvValue(asd)
      helpers.setValue(provValue)
    }
    if (provValue?.length === 6) {
      helpers.setValue(`#${provValue}`)
    }
    setTimeout(() => {
      helpers.setValue(inputRef?.current?.value)
    }, 50);
    setProvValue()
  }

  useEffect(() => {
    if (provValue?.length > 7) {
      setProvValue()
    }
  }, [provValue])

  return (
    <Box >
      <Divider />
      <FormLabelMod>
        <Box gap={"0.3rem"} alignItems={"center"}>
          {label}{" "}
        </Box>
        <div className="inline-flex items-center relative mx-10">
          <Input my={{ base: "0rem", md: "0.3rem" }} variant={"filled"} fontSize={"sm"}
            value={provValue ?? field?.value?.slice(1, 7)} w={"100px"} h={"36px"}
            onKeyDown={handleKeyDown}
            onChange={(e) => setProvValue(e.target.value)}
            onFocus={(e) => { e.target.select() }}
            onBlur={() => handleOnBlur()}
            className="uppercase select-all"
          />
          <label className="absolute left-[5px] translate-y-[1px] text-gray-400 select-none text-[15px]">#</label>
          <input ref={inputRef} id="inputColor" type="color" value={field?.value}
            onChange={(e) => {
              helpers.setValue(e.target.value)
              setProvValue()
            }}
            className="w-6 h-7 absolute right-2 cursor-pointer"
          />
          {meta.touched && meta.error && <Popup title={`${label} ${meta.error} `} arrow={"top"} />}
        </div>
      </FormLabelMod>
    </Box>
  );
});
