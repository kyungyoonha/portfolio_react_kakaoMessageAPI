import React from 'react';
import Clock from 'react-live-clock';

const LiveClock = () => {
    return(
        <div>
            <Clock format={'YYYY년 MM월 DD일 HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
        </div>
    )
}

export default LiveClock;