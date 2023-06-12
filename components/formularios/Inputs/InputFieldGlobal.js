
import { useField } from "formik";
import { memo } from "react";
import { Popup } from "../../Popup";

export const InputFieldGlobal = memo(({ className, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="w-[100%]">
      <input placeholder={placeholder} className={className} {...field} {...props} />
      {meta.touched && meta.error && <Popup title={`${meta.error}`} arrow={"top"} />}
    </div>
  );
});
