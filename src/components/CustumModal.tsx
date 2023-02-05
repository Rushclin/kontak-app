import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import CustumInput from "./CustumInput";

const CustumModal = (props: any) => {
  const {
    contact,
    showDialog,
    setShowDialog,
    handleChange,
    onClose,
    onSubmit,
  } = props;
  // const {nom, naissance, } = contact
  const formRef = React.useRef(null);

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        open={showDialog}
        onClose={() => setShowDialog(false)}
        sx={{ width: "100%" }}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>Creer un contact</DialogTitle>
        <ValidatorForm
          ref={formRef}
          onSubmit={(e) => {
            onSubmit(e);
          }}
          onError={() => {}}
        >
          <DialogContent>
            <DialogContentText>
              Entrez les informations necessaires
            </DialogContentText>

            <CustumInput
              value={contact.nom}
              id="nom"
              label="Nom"
              type="text"
              name="nom"
              onChangeText={handleChange}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire"]}
            />
            <CustumInput
              value={contact.prenom}
              id="prenom"
              label="Prenom"
              type="text"
              name="prenom"
              onChangeText={handleChange}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire"]}
            />
            <CustumInput
              value={contact.naissance}
              id="naissance"
              label="Date de naissance"
              type="date"
              name="naissance"
              onChangeText={handleChange}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire"]}
            />
            <CustumInput
              value={contact.email}
              id="email"
              label="Email"
              type="email"
              name="email"
              onChangeText={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["Ce champ est obligatoire", "Email non valide"]}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              type="reset"
              color="error"
              onClick={() => {
                onClose();
              }}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {}}
              type="submit"
            >
              Enregistrer
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </React.Fragment>
  );
};

export default CustumModal;