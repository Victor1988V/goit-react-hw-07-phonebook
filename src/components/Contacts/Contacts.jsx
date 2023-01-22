// import { nanoid } from 'nanoid';
import { ContactItem } from '../ContactItem/ContactItem';
import { StyledUL } from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContactsThunk } from '../../redux/contactsAsyncThunk';

export const Contacts = () => {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  return (
    <>
      {contacts.length !== 0 && (
        <StyledUL>
          {filteredContacts().map(({ name, number, id }) => {
            return <ContactItem key={id} name={name} number={number} id={id} />;
          })}
        </StyledUL>
      )}
    </>
  );
};
