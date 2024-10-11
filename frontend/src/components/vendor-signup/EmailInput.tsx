import React from 'react'
import { Input } from '@/components/ui/input';

interface EmailInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  return (
    <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input
                      className="h-8"
                      type="email"
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={value}
                      onChange={onChange}
                      required
                    />
                  </div>
  )
}

export default EmailInput
