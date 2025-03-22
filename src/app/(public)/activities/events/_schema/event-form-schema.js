import { isValidPhoneNumber } from "@/lib/utils";
import yup from "@/lib/yup";

export const yogaForHappinessSchema = yup.object().shape({
  type: yup.string().trim().required(),
  name: yup.string().trim().required(),
  phone: yup
    .string()
    .trim()
    .required()
    .test("is-valid-phone-number", "Enter a valid Number!", isValidPhoneNumber),
  gender: yup.string().trim().required(),
  age: yup.string().trim().required(),
  couple_fullname: yup.string().when("registration_type", {
    is: (registration_type) => registration_type === "couple",
    then: (yogaForHappinessSchema) => yogaForHappinessSchema.trim().required(),
    otherwise: (yogaForHappinessSchema) => yogaForHappinessSchema.notRequired(),
  }),
  couple_phone: yup.string().when("registration_type", {
    is: (registration_type) => registration_type === "couple",
    then: (yogaForHappinessSchema) => yogaForHappinessSchema.trim().required().test("is-valid-phone-number", "Enter a valid Number!", isValidPhoneNumber),
    otherwise: (yogaForHappinessSchema) => yogaForHappinessSchema.notRequired(),
  }),
  couple_gender: yup.string().when("registration_type", {
    is: (registration_type) => registration_type === "couple",
    then: (yogaForHappinessSchema) => yogaForHappinessSchema.trim().required(),
    otherwise: (yogaForHappinessSchema) => yogaForHappinessSchema.notRequired(),
  }),
  couple_age: yup.string().when("registration_type", {
    is: (registration_type) => registration_type === "couple",
    then: (yogaForHappinessSchema) => yogaForHappinessSchema.trim().required(),
    otherwise: (yogaForHappinessSchema) => yogaForHappinessSchema.notRequired(),
  }),
  residential_area: yup.string().trim().required(),
  registrar: yup.string().trim().required(),
});

export const folkSessionsSchema = yup.object().shape({
    session_type: yup.string().trim().required(),
    previous_session: yup.mixed().when("session_type", {
        is: (session_type) => session_type > 1,
        then: (folkSessionsSchema) => folkSessionsSchema.required(),
        otherwise: (folkSessionsSchema) => folkSessionsSchema.notRequired()
    }),
    name: yup.string().trim().required(),
    gender: yup.string().trim().required(),
    profession: yup.string().trim().required(),
    profession_name: yup.string().trim().required(),
    folk_guide_name: yup.string().trim().required(),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
})

export const vedicGyanSchema = yup.object().shape({
  name: yup.string().trim().required(),
  phone: yup
    .string()
    .trim()
    .required()
    .test("is-valid-phone-number", "Enter a valid Number!", isValidPhoneNumber),
  gender: yup.string().trim().required(),
  age: yup.string().trim().required(),
  residential_area: yup.string().trim().required(),
  registrar: yup.string().trim().required(),
})

export const sharangatiSchema = yup.object().shape({
  session_type: yup.string().trim().required(),
  name: yup.string().trim().required(),
  phone: yup
    .string()
    .trim()
    .required()
    .test("is-valid-phone-number", "Enter a valid Number!", isValidPhoneNumber),
  gender: yup.string().trim().required(),
  age: yup.string().trim().required(),
  residential_area: yup.string().trim().required(),
  registrar: yup.string().trim().required(),
})

export const icvkSchema = yup.object().shape({
  name: yup.string().trim().required(),
  phone: yup
    .string()
    .trim()
    .required()
    .test("is-valid-phone-number", "Enter a valid Number!", isValidPhoneNumber),
  gender: yup.string().trim().required(),
  age: yup.string().trim().required(),
  residential_area: yup.string().trim().required(),
  registrar: yup.string().trim().required(),
})