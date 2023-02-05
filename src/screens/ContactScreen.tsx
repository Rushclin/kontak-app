import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import instance from "../__mock__/api";
import CustumModal from "../components/CustumModal";
import CustumDialog from "../components/CustumDialog";
import EditIcon from "@mui/icons-material/Edit";

const ContactScreen = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [selectID, setSelectID] = React.useState("");
  const [editAction, setEditAction] = React.useState(false);

  React.useEffect(() => {
    instance
      .get("/contacts")
      .then((response) => {
        setContacts(response.data?.contacts);
      })
      .catch((error) => console.log(error));
  }, []);

  /*   React.useEffect(() => {
    if (selectID) {
      instance
        .get("/contact", { params: { id: selectID } })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    }
  }, []); */

  const handleSelect = (id: number) => {
    instance
      .get("/contact", { params: { id: id } })
      .then((response) => {
        const data = response.data.contact;
        setContact(data[0]);
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    instance
      .delete("/contact", { params: { id: selectID } })
      .then((response) => {
        //setContacts(response.data?.contacts);
        //setDeleteDialog(false);

        instance
          .post("/contact/update", { params: { contact } })
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
              });
            } else {
              console.log(response);
            }
          })
          .catch((error) => {
            console.log("ECHEC", error);
            setError(true);
          });
      })
      .catch((error) => {
        console.log(error);
        //setDeleteDialog(false);
      });
  };

  const [contact, setContact] = React.useState({
    nom: "",
    prenom: "",
    email: "",
    naissance: "",
    pere: "",
    mere: "",
  });

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
              onClick={() => {
                handleSelect(params?.row?.id);
                setShowDialog(true);
              }}
            >
              <EditIcon fontSize="small" color="primary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => {
                setSelectID(params.row?.id);
                setDeleteDialog(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  const handleChange = (e: any) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setContact({
      nom: "",
      prenom: "",
      email: "",
      naissance: "",
      pere: "",
      mere: "",
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setContact((prevState) => ({
      ...prevState,
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

  const handledelete = () => {
    instance
      .delete("/contact", { params: { id: selectID } })
      .then((response) => {
        setContacts(response.data?.contacts);
        setDeleteDialog(false);
      })
      .catch((error) => {
        console.log(error);
        setDeleteDialog(false);
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
        autoCompleteValues={contacts}
        onEdit={handleEdit}
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

      <CustumDialog
        show={deleteDialog}
        declineAction={() => setDeleteDialog(false)}
        acceptAction={() => handledelete()}
      />
    </React.Fragment>
  );
};

export default ContactScreen;
