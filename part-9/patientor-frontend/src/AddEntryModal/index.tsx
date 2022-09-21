import { Dialog, DialogContent, DialogTitle, Divider } from "@material-ui/core";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onClose: () => void;
    modalOpen: boolean;
}
const AddEntryModal = ({ onSubmit, onClose, modalOpen }: Props) => {
    return <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new Entry</DialogTitle>
        <Divider />
        <DialogContent>
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>;
};

export default AddEntryModal;