import { TextField } from "@mui/material";

const CustumInput = (props: any) => {
  const { value, id, label, type, name, onChangeText } = props;

  return (
    <TextField
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
    />
  );
};

export default CustumInput;
