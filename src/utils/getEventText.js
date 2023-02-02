const header = 'Інформація про івент';

const contentMap = {
  name: data => `Назва: ${data}`,
  date: data => `Дата: ${data}`,
  location: data => `Місце: ${data}`,
  description: data => `Опис:
   ${data}`,

};

const getEventText = (event) => {
  const content = Object
    .keys(contentMap)
    .map((key) => {
      return event[key] ? contentMap[key](event[key]) : null;
    })
    .filter(content => !!content)
    .join("\n");
  return `${header}
   ${content}
  `;
};

export default getEventText;