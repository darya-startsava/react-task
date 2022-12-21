export const ROW = 7;
export const MAX_TEXTAREA_LENGTH = 600;
export const INPUTS_DATA = [
  { key: "name", type: "text", label: 'Имя', placeholder: 'Имя' },
  { key: "surname", type: 'text', label: 'Фамилия', placeholder: 'Фамилия' },
  { key: "birthday", type: 'date', label: 'Дата рождения', placeholder: 'Дата рождения' },
  { key: "phone", type: 'text', label: 'Телефон', placeholder: 'Телефон' },
  { key: 'website', type: 'text', label: 'Сайт', placeholder: 'Сайт' }
];
export const TEXTAREAS_DATA = [
  { key: "about", label: 'О себе', placeholder: 'О себе' },
  { key: "stack", label: 'Стек технологий', placeholder: 'Стек технологий' },
  { key: "project", label: 'Описание последнего проекта', placeholder: 'Описание последнего проекта' }
];

export const EMPTY_FIELD_MESSAGE = 'Поле пустое. Заполните пожалуйста';
export const UPPER_CASE_MESSAGE = 'Первый символ должен быть большой буквой';
export const WEBSITE_MESSAGE= 'Добавьте  https:// в начало адреса сайта';
export const LIMIT_MESSAGE = 'Превышен лимит символов в поле';