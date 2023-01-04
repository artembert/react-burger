import { ChangeEvent, useCallback, useState } from "react";

export const useForm = <T extends Record<string, string>>(initialState: T) => {
  const [formFields, setFormFields] = useState(initialState);

  const handleFieldChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormFields((current) => ({ ...current, [name]: value }));
  }, []);
  return { formFields, setFormFields, handleFieldChange };
};
