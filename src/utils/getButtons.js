const buttonsMap = {
  name: {
    text: "Додати імʼя",
    callback_data: 'add_name',
  },
  date: {
    text: "Додати дату",
    callback_data: 'add_date',
  },
  location: {
    text: "Додати місце",
    callback_data: 'add_location',
  },
  description: {
    text: "Додати опис",
    callback_data: 'add_description',
  },
  image: {
    text: "Додати зображення",
    callback_data: 'add_image',
  },
};

const showButtonsMap = {
  image: {
    text: "Показати зображення",
    callback_data: 'show_image',
  },
};

const getButtons = (event) => {
  const addButtons = Object
    .keys(buttonsMap)
    .map((key) => {
      return event[key] ? null : [buttonsMap[key]];
    })
    .filter(button => !!button);

  const showButtons = Object
    .keys(showButtonsMap)
    .map((key) => {
      return event[key] ? [showButtonsMap[key]] : null;
    })
    .filter(button => !!button);

  console.log(addButtons);
  console.log(showButtons);
  console.log([...addButtons, ...showButtons]);


  return [...addButtons, ...showButtons];
};

export default getButtons;

export {buttonsMap};