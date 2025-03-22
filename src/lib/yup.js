import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "This is a required field!",
    notType: "Must be a ${type}!"

  },
  string: {
    email: "This must be a valid Email!",
    length: "Must be of length ${length}!",
    url: "This must be a valid URL!"
  },
  number: {
    integer: "Must be an integer!",
    min: "Must be atleast ${min}!",
    max: "Must be atmost ${max}!",
    positive: "Must be a positive number!",
    moreThan: "Must be greater than ${more}"
  },

  array: {
    length: "Must be of length ${length}!",
    min: "Must have atleast ${min} items!",
    max: "Must have atmost ${max} items!"
  }
})


export default yup;