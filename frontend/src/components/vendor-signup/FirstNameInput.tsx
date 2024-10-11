import React from 'react';
import { Input } from '@/components/ui/input';

interface FirstNameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FirstNameInput: React.FC<FirstNameInputProps> = ({ value, onChange }) => {
  return (
    <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
      <Input
        className="h-8"
        id="fname"
        placeholder="First Name"
        type="text"
        name="fname"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FirstNameInput;