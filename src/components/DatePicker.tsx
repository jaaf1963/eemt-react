import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/*
// 1. Crear un componente de campo personalizado para el calendario
const DatePickerField = ({ field, form, ...props }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default DatePickerField;
*/
