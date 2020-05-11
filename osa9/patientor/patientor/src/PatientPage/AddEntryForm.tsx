import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Entry } from "../types";
import { Formik, Form, Field } from "formik";
import { TextField } from "../AddPatientModal/FormField";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        specialist: "",
        description: "",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
    >
      {({ dirty }) => (
        <Form className="form ui">
          <Field
            label="Type"
            placeholder="Type"
            name="type"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                type="submit"
                floated="right"
                color="green"
                disabled={!dirty}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      )}

    </Formik>
  );
};

export default AddEntryForm;