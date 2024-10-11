import React from 'react';
import { Input } from '@/components/ui/input';

interface LastNameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LastNameInput: React.FC<LastNameInputProps> = ({ value, onChange }) => {
  return (
    <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
      <Input
        className="h-8"
        id="lname"
        placeholder="Last Name"
        type="text"
        name="lname"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default LastNameInput;
