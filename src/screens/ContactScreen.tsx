import styled from "@emotion/styled";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Stack } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  renderActionsCell,
} from "@mui/x-data-grid";
import React from "react";
import CustumInput from "../components/CustumInput";
import instance from "../__mock__/api";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 10 },
  { field: "nom", headerName: "NOM", width: 200 },
  { field: "prenom", headerName: "PRENOM", width: 200 },
  { field: "email", headerName: "EMAIL", width: 250 },
  {
    field: "actions",
    headerName: "ACTIONS",
    renderCell: (params) => {
      return (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <IconButton
            aria-label="show"
            onClick={() => console.log("yui", params?.row?.id)}
          >
            <VisibilityIcon fontSize="small" color="primary" />
          </IconButton>
          <IconButton aria-label="delete" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ButtonGroup>
      );
    },
  },
];

const ContactScreen = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    instance
      .get("/contacts")
      .then((response) => {
        setContacts(response.data?.contacts);
      })
      .catch((error) => console.log(error));
  }, []);

  const [contact, setContact] = React.useState({
    nom: "",
    prenom: "",
    email: "",
    naissance: undefined,
    pere: undefined,
    mere: undefined,
  });

  const handleChange = (e: any) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#ccc",
          maxWidth: "80%",
          marginTop: "20px",
          textAlign: "center",
          padding: "20px",
          borderRadius: "7px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" fontWeight={800}>
            Kontak.
          </Typography>
          <Button variant="contained" onClick={() => setShowDialog(true)}>
            New contact
          </Button>
        </Stack>
        <Divider light />

        <Box
          sx={{
            height: "390px",
          }}
        >
          <DataGrid
            rows={contacts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
          />
        </Box>
      </Box>

      <Dialog
        fullWidth={true}
        open={showDialog}
        onClose={() => setShowDialog(false)}
        sx={{ width: "100%" }}
      >
        <DialogTitle>Creer un contact</DialogTitle>
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
          />
          <CustumInput
            value={contact.prenom}
            id="prenom"
            label="Prenom"
            type="text"
            name="prenom"
            onChangeText={handleChange}
          />
          <CustumInput
            value={contact.naissance}
            id="naissance"
            label="Date de naissance"
            type="date"
            name="date"
            onChangeText={handleChange}
          />
          <CustumInput
            value={contact.email}
            id="email"
            label="Email"
            type="email"
            name="email"
            onChangeText={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setShowDialog(false)}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowDialog(false)}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ContactScreen;
