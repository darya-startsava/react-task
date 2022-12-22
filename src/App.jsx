import React, { useState } from 'react';
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

function App() {
  const initialData = {
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
  const [data, setData] = useState(initialData);
  const [showForm, setShowForm] = useState(true);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value.trim();
    if (name === 'phone') {
      const index = data.inputsValidation.findIndex((i) => i.key === name);
      const prevValue = data.inputsValidation[index].value;
      value = addMask(value, prevValue);
    }
    const message = onChangeValidation(name, value);
    if (event.target.type === 'textarea') {
      let isValid = true;
      if (value.length > MAX_TEXTAREA_LENGTH || value.length === 0) {
        isValid = false;
      }
      const index = data.textareasValidation.findIndex((i) => i.key === name);
      setData((prevData) => {
        return {
          inputsValidation: prevData.inputsValidation,
          textareasValidation: prevData.textareasValidation.map((i, ind) => {
            if (ind !== index) {
              return i;
            } else {
              return { ...i, value, message, isValid };
            }
          }),
        };
      });
    }

    const index = data.inputsValidation.findIndex((i) => i.key === name);
    setData((prevData) => {
      return {
        inputsValidation: prevData.inputsValidation.map((i, ind) => {
          if (ind !== index) {
            return i;
          } else {
            return { ...i, value, message };
          }
        }),
        textareasValidation: prevData.textareasValidation,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitValidation();
  }

  function onSubmitValidation() {
    let isValidForm = true;
    setData((prevData) => {
      return {
        inputsValidation: prevData.inputsValidation.map((i) => {
          if (i.value === '') {
            isValidForm = false;
            return { ...i, message: EMPTY_FIELD_MESSAGE };
          } else return i;
        }),
        textareasValidation: prevData.textareasValidation.map((i) => {
          if (i.value === '') {
            isValidForm = false;
            return { ...i, message: EMPTY_FIELD_MESSAGE };
          } else return i;
        }),
      };
    });

    data.textareasValidation.forEach((i) => {
      if (!i.isValid) {
        isValidForm = false;
      }
    });
    data.inputsValidation.forEach((i) => {
      if (i.message) {
        isValidForm = false;
      }
    });
    setShowForm(!isValidForm);
  }

  function onChangeValidation(name, value) {
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

  function clearForm(event) {
    event.preventDefault();
    setData(initialData);
    setShowForm(true);
  }

  return (
    <>
      {showForm ? (
        <Form handleSubmit={handleSubmit} clearForm={clearForm}>
          {INPUTS_DATA.map((item) => (
            <Input
              key={item.key}
              name={item.key}
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
              onChange={handleChange}
              message={data.inputsValidation.find((i) => item.key === i.key).message}
              value={data.inputsValidation.find((i) => item.key === i.key).value}
            />
          ))}
          {TEXTAREAS_DATA.map((item) => (
            <Textarea
              key={item.key}
              name={item.key}
              label={item.label}
              placeholder={item.placeholder}
              rows={ROW}
              onChange={handleChange}
              message={data.textareasValidation.find((i) => item.key === i.key).message}
              isValid={data.textareasValidation.find((i) => item.key === i.key).isValid}
              value={data.textareasValidation.find((i) => item.key === i.key).value}
            />
          ))}
        </Form>
      ) : (
        <Content data={data} />
      )}
    </>
  );
}

export default App;
