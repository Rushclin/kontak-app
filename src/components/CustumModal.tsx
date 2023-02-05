import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
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
    autoCompleteValues,
    onEdit,
    idEdit,
    handleChangePere,
    handleChangeMere,
  } = props;
  const formRef = React.useRef(null);
  console.log(formRef);

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        open={showDialog}
        onClose={() => setShowDialog(false)}
        sx={{ width: "100%" }}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>
          {idEdit >= 0 ? "Modifier le contact" : "Creer un contact"}
        </DialogTitle>
        <ValidatorForm
          ref={formRef}
          onSubmit={(e) => {
            {
              idEdit >= 0 ? onEdit(e) : onSubmit(e);
            }
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
              label=""
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

            <Autocomplete
              disablePortal
              id="pere"
              onInputChange={handleChangePere}
              options={autoCompleteValues.map(
                (value: any) => `${value?.nom} ${value?.prenom}`
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nom du pere"
                  margin="dense"
                  id="pere"
                  name="pere"
                  value={contact.pere}
                  onChange={handleChange}
                />
              )}
            />

            <Autocomplete
              disablePortal
              options={autoCompleteValues.map(
                (value: any) => `${value?.nom} ${value?.prenom}`
              )}
              id="mere"
              inputValue={contact.mere}
              onInputChange={handleChangeMere}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nom de la mere"
                  margin="dense"
                  id="mere"
                  name="mere"
                  value={contact.mere}
                  onChange={handleChange}
                />
              )}
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
              {idEdit >= 0 ? "Modifier" : "Enregistrer"}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </React.Fragment>
  );
};

export default CustumModal;
