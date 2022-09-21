import { Dialog, DialogContent, DialogTitle, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onClose: () => void;
    modalOpen: boolean;
    error: string | undefined,
}
const AddEntryModal = ({ onSubmit, onClose, modalOpen, error }: Props) => {
    return <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new Entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>;
};

export default AddEntryModal;