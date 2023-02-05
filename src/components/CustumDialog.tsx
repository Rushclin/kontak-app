import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const CustumDialog = (props: any) => {
  const { show, declineAction, acceptAction } = props;
  return (
    <div>
      <Dialog open={show} onClose={declineAction} sx={{ width: "100%" }}>
        <DialogTitle>Suppression du contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment supprimer ce contact ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptAction}>OUI</Button>
          <Button onClick={declineAction}>NON</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustumDialog;
