import { useContext } from "react";
import { FormContext } from "../context/FormContext";

export const useFormContext = () => {
  const {
    formState,
    setTypeForm,
    setDuraForm,
    setEndDateForm,
    setIdForm,
    setNameForm,
    setPositionForm,
    setStartDateForm,
    setEmptyForm,
  } = useContext(FormContext);

  return {
    formState,
    setTypeForm,
    setEndDateForm,
    setIdForm,
    setNameForm,
    setPositionForm,
    setStartDateForm,
    setDuraForm,
    setEmptyForm,
  };
};
