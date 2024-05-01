import { program } from 'commander';
import Contacts from './contacts.js';
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const contactsList = await Contacts.listContacts();
			console.table(contactsList);
			break;

		case 'get':
			const contactById = await Contacts.getContactById(id);
			console.log(contactById);
			break;

		case 'add':
			const newContact = await Contacts.addContact({ name, email, phone });
			console.log(newContact);
			break;

		case 'remove':
			const removedContact = await Contacts.removeContact(id);
			console.log(removedContact);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

invokeAction(options);
