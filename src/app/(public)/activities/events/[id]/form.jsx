"use client";

import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledPhoneInput } from "@/components/controlled/controlled-phone-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  BsEnvelope as EmailIcon,
  BsInstagram as InstagramIcon,
  BsWhatsapp as WhatsappIcon,
  BsYoutube as YoutubeIcon,
} from "react-icons/bs";

import { ControlledLabeledCheckbox } from "@/components/controlled/controlled-labeled-checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { convertFileToBase64, formatIndianCurrency } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useSubmitMutation } from "../_hooks/use-submit-mutation";
import {
  folkSessionsSchema,
  icvkSchema,
  sharangatiSchema,
  vedicGyanSchema,
  yogaForHappinessSchema,
} from "../_schema/event-form-schema";
import { Component } from "lucide-react";
import { ControlledRadios } from "@/components/controlled/controlled-radios";

const eventSchemas = {
  "yoga-for-happiness": yogaForHappinessSchema,
  "folk-sessions": folkSessionsSchema,
  "vedic-gyan": vedicGyanSchema,
  "sharanagati": sharangatiSchema,
  "indian-cultural-values-for-kids": icvkSchema,
};

const eventForms = {
  "yoga-for-happiness": YogaForHappinessForm,
  "folk-sessions": FolkSessionsForm,
  "vedic-gyan": VedicGyanForm,
  "sharanagati": SharangatiForm,
  "indian-cultural-values-for-kids": ICVKForm,
};

export function Form({ formDetails, basicDetails, eventId }) {
  const schema = eventSchemas[eventId];
  const FormComponent = eventForms[eventId];

  return (
    <div className="rounded-xl bg-surface text-on-surface px-4 md:px-12 py-6 space-y-8">
      <FormComponent schema={schema} formDetails={formDetails} />

      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
        <div className="space-y-4 max-w-max">
          <h5 className="text-primary font-semibold text-xl">
            For any queries
          </h5>

          <p className="max-w-xl font-semibold">
            {formDetails?.additional_form_text}
          </p>

          <div className="flex flex-wrap gap-y-2">
            <a
              href={"mailto:" + formDetails?.email}
              className="w-full flex gap-2 items-center hover:underline"
            >
              <EmailIcon />
              <span>{formDetails?.email}</span>
            </a>

            <a
              target="_blank"
              rel="noopener"
              href={"https://wa.me/" + formDetails?.phone}
              className="w-full flex gap-2 items-center hover:underline"
            >
              <WhatsappIcon />
              <span>{formDetails?.phone}</span>
            </a>
          </div>
        </div>

        <div className="sm:min-w-max">
          <h5 className="text-primary font-semibold text-xl">Follow Us</h5>

          <div className="space-y-2 mt-2">
            <div className="">For more information:</div>

            <a
              href={"https://www.youtube.com/@GuptVrindavanDham"}
              target="_blank"
              rel="noopener"
              className="w-full flex gap-2 items-center hover:underline font-bold"
            >
              <YoutubeIcon className="text-xl text-primary" />
              guptvrindavandham
            </a>

            <a
              href={"https://www.instagram.com/GuptVrindavanDham/"}
              target="_blank"
              rel="noopener"
              className="w-full flex gap-2 items-center hover:underline font-bold"
            >
              <InstagramIcon className="text-xl text-primary" />
              guptvrindavandham
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function YogaForHappinessForm({ schema, formDetails }) {
  let searchParams = useSearchParams();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      type: "single",
      ...searchParams,
    },
    resolver: yupResolver(schema),
  });

  const registrationType = watch("type");

  const mutation = useSubmitMutation();
  async function onSubmit(data) {
    const newData = { event_details: { ...data } };

    mutation.mutate(newData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        toast.error("Please Fix form errors!")
      )}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <ControlledRadios
        name="type"
        control={control}
        label={"Select Session"}
        options={[
          { label: "Single", value: "single" },
          { label: "Couple", value: "couple" },
        ]}
        className="col-span-1 sm:col-span-2 lg:col-span-4 flex"
      />
      {registrationType === "couple" && (
        <span className="col-span-1 sm:col-span-2 lg:col-span-4 inline-block -mb-5">
          Person 1
        </span>
      )}
      <ControlledInput
        control={control}
        name="name"
        label="Your Full Name"
        placeholder="Full Name"
      />
      <ControlledPhoneInput
        control={control}
        name="phone"
        label="Mobile No."
        placeholder="Enter Mobile No."
      />
      <ControlledSelect
        name="gender"
        control={control}
        label={"Gender"}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      <ControlledInput
        control={control}
        name="age"
        label="Age"
        placeholder="Age"
      />
      {registrationType === "couple" && (
        <>
          <span className="col-span-1 sm:col-span-2 lg:col-span-4 inline-block -mb-5">
            Person 2
          </span>
          <ControlledInput
            control={control}
            name="couple_fullname"
            label="Full Name"
            placeholder="Full Name"
          />

          <ControlledPhoneInput
            control={control}
            name="couple_phone"
            label="Mobile No."
            placeholder="Enter Mobile No."
          />

          <ControlledSelect
            name="couple_gender"
            control={control}
            label={"Gender"}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />

          <ControlledInput
            control={control}
            name="couple_age"
            label="Age"
            placeholder="Age"
          />
        </>
      )}
      <ControlledInput
        control={control}
        name="residential_area"
        label="Residential Area"
        placeholder="Enter Your Address"
        classes="col-span-1 sm:col-span-2"
      />
      <ControlledSelect
        name="registrar"
        control={control}
        label={"Select Registrar"}
        classes="col-span-1 sm:col-span-2"
        options={[
          { label: "Self", value: "Self" },
          { label: "Harsh Krishna Das", value: "Harsh Krishna Das" },
          { label: "Vanshi Vadan Das", value: "Vanshi Vadan Das" },
          { label: "Raghudva Das", value: "Raghudva Das" },
          { label: "Sureshvar Krishna Das", value: "Sureshvar Krishna Das" },
          { label: "Sudha Mataji", value: "Sudha Mataji" },
        ]}
      />
      <Button
        type="submit"
        className="col-span-full rounded-lg"
        loading={mutation.isPending}
      >
        {formDetails.button_text} &nbsp;
        {registrationType === "couple"
          ? formatIndianCurrency("800", { maximumFractionDigits: 0 })
          : formatIndianCurrency("500", { maximumFractionDigits: 0 })}
      </Button>
    </form>
  );
}

function FolkSessionsForm({ schema, formDetails }) {
  let searchParams = useSearchParams();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      ...searchParams,
    },
    resolver: yupResolver(schema),
  });

  const sessionType = watch("session_type");

  let amount = 0;
  if (sessionType >= 1) {
    amount += 500;
  }

  const mutation = useSubmitMutation();
  async function onSubmit(data) {
    const newData = { ...data };

    if (newData.session_type > 1) {
      newData.previous_session = await convertFileToBase64(
        data.previous_session[0]
      );
    }
    mutation.mutate(newData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        toast.error("Please Fix form errors!")
      )}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ControlledSelect
        name="session_type"
        control={control}
        label={"Select Session"}
        options={[
          { label: "Bhagawat Gita for youth (Rs. 500)", value: 1 },
          { label: "Parivartan (Rs. 500)", value: 2 },
          { label: "Positive Transformation (Rs. 500)", value: 3 },
          { label: "Good to Great (Rs. 500)", value: 4 },
          { label: "Progress beyond Progress (Rs. 500)", value: 5 },
        ]}
      />

      <PreviousSessionProof control={control} />
      <ControlledInput
        control={control}
        name="name"
        label="Name"
        placeholder="Enter Name"
      />

      <ControlledPhoneInput
        control={control}
        name="phone"
        label="Phone No."
        placeholder="Enter Whatsapp No."
      />

      <ControlledSelect
        name="gender"
        control={control}
        label={"Gender"}
        options={[{ label: "Male", value: "male" }]}
      />

      <ControlledSelect
        name="profession"
        control={control}
        label={"Profession"}
        options={[
          { label: "Working", value: "working" },
          { label: "Student", value: "student" },
        ]}
      />

      <ControlledInput
        control={control}
        name="profession_name"
        label="Name of College/Company"
        placeholder="Enter Name"
      />
      <ControlledSelect
        name="folk_guide_name"
        control={control}
        label={"Name of FOLK Guide"}
        options={[
          { label: "GDGD", value: "GDGD" },
          { label: "SVLD", value: "SVLD" },
          { label: "GRSD", value: "GRSD" },
          { label: "RCND", value: "RCND" },
          { label: "VMMD", value: "VMMD" },
          { label: "ADGD", value: "ADGD" },
          { label: "FOLK", value: "FOLK" },
        ]}
      />

      <Button
        type="submit"
        className="col-span-full rounded-lg"
        loading={mutation.isPending}
      >
        {formDetails.button_text} &nbsp;
        {amount
          ? formatIndianCurrency(amount, { maximumFractionDigits: 0 })
          : ""}
      </Button>
    </form>
  );
}

function PreviousSessionProof({ control }) {
  const sessionType = useWatch({ control, name: "session_type" });

  const map = {
    1: "BG for youth",
    2: "Parivartan",
    3: "Positive Transformation",
    4: "Good to Great",
    5: "Progress beyond Progress",
  };

  return (
    sessionType > 1 && (
      <FileInput
        shouldUnregister
        control={control}
        name="previous_session"
        label={"Certificate of '" + map[sessionType - 1] + "' Session"}
      />
    )
  );
}

function FileInput({ control, name, label, shouldUnregister }) {
  return (
    <Controller
      name={name}
      shouldUnregister={shouldUnregister}
      control={control}
      render={({
        field: { name, onChange, value, ref, onBlur },
        fieldState: { error },
      }) => {
        return (
          <Input
            label={label}
            placeholder="Upload"
            onBlur={onBlur}
            error={error}
            accept="image/jpg, image/jpeg, image/png"
            type="file"
            ref={ref}
            name={name}
            onChange={(event) => {
              return onChange(event.target.files);
            }}
          />
        );
      }}
    />
  );
}

function VedicGyanForm({ schema, formDetails }) {
  let searchParams = useSearchParams();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...searchParams,
    },
    resolver: yupResolver(schema),
  });

  const mutation = useSubmitMutation();
  async function onSubmit(data) {
    const newData = { event_details: { ...data } };

    mutation.mutate(newData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        toast.error("Please Fix form errors!")
      )}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ControlledInput
        control={control}
        name="name"
        label="Your Full Name"
        placeholder="Full Name"
      />
      <ControlledPhoneInput
        control={control}
        name="phone"
        label="Mobile No."
        placeholder="Enter Mobile No."
      />
      <ControlledSelect
        name="gender"
        control={control}
        label={"Gender"}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      <ControlledInput
        control={control}
        name="age"
        label="Age"
        placeholder="Age"
      />

      <ControlledInput
        control={control}
        name="residential_area"
        label="Residential Area"
        placeholder="Enter Your Address"
      />
      <ControlledSelect
        name="registrar"
        control={control}
        label={"Select Registrar"}
        options={[
          { label: "Self", value: "Self" },
          { label: "Harsh Krishna Das", value: "Harsh Krishna Das" },
          { label: "Vanshi Vadan Das", value: "Vanshi Vadan Das" },
          { label: "Raghudva Das", value: "Raghudva Das" },
          { label: "Sureshvar Krishna Das", value: "Sureshvar Krishna Das" },
          { label: "Sudha Mataji", value: "Sudha Mataji" },
        ]}
      />
      <Button
        type="submit"
        className="col-span-full rounded-lg"
        loading={mutation.isPending}
      >
        {`${formDetails.button_text} ${formatIndianCurrency("300", {
          maximumFractionDigits: 0,
        })}`}
      </Button>
    </form>
  );
}

function SharangatiForm({ schema, formDetails }) {
  let searchParams = useSearchParams();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...searchParams,
    },
    resolver: yupResolver(schema),
  });

  const mutation = useSubmitMutation();
  async function onSubmit(data) {
    const newData = { event_details: { ...data } };

    mutation.mutate(newData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        toast.error("Please Fix form errors!")
      )}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <ControlledSelect
        name="session_type"
        control={control}
        label={"Select Sharanagati"}
        options={[
          { label: "Sharanagati 1", value: 1 },
          { label: "Sharanagati 2", value: 2 },
        ]}
      />

      <ControlledInput
        control={control}
        name="name"
        label="Your Full Name"
        placeholder="Full Name"
      />
      <ControlledPhoneInput
        control={control}
        name="phone"
        label="Mobile No."
        placeholder="Enter Mobile No."
      />
      <ControlledSelect
        name="gender"
        control={control}
        label={"Gender"}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      <ControlledInput
        control={control}
        name="age"
        label="Age"
        placeholder="Age"
      />

      <ControlledInput
        control={control}
        name="residential_area"
        label="Residential Area"
        placeholder="Enter Your Address"
      />
      <ControlledSelect
        name="registrar"
        control={control}
        label={"Select Registrar"}
        options={[
          { label: "Self", value: "Self" },
          { label: "Harsh Krishna Das", value: "Harsh Krishna Das" },
          { label: "Vanshi Vadan Das", value: "Vanshi Vadan Das" },
          { label: "Raghudva Das", value: "Raghudva Das" },
          { label: "Sureshvar Krishna Das", value: "Sureshvar Krishna Das" },
          { label: "Sudha Mataji", value: "Sudha Mataji" },
        ]}
      />
      <Button
        type="submit"
        className="col-span-full rounded-lg"
        loading={mutation.isPending}
      >
        {`${formDetails.button_text} (${formatIndianCurrency("300", {
          maximumFractionDigits: 0,
        })})`}
      </Button>
    </form>
  );
}

function ICVKForm({ schema, formDetails }) {
  let searchParams = useSearchParams();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...searchParams,
    },
    resolver: yupResolver(schema),
  });

  const mutation = useSubmitMutation();
  async function onSubmit(data) {
    const newData = { event_details: { ...data } };

    mutation.mutate(newData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        toast.error("Please Fix form errors!")
      )}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ControlledInput
        control={control}
        name="name"
        label="Name of Child"
        placeholder="Full Name"
      />
      <ControlledPhoneInput
        control={control}
        name="phone"
        label="Mobile No."
        placeholder="Enter Mobile No."
      />
      <ControlledSelect
        name="gender"
        control={control}
        label={"Gender"}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      <ControlledInput
        control={control}
        name="age"
        label="Age"
        placeholder="Age"
      />

      <ControlledInput
        control={control}
        name="residential_area"
        label="Residential Area"
        placeholder="Enter Your Address"
      />
      <ControlledSelect
        name="registrar"
        control={control}
        label={"Select Registrar"}
        options={[
          { label: "Self", value: "Self" },
          { label: "Harsh Krishna Das", value: "Harsh Krishna Das" },
          { label: "Vanshi Vadan Das", value: "Vanshi Vadan Das" },
          { label: "Raghudva Das", value: "Raghudva Das" },
          { label: "Sureshvar Krishna Das", value: "Sureshvar Krishna Das" },
          { label: "Sudha Mataji", value: "Sudha Mataji" },
        ]}
      />
      <Button
        type="submit"
        className="col-span-full rounded-lg"
        loading={mutation.isPending}
      >
        {`${formDetails.button_text} ${formatIndianCurrency("300", {
          maximumFractionDigits: 0,
        })}`}
      </Button>
    </form>
  );
}