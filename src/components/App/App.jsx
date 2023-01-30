import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import useLocalStorage from 'components/LocalStorage/useLocalStorage';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const formSubmitData = (name, number) => {
    const addContact = { id: nanoid(), name, number };

    const isNameExist = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (isNameExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts([...contacts, addContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const visibleContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <Form onData={formSubmitData} />
      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList
        contacts={visibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
