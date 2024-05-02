import * as fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
	const data = await fs.readFile(contactsPath, 'utf8');

	return JSON.parse(data);
}

async function getContactById(id) {
	const contacts = await listContacts();
	const contact = contacts.find(item => item.id === id);

	return contact || null;
}

async function addContact(contact) {
	const contacts = await listContacts();

	const newContact = {
		id: crypto.randomUUID(),
		...contact,
	};

	contacts.push(newContact);
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return newContact;
}

async function removeContact(id) {
	const contacts = await listContacts();

	const index = contacts.findIndex(item => item.id === id);
	if (index === -1) {
		return null;
	}

	const [removedContact] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return removedContact;
}

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
