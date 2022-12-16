import React from 'react';
import Input from '../input/Input';
import Textarea from '../textarea/Textarea';
import {
  ROW,
  INPUTS_DATA,
  TEXTAREAS_DATA,
  MAX_TEXTAREA_LENGTH,
  EMPTY_FIELD_MESSAGE,
  UPPER_CASE_MESSAGE,
  WEBSITE_MESSAGE,
  LIMIT_MESSAGE,
} from '../../constants';
import './Form.css';
import Button from '../button/Button';

export default class Form extends React.Component {
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
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeValidation = this.onChangeValidation.bind(this);
    this.onSubmitValidation = this.onSubmitValidation.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value.trim();
    const message = this.onChangeValidation(name, value);
    if (event.target.type === 'textarea') {
      let isValid = true;
      if (value.length > MAX_TEXTAREA_LENGTH || value.length === 0) {
        isValid = false;
      }
      const index = this.state.textareasValidation.findIndex((i) => i.key === name);
      this.setState((state) => {
        return {
          textareasValidation: state.textareasValidation.map((i, ind) => {
            if (ind !== index) {
              return i;
            } else {
              return { ...i, value, message, isValid };
            }
          }),
        };
      });
    }
    const index = this.state.inputsValidation.findIndex((i) => i.key === name);
    this.setState((state) => {
      return {
        inputsValidation: state.inputsValidation.map((i, ind) => {
          if (ind !== index) {
            return i;
          } else {
            return { ...i, value, message };
          }
        }),
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.onSubmitValidation();
    console.log(this.state);
  }

  onSubmitValidation() {
    this.setState((state) => {
      return {
        inputsValidation: state.inputsValidation.map((i) => {
          if (i.value === '') {
            return { ...i, message: EMPTY_FIELD_MESSAGE };
          } else return i;
        }),
        textareasValidation: state.textareasValidation.map((i) => {
          if (i.value === '') {
            return { ...i, message: EMPTY_FIELD_MESSAGE };
          } else return i;
        }),
      };
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
      default:
        return '';
    }
  }

  clearForm() {
    this.setState(this.initialState);
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="header">Создание анкеты</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          {INPUTS_DATA.map((item) => (
            <Input
              key={item.key}
              name={item.key}
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
              onChange={this.handleChange}
              message={this.state.inputsValidation.find((i) => item.key === i.key).message}
              value={this.state.inputsValidation.find((i) => item.key === i.key).value}
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
              message={this.state.textareasValidation.find((i) => item.key === i.key).message}
              isValid={this.state.textareasValidation.find((i) => item.key === i.key).isValid}
              value={this.state.textareasValidation.find((i) => item.key === i.key).value}
            />
          ))}
          <div className="button_wrapper">
            <Button appearance="cancel" onClick={this.clearForm}>
              Отмена
            </Button>
            <Button type="submit" appearance="save">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
