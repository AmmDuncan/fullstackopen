import { useState } from "react";

const useField = (name, type='text') => {
  const [value, setValue] = useState('');
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const reset = () => setValue('')
  return {
    props: {
      name,
      type,
      value,
      onChange
    },
    reset,
  }
}

export default useField;
