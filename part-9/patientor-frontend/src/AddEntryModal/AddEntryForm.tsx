/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TypeEntryOption, TextField, DiagnosisSelection, RatingOption, SelectField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryFormValues, TypesEntry } from "../types";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const healthCheckOptions: RatingOption[] = [
    { value: 0, label: "Healthy" },
    { value: 1, label: "Low risk" },
    { value: 2, label: "High risk" },
    { value: 3, label: "Critical risk" },
];

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
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: ""
                },
                discharge: {
                    date: "",
                    criteria: ""
                },
                healthCheckRating: 0
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
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                    <Form className="form ui">

                        <SelectField label="Type" name="type" options={typeEntryOptions} />

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
                        {values.type === TypesEntry.HealthCheck && (
                            <SelectField label="Healt Check Rating" name="healthCheckRating" options={healthCheckOptions} />

                        )}
                        {values.type === TypesEntry.Hospital && (
                            <div>
                                <Field
                                    label="Discharge Date"
                                    placeholder="Discharge Date"
                                    name="discharge.date"
                                    component={TextField}
                                />
                                <Field
                                    label="Discharge Criteria"
                                    placeholder="Discharge Criteria"
                                    name="discharge.criteria"
                                    component={TextField}
                                />
                            </div>
                        )}

                        {values.type === TypesEntry.OccupationalHealthcare && (
                            <div>
                                <Field
                                    label="Employer Name"
                                    placeholder="Employer Name"
                                    name="employerName"
                                    component={TextField}
                                />
                                <div>
                                    <Field
                                        label="SickLeave startDate"
                                        placeholder="SickLeave startDate"
                                        name="sickLeave.startDate"
                                        component={TextField}
                                    />
                                    <Field
                                        label="SickLeave startDate"
                                        placeholder="sickLeave endDate"
                                        name="sickLeave.endDate"
                                        component={TextField}
                                    />
                                </div>

                            </div>

                        )}
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