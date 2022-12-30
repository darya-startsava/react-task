import React from 'react';
import './Context.css';

export default function Content(props) {
  const { data } = props;
  const information = {};
  data.inputsValidation.forEach((i) => (information[i.key] = i.value));
  data.textareasValidation.forEach((i) => (information[i.key] = i.value));
  const { name, surname, birthday, phone, website, about, stack, project } = information;
  return (
    <div className="content_wrapper">
      <h1 className="content_header">{`${name} ${surname}`}</h1>
      <p className="content_text">
        Дата рождения: <span>{birthday}</span>
      </p>
      <p className="content_text">
        Телефон: <span>{phone}</span>
      </p>
      <p className="content_text">
        Сайт: <span>{website}</span>
      </p>
      <p className="content_text">
        О себе: <span>{about}</span>
      </p>
      <p className="content_text">
        Стек технологий: <span>{stack}</span>
      </p>
      <p className="content_text">
        Описание последнего проекта: <span>{project}</span>
      </p>
    </div>
  );
}
