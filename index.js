import { program } from "commander"; // Імпортуємо з commander функцію програм
import * as contacts from "./contacts.js";

program // Вказуємо опції для виклику команд
  .option("-a, --action <type>", "choose action") // -a скороченна команда для виклику події action
  .option("-i, --id <type>", "user id") // <type> вказуємо що буде передаватись аргумент у вигляді рядка
  .option("-n, --name <type>", "user name") // "user name" описуємо що передає функція
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(); // Перетворюємо масив на обєкт

const argv = program.opts(); // Отримуємо необхідний нам обєкт

// Створюємо функцію яка буде викликати відповідну функцію відповідно до переданої в неї події
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": // Викликає функцію що повертає всі контакти
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get": // Викликає функцію що повертає контакт по id
      const idContact = await contacts.getContactById(id);
      console.log(idContact);
      break;

    case "add": // Викликає функцію що додає контакт та повертає дані доданого контакту
      const addContact = await contacts.addContact(name, email, phone);
      console.log(addContact);
      break;

    case "remove": // Викликає функцію що видаляє контакт по заданому id та повертає дані видаленого контакту
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      // У разі якщо подія не відповідатиме заданим подіям виведе в консоль помилку
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv); // Викликаємо функцію invokeAction і передаємо туди обєкт який отримаємо з консолі
