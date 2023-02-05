import { TextField } from "@mui/material";
import { TextValidator } from "react-material-ui-form-validator";

const CustumInput = (props: any) => {
  const {
    value,
    id,
    label,
    type,
    name,
    onChangeText,
    validators,
    errorMessages,
  } = props;

  return (
    <TextValidator
      autoFocus
      margin="dense"
      id={id}
      label={label}
      type={type}
      fullWidth
      value={value}
      variant="standard"
      name={name}
      onChange={onChangeText}
      validators={validators}
      errorMessages={errorMessages}
      size="small"
    />
  );
};

export default CustumInput;
