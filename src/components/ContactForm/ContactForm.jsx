import PropTypes from 'prop-types';
import { Component } from "react";
import css from './ContactForm.module.css';

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    
    handleSubmit = event => {
        event.preventDefault();
        this.props.onAddContact({ ...this.state });
        this.reset();
    };

    reset = () => {
        this.setState({ name: '', number: '' });
    };
    render() {
      return (
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label className={css.label} htmlFor="">
            Name
              <input
                className={css.input}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
          </label>
          <label className={css.label} htmlFor="">
            Number
              <input
                className={css.input}
                type="tel"
                name="number"
                value={this.state.number}
                onChange={this.handleInputChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
          </label>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
        
