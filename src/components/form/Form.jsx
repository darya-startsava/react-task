import React from 'react';
import Input from '../input/Input';
import Textarea from '../textarea/Textarea';
import { ROW, INPUTS_DATA, TEXTAREAS_DATA } from '../../constants';
import './Form.css';
import Button from '../button/Button';

export default class Form extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h1 className="header">Создание анкеты</h1>
        <form className="form">
          {INPUTS_DATA.map((item) => (
            <Input
              key={item.index}
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
            />
          ))}
          {TEXTAREAS_DATA.map((item) => (
            <Textarea
              key={item.index}
              label={item.label}
              placeholder={item.placeholder}
              rows={ROW}
            />
          ))}
          <div className="button_wrapper">
            <Button appearance="cancel">Отмена</Button>
            <Button appearance="save">Сохранить</Button>
          </div>
        </form>
      </div>
    );
  }
}
