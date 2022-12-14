import throttle from 'lodash.throttle';
import localStorageService from './storage';

const refs = { contactForm: document.querySelector('.feedback-form') };
const feedbackFormState = {};

const fillContactFormFields = () => {
  const feedbackFormStateFromLS = localStorageService.load(
    'feedback-form-state'
  );
  if (feedbackFormStateFromLS === undefined) {
    return;
  }

  for (const key in feedbackFormStateFromLS) {
    if (feedbackFormStateFromLS.hasOwnProperty(key)) {
      refs.contactForm.elements[key].value = feedbackFormStateFromLS[key];
      feedbackFormState[key] = feedbackFormStateFromLS[key];
    }
  }
};

fillContactFormFields();

const onFormFieldInput = e => {
  const { target } = e;
  console.log('feedbackFormState ', feedbackFormState);

  feedbackFormState[target.name] = target.value;

  localStorageService.save('feedback-form-state', feedbackFormState);
};

const onFormSubmit = e => {
  e.preventDefault();
  if (refs.contactForm.elements.email.value === '') {
    return;
  }

  const submitObject = {
    email: refs.contactForm.elements.email.value,
    message: refs.contactForm.elements.message.value,
  };

  console.log(submitObject);

  localStorage.removeItem('feedback-form-state');

  refs.contactForm.reset();
};

refs.contactForm.addEventListener('input', throttle(onFormFieldInput, 500));
refs.contactForm.addEventListener('submit', onFormSubmit);
