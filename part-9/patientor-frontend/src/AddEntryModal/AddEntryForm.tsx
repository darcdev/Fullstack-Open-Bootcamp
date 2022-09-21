/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { SelectEntryField, TypeEntryOption, TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { NewEntry, TypesEntry } from "../types";

export type EntryFormValues = Omit<NewEntry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}


const typeEntryOptions: TypeEntryOption[] = [
    { value: TypesEntry.HealthCheck, label: "HealthCheck" },
    { value: TypesEntry.Hospital, label: "Hospital" },
    { value: TypesEntry.OccupationalHealthcare, label: "OccupationalHealthcare" },
];


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

    const [{ diagnostics }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: TypesEntry.Hospital,
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">

                        <SelectEntryField label="Type" name="type" options={typeEntryOptions} />

                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnostics)}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;