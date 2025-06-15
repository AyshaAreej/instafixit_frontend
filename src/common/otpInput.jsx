import React, { useState, useRef, useEffect } from 'react';
import { useReadOTP } from 'react-read-otp';
import { CInputGroup, CFormInput } from '@coreui/react';

const OTPInput = ({ length, onChange, defaultValue = '' }) => {
  const [otp, setOtp] = useState(() =>
    Array.from({ length }, (_, i) => defaultValue[i] || '')
  );
  const [autoOTP, setAutoOTP] = useState('');
  const inputs = useRef([]);

  useReadOTP(setAutoOTP);

  useEffect(() => {
    const newOtp = autoOTP.split('').slice(0, length);
    setOtp(newOtp);
    onChange('code', newOtp.join(''));
  }, [autoOTP]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange('code', newOtp.join(''));

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (/[^0-9]/.test(pasteData)) return;
    const newOtp = pasteData.split('').slice(0, length);
    setOtp(newOtp);
    onChange('code', newOtp.join(''));

    newOtp.forEach((value, i) => {
      if (inputs.current[i]) {
        inputs.current[i].value = value;
      }
    });

    if (newOtp.length < length && inputs.current[newOtp.length]) {
      inputs.current[newOtp.length].focus();
    }
  };

  return (
    <CInputGroup className="justify-content-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <CFormInput
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index]}
          autoComplete="one-time-code"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          ref={(el) => (inputs.current[index] = el)}
          style={{
            width: '3rem',
            height: '3rem',
            textAlign: 'center',
            fontSize: '1.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
          }}
        />
      ))}
    </CInputGroup>
  );
};

export default OTPInput;
