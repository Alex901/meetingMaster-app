import { useMeetingContext } from '../../../../contexts/MeetingContext';
import Meeting from './Meeting/Meeting';

const MeetingList = () => {
    const { meetingList } = useMeetingContext();

    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ marginLeft: '10px' }}>TODAY</h2>
            <div>
                {meetingList && meetingList.length > 0 ? ( // To ensure that meetingList has been initiated before i map it
                    meetingList.map((meeting, index) => (
                        <Meeting key={index} {...meeting} />
                    ))
                ) : (
                    <p>No meetings today.</p>
                )}
            </div>
        </div>
    );
};

export default MeetingList;