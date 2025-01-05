import { useState } from "react";

export const useFormInput = ({initialValue, onChangeValue}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    onChangeValue(e.target.value);
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};
