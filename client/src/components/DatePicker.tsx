import React, { useRef, useState } from 'react';

const DatePicker = () => {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = () => {
};

 return (
 <div>
    <input
        type="date"
        onChange={handleChange}
        ref={dateInputRef}
        />
    </div>
    );
};

export default DatePicker;