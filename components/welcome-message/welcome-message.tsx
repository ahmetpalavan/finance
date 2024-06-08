'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';
import { merriweather } from '~/theme/typography';

export const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();
  return (
    <div
      style={{
        fontFamily: merriweather.style.fontFamily,
      }}
      className='space-y-2 mb-4'
    >
      <h1 className='text-2xl font-semibold mb-4'>
        Welcome Back {isLoaded ? ',' : ''} {user?.fullName}
      </h1>
      <p className='text-white'>
        This is a personal finance app that helps you track your expenses and
        income.
      </p>
    </div>
  );
};
