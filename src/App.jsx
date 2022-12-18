import React from 'react';
import Form from './components/form/Form';
import Input from './components/input/Input';
import Textarea from './components/textarea/Textarea';
import {
  ROW,
  INPUTS_DATA,
  TEXTAREAS_DATA,
  MAX_TEXTAREA_LENGTH,
  EMPTY_FIELD_MESSAGE,
  UPPER_CASE_MESSAGE,
  WEBSITE_MESSAGE,
  LIMIT_MESSAGE,
} from './constants';
import Content from './content/Content';
import { addMask } from './utils';

class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      inputsValidation: INPUTS_DATA.map((item) => {
        return {
          key: item.key,
          message: '',
          value: '',
        };
      }),
      textareasValidation: TEXTAREAS_DATA.map((item) => {
        return {
          key: item.key,
          message: '',
          value: '',
          isValid: false,
        };
      }),
    };
    this.state = { data: this.initialState, showForm: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeValidation = this.onChangeValidation.bind(this);
    this.onSubmitValidation = this.onSubmitValidation.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    let value = event.target.value.trim();
    if (name === 'phone') {
      const index = this.state.data.inputsValidation.findIndex((i) => i.key === name);
      const prevValue = this.state.data.inputsValidation[index].value;
      value = addMask(value, prevValue);
    }
    const message = this.onChangeValidation(name, value);
    if (event.target.type === 'textarea') {
      let isValid = true;
      if (value.length > MAX_TEXTAREA_LENGTH || value.length === 0) {
        isValid = false;
      }
      const index = this.state.data.textareasValidation.findIndex((i) => i.key === name);
      this.setState((state) => {
        return {
          data: {
            inputsValidation: state.data.inputsValidation,
            textareasValidation: state.data.textareasValidation.map((i, ind) => {
              if (ind !== index) {
                return i;
              } else {
                return { ...i, value, message, isValid };
              }
            }),
          },
        };
      });
    }
    const index = this.state.data.inputsValidation.findIndex((i) => i.key === name);
    this.setState((state) => {
      return {
        data: {
          inputsValidation: state.data.inputsValidation.map((i, ind) => {
            if (ind !== index) {
              return i;
            } else {
              return { ...i, value, message };
            }
          }),
          textareasValidation: state.data.textareasValidation,
        },
      };
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.onSubmitValidation();
  }

  onSubmitValidation() {
    let isValidForm = true;
    this.setState((state) => {
      return {
        data: {
          inputsValidation: state.data.inputsValidation.map((i) => {
            if (i.value === '') {
              isValidForm = false;
              return { ...i, message: EMPTY_FIELD_MESSAGE };
            } else return i;
          }),
          textareasValidation: state.data.textareasValidation.map((i) => {
            if (i.value === '') {
              isValidForm = false;
              return { ...i, message: EMPTY_FIELD_MESSAGE };
            } else return i;
          }),
        },
      };
    });

    this.state.data.textareasValidation.forEach((i) => {
      if (!i.isValid) {
        isValidForm = false;
      }
    });
    this.state.data.inputsValidation.forEach((i) => {
      if (i.message) {
        isValidForm = false;
      }
    });
    this.setState((state) => {
      return { showForm: !isValidForm };
    });
  }

  onChangeValidation(name, value) {
    switch (name) {
      case 'name':
      case 'surname':
        if (/[А-ЯA-Z]/.test(value[0])) {
          return '';
        }
        if (!value) {
          return EMPTY_FIELD_MESSAGE;
        }
        return UPPER_CASE_MESSAGE;
      case 'website':
        if (!value) {
          return EMPTY_FIELD_MESSAGE;
        }
        if (value.slice(0, 8) === 'https://') {
          return '';
        } else return WEBSITE_MESSAGE;
      case 'about':
      case 'stack':
      case 'project':
        if (value.length <= MAX_TEXTAREA_LENGTH) {
          return `Осталось ${MAX_TEXTAREA_LENGTH - value.length}/${MAX_TEXTAREA_LENGTH} символов`;
        }
        return LIMIT_MESSAGE;
      case 'phone':
        if (!value) {
          return EMPTY_FIELD_MESSAGE;
        }
        return '';
      default:
        return '';
    }
  }

  clearForm(event) {
    event.preventDefault();
    this.setState({ data: this.initialState, showForm: true });
  }

  render() {
    return (
      <>
        {this.state.showForm && (
          <Form handleSubmit={this.handleSubmit} clearForm={this.clearForm}>
            {INPUTS_DATA.map((item) => (
              <Input
                key={item.key}
                name={item.key}
                type={item.type}
                label={item.label}
                placeholder={item.placeholder}
                onChange={this.handleChange}
                message={this.state.data.inputsValidation.find((i) => item.key === i.key).message}
                value={this.state.data.inputsValidation.find((i) => item.key === i.key).value}
              />
            ))}
            {TEXTAREAS_DATA.map((item) => (
              <Textarea
                key={item.key}
                name={item.key}
                label={item.label}
                placeholder={item.placeholder}
                rows={ROW}
                onChange={this.handleChange}
                message={
                  this.state.data.textareasValidation.find((i) => item.key === i.key).message
                }
                isValid={
                  this.state.data.textareasValidation.find((i) => item.key === i.key).isValid
                }
                value={this.state.data.textareasValidation.find((i) => item.key === i.key).value}
              />
            ))}
          </Form>
        )}
        {!this.state.showForm && <Content data={this.state.data} />}
      </>
    );
  }
}

export default App;
