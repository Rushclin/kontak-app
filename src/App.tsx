import { Container } from "@mui/system";
import React from "react";
import "./App.css";

import ContactScreen from "./screens/ContactScreen";

const App = () => {
  React.useEffect(() => {
    // instance
    //   .post("/contacts", null)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
    // instance
    //   .post("/contact", { id: 1, name: "Takam" })
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.log(error));
    // instance
    //   .get("/contact", { params: { id: 0 } })
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.log(error));
    // instance
    //   .delete("/contact", { params: { id: 0 } })
    //   .then((response) => console.log("APRES SUPPRESSION ", response.data))
    //   .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <ContactScreen />
    </Container>
  );
};

export default App;
