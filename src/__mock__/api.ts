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
      },
    ];
});

// TO POST ONE CONTACT
mock.onPost("/contact").reply((config) => {
  contacts.push(JSON.parse(config.data));

  return [
    200,
    {
      contacts: contacts,
    },
  ];
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
      },
    ];
});

export default instance;
