import React from 'react';
import './Form.css';
import Button from '../button/Button';

export default function Form(props) {
  const { children, handleSubmit, clearForm } = props;
  return (
    <div className="wrapper">
      <h1 className="header">Создание анкеты</h1>
      <form className="form" onSubmit={handleSubmit}>
        {children}
        <div className="button_wrapper">
          <Button appearance="cancel" onClick={clearForm}>
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
