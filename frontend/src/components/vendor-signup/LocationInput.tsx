'use client';

import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Input } from '../ui/input';

const AUTOCOMPLETE_QUERY = gql`
    query Autocomplete($input: String!) {
        autocompleteAddress(input: $input)
    }
`;

const AddressInput = () => {
  
    const [input, setInput] = useState('');
    const [autocomplete, { data }] = useLazyQuery(AUTOCOMPLETE_QUERY);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      if (value) {
        autocomplete({ variables: { input: value } });
      }
    };
  
    const handleSelect = (address: string) => {
      setInput(address);
      autocomplete({ variables: { input: '' } });    };
  
    return (
        <div>
            <Input
                type="address"
                value={input}
                onChange={handleChange}
                placeholder="Address"
            />
            <ul>
                {data?.autocompleteAddress?.map((address: string, index: number) => (
                <li 
                    key={index} 
                    onClick={() => handleSelect(address)} 
                    style={{ cursor: 'pointer' }}
                >
                    {address}
                </li>
                ))}
            </ul>
        </div>
    );
  };

export default AddressInput