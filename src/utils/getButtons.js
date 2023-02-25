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

const mainButtonsMap = {
  name: {
    show: {
      text: "Змінити імʼя",
      callback_data: 'edit_name',
    },
    add: {
      text: "Додати імʼя",
      callback_data: 'add_name',
    },
  },
  date: {
    show: {
      text: "Змінити дату",
      callback_data: 'edit_date',
    },
    add: {
      text: "Додати дату",
      callback_data: 'add_date',
    },
  },
  location: {
    show: {
      text: "Змінити місце",
      callback_data: 'edit_location',
    },
    add: {
      text: "Додати місце",
      callback_data: 'add_location',
    },
  },
  description: {
    show: {
      text: "Змінити опис",
      callback_data: 'edit_description',
    },
    add: {
      text: "Додати опис",
      callback_data: 'add_description',
    },
  },
};

const socialButtonsMap = {
  fb: {
    show: {
      text: "FB посилання",
      callback_data: 'show_fb',
    },
    add: {
      text: "Додати FB посилання",
      callback_data: 'add_fb',
    }
  }
}

/**
 * Check event for all required fields are filled
 * @param eventModel
 * @return {boolean}
 */
const isEventCompleted = (eventModel) => {
  const checkedFields = [
    'name',
    'date',
    'location',
    'description',
    'image'
  ];

  return !(checkedFields
    .map(field => !!eventModel[field])
    .filter(fieldIsset => !fieldIsset)
    .length);
}

const getButtons = (event) => {
  const addButtons = Object
    .keys(mainButtonsMap)
    .map((key) => {
      return event[key] ? [mainButtonsMap[key].show] : [mainButtonsMap[key].add];
    });

  const showButtons = Object
    .keys(showButtonsMap)
    .map((key) => {
      return event[key] ? [showButtonsMap[key]] : null;
    })
    .filter(button => !!button);

  const socialButtons = Object
    .keys(socialButtonsMap)
    .map((key) => {
      return event[key] ? [socialButtonsMap[key].show] : [socialButtonsMap[key].add];
    });

  let resultButtons = [...addButtons, ...showButtons];

  if (isEventCompleted(event)) {
    resultButtons = resultButtons.concat(socialButtons);
  }

  return resultButtons;
};

export default getButtons;

export {buttonsMap};