'use client';

import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { LocationProps } from '@/types/signupInput';
import { AUTOCOMPLETE_QUERY } from '@/graphql/queries';

const LocationInput: React.FC<LocationProps> = ({ onLocationChange, disabled, placeholder }) => {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [autocomplete, { data }] = useLazyQuery(AUTOCOMPLETE_QUERY);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      if (value) {
        setShowSuggestions(true);
        autocomplete({ variables: { input: value } });
      } else {
        setShowSuggestions(false);
      }
    };
  
    const handleSelect = (address: string) => {
      setInput(address);
      onLocationChange(address);  // Update the selected location
      setShowSuggestions(false);
    };
  
    return (
      <div className="border-black border-solid border-2 rounded-lg flex flex-col relative">
        <Input
          className="h-8"
          type="text"
          value={input}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {showSuggestions && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 z-10">
            {data?.autocompleteLocation?.map((address: string, index: number) => (
              <li 
                key={index} 
                onClick={() => handleSelect(address)} 
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {address}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default LocationInput;
