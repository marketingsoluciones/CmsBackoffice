
import { useField } from "formik";
import { memo } from "react";

export const InputFieldGlobal = memo(({ className, placeholder, ...props }) => {

  const [field, meta, helpers] = useField(props);

  return (
    <div>
      <input placeholder={placeholder} className={className} {...field} {...props} />
      {meta.touched && meta.error && (
        <span className="text-xs text-red-600">
          {meta.error}
        </span>
      )}
    </div>
  );
});
