import React from 'react'
import { Input } from '@/components/ui/input';

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
    return (
        <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
            <Input
                className="h-8"
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    )
}

export default PasswordInput
