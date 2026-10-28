import {useState} from 'react';

interface UseFormProps<T> {
  initiaValue: T;
}

function useForm<T>({initiaValue}: UseFormProps<T>) {
  const [values, setValues] = useState(initiaValue);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChangeValue = (name: keyof T, text: string) => {
    setValues(prev => ({...prev, [name]: text}));
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({...prev, [name]: true}));
  };

  // input 공통 props 하나로 묶어서 처리
  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeValue(name, text);
    const onBlur = () => handleBlur(name);

    return {value, onChangeText, onBlur};
  };

  return {values, touched, errors, getTextInputProps};
}

export default useForm;
