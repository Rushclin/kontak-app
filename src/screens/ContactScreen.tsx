import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Stack } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import instance from "../__mock__/api";
import CustumModal from "../components/CustumModal";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 20 },
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
  const [error, setError] = React.useState(false);

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
    naissance: "",
    pere: "",
    mere: "",
    id: 0,
  });

  const handleChange = (e: any) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    // setShowDialog(false);
    setContact({
      nom: "",
      prenom: "",
      email: "",
      naissance: "",
      pere: "",
      mere: "",
      id: 0,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setContact((prevState) => ({
      ...prevState,
      id: contacts.length + 1,
    }));

    instance
      .post("/contact", { params: { contact } })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setContacts(response.data?.contacts);
          setContact({
            nom: "",
            prenom: "",
            email: "",
            naissance: "",
            pere: "",
            mere: "",
            id: 0,
          });
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log("ECHEC", error);
        setError(true);
      });
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

      <CustumModal
        contact={contact}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleChange={handleChange}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <Snackbar
        open={error}
        autoHideDuration={6000}
        message="Echec, nom deja pris"
        action={
          <Button
            color="secondary"
            size="small"
            onClick={() => setError(false)}
          >
            COMPRIS
          </Button>
        }
      />
    </React.Fragment>
  );
};

export default ContactScreen;
