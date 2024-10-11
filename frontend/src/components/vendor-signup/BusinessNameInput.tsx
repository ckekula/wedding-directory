import React from 'react'
import { Input } from '@/components/ui/input';

interface BusinessNameInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BusinessNameInput: React.FC<BusinessNameInputProps> = ({ value, onChange }) => {
    return (
        <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
            <Input
                className="h-8"
                id="busname"
                placeholder="Business Name"
                type="text"
                name="busname"
                value={value}
                onChange={onChange}
                required
            />

        </div>
    )
}

export default BusinessNameInput
