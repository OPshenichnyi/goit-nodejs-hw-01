import fs from "fs/promises"; // Імпортуємо функцію яка для операцій з файлами
import path from "path"; // Імпортуємо функцію яка
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json"); // Вказуємо шлях до файлу з даними

// Функція повертає весь список контактів
export async function listContacts() {
  const allList = await fs.readFile(contactsPath).then((data) => data);
  return JSON.parse(allList);
}

// Функція повертає контакт по id
export async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
}

// Функція повертає видаляє контакт по id
export async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

// Функція повертає додає контакт до списку контактів
export async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}
