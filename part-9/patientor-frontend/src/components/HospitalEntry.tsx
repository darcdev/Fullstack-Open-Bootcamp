import React from 'react';
import { HospitalEntry as HospitalEntryType } from '../types';

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
    return <> {entry.discharge && (<div>
        <p><strong>Discharge</strong></p>
        <p>Date : {entry.discharge?.date}</p>
        <p>Criteria : {entry.discharge?.criteria}</p>
    </div>)} </>;
};

export default HospitalEntry;