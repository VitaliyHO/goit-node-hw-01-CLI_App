const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// // TODO: задокументувати кожну функцію

async function fetchContacts() {
  try {
    const contactsArr = await fs.readFile(contactsPath);
    const parsedContactsArr = JSON.parse(contactsArr);
    return parsedContactsArr;
  } catch (error) {
    console.log(error.message);
  }
};

async function listContacts() {
  try {
    const contactsArr = await fetchContacts();
    console.table(contactsArr);
  } catch (error) {
    console.log(error.message);
  }
};

async function getContactById(contactId) {
  try {
    const contactsArr = await fetchContacts();
    const wantedContact = contactsArr.find((el) => el.id === contactId);
    console.log(wantedContact);
  } catch (error) {
    console.log(error.message);
  }
}

function removeContact(contactId) {
  // ...твій код
}

const addContact = async (id, name, email, phone) => {
  const newContactData = {
    id,
    name,
    email,
    phone,
  };
  try {
    const contactsArr = await fetchContacts();
    contactsArr.push(newContactData);
    const updatedContactsArr = JSON.stringify(contactsArr, null, 4);
    await fs.writeFile(contactsPath, updatedContactsArr);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
