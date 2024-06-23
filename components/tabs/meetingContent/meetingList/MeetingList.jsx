import React from 'react';
import Meeting from './Meeting/Meeting';
import { useMeetingContext } from '../../../../contexts/MeetingContext';

const MeetingList = () => {
    const { meetingList } = useMeetingContext();


    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ marginLeft: '10px' }}>TODAY</h2>
            <div>
            {meetingList.map((meeting, index) => (
        <Meeting key={index} {...meeting} />
      ))}
            </div>
        </div>
    );
};

export default MeetingList;