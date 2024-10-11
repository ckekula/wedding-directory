import React from 'react'
import { Input } from '@/components/ui/input';

interface RePasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RePassword: React.FC<RePasswordInputProps> = ({ value, onChange }) => {
    return (
        <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
            <Input
                className="h-8"
                type="password"
                id="rpassword"
                placeholder="Retype Password"
                name="rpassword"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    )
}

export default RePassword
