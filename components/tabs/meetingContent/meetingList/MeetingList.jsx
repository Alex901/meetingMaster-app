import { useMeetingContext } from '../../../../contexts/MeetingContext';
import Meeting from './Meeting/Meeting';

const MeetingList = () => {
    const { meetingList } = useMeetingContext();

    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ marginLeft: '10px' }}>TODAY</h2>
            <div style={{ overflow: 'auto', maxHeight: '600px', width: '100%', padding: '5px', backgroundColor: '#F0F0F0', borderRadius:'10px' }}>
                {meetingList && meetingList.length > 0 ? ( // To ensure that meetingList has been initiated before i map it
                    meetingList.map((meeting, index) => (
                        <Meeting key={index} meeting={meeting} /> //TODO: I know, I know, I should have used the meeting id as the key, but I don't have one yet..
                    ))
                ) : (
                    <p>No meetings today.</p>
                )}
            </div>
        </div>
    );
};

export default MeetingList;