'use client';

import React, { useEffect, useState } from 'react';
import LoaderJelly from '@/components/shared/Loaders/LoaderJelly';

const Loader = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setText('I waited for 3 seconds to load this page');
    }, 3000)
  }, []);
  return (
    <>
      <div>
        {
          isLoading ? (
            <LoaderJelly/>
          ) : (
            <h3>{text}</h3>
          )
        }
      </div>
    </>
  );
};
export default Loader;
