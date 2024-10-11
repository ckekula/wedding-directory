import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [isTouched, setIsTouched] = useState(false); 

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  
  const handleBlur = () => {
    setIsTouched(true); 
  };

  return (
    <div>
      <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
        <Input
          className="h-8"
          id="phone"
          placeholder="Phone"
          type="text"
          name="phone"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required
        />
      </div>

      
      {isTouched && !validatePhoneNumber(value) && (
        <p className="text-red-500 text-sm pl-2 text-left">Invalid Phone Number </p>
      )}
    </div>
  );
};

export default PhoneInput;
