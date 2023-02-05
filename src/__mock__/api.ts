import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let contacts: any[] = [];

// CREATE INSTANCE OF AXIOS-MOCK-ADAPTERS
let instance = axios.create({
  timeout: 1000,
});

let mock = new MockAdapter(instance);

// TO GET ALL CONTACTS
mock.onGet("/contacts").reply(200, {
  contacts: contacts,
  status: 200,
});

// TO GET ONE CONTACT
mock.onGet("/contact").reply((config) => {
  const { id } = config.params;
  if (id > contacts.length) {
    return [400];
  } else
    return [
      200,
      {
        contact: contacts.filter((contact) => contact?.id === id),
        status: 200,
      },
    ];
});

// TO POST ONE CONTACT
mock.onPost("/contact").reply((config) => {
  //contacts.push(JSON.parse(config.data))
  let id = contacts.length;
  id++;
  let { data } = config;
  data = JSON.parse(data);
  console.log(data?.params?.contact.nom, "NOMMMMM");
  const checkContact = () => {
    let dec = 0;
    contacts.map((contact) => {
      if (contact.nom.trim() === data?.params?.contact?.nom.trim()) {
        dec = 1;
      }
    });
    return dec === 1;
  };

  if (checkContact())
    return [
      400,
      {
        message: "Contact existant",
        status: 400,
      },
    ];
  else {
    contacts.push(data?.params?.contact);
    return [
      200,
      {
        contacts: contacts,
        status: 200,
      },
    ];
  }
});

// TO DELETE ON CONTACT
mock.onDelete("/contact").reply((config) => {
  const { id } = config.params;
  if (id > contacts.length) return [400];
  else
    return [
      200,
      {
        contacts: contacts.filter((contact) => contact?.id !== id),
        status: 200,
      },
    ];
});

export default instance;
