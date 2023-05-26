import { Checkbox } from "@chakra-ui/react"
import { useField } from "formik";

export const InputCheckBox = ({ name, label }) => {
  const [field, meta, helpers] = useField({ name });
  return (
    <Checkbox
      isChecked={field.value}
      {...field}
      size={"md"} variant={""}
      mt={"0.5rem"}
      alignItems={"start"}
    >
      {label}
    </Checkbox>
  )
}