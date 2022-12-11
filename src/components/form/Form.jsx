import React from "react";
import InputText from "../inputText/InputText";
import InputDate from "../inputDate/InputDate";
import Textarea from "../textarea/Textarea";
import { ROW } from "../../constants";
import './Form.css';
import Button from "../button/Button";


export default class Form extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h1 className='header'>Создание анкеты</h1>
        <form className="form">
          <InputText label={"Имя"} placeholder={"Имя"} />
          <InputText label={"Фамилия"} placeholder={"Фамилия"} />
          <InputDate label={"Дата рождения"} placeholder={"Дата рождения"} />
          <InputText label={"Телефон"} placeholder={"Телефон"} />
          <InputText label={"Сайт"} placeholder={"Сайт"} />
          <Textarea label={"О себе"} placeholder={"О себе"} rows={ROW} />
          <Textarea label={"Стек технологий"} placeholder={"Стек технологий"} rows={ROW} />
          <Textarea label={"Описание последнего проекта"} placeholder={"Описание последнего проекта"} rows={ROW} />
          <div className="button_wrapper">
            <Button appearance="cancel">Отмена</Button>
            <Button appearance="save">Сохранить</Button>
          </div>
        </form>
      </div>
    );
  }
}