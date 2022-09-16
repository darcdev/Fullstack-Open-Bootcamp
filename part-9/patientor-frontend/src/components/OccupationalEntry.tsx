import { OccupationalHealthcareEntry } from "../types";

const OccupationalEntry: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return <div>
        <p>Employer Name : {entry.employerName}</p>
        {entry.sickLeave && (
            <div>
                <p><strong>Stick Leave</strong></p>
                <p>Date : {entry.sickLeave?.startDate}</p>
                <p>Criteria : {entry.sickLeave?.endDate}</p>
            </div>
        )}

    </div>;
};

export default OccupationalEntry;