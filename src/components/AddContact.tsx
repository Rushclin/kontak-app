import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddContact = (props: any) => {
  const { showDialog, setShowDialog } = props;
  return (
    <div>
      <Dialog open={showDialog} onClose={setShowDialog} sx={{ width: "100%" }}>
        <DialogTitle>Creet un compte</DialogTitle>
        <DialogContent>
          <DialogContentText>Une petite description</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setShowDialog}>Quit</Button>
          <Button onClick={setShowDialog}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddContact;
