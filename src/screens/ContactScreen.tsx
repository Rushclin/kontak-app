import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import CustumInput from "../components/CustumInput";
import { styles } from "./AddContact";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const ContactScreen = () => {
  const [showDialog, setShowDialog] = React.useState(false);

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
            rows={rows}
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
