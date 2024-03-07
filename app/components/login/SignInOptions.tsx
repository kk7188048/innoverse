'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { getProviders } from 'next-auth/react';
import { destroyCookie, parseCookies } from 'nookies';

import { Collapse } from '@mui/material';

import { errorMessage } from '../common/CustomToast';

import LoginProviderRow from './LoginProviderRow';
import UserSuggestionRow from './UserSuggestionRow';

export default function SignInOptions() {
  const [signInProviders, setSignInProviders] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [userSuggested, setUserSuggested] = React.useState(true);
  const { session } = parseCookies();

  useEffect(() => {
    async function getSignInProviders() {
      try {
        const providers = await getProviders();
        setSignInProviders(providers);
      } catch (error) {
        console.error('Failed to fetch sign-in providers:', error);
        errorMessage({ message: 'Failed to load sign-in options. Please try again later.' });
      }
    }
    getSignInProviders();
  }, []);

  const getCookieData = () => {
    try {
      if (!session) throw new Error('Session cookie is not set.');
      const cookieData = JSON.parse(decodeURIComponent(atob(session)));
      return {
        name: cookieData.user.name,
        image: cookieData.user.image,
        provider: cookieData.provider,
      };
    } catch (error) {
      console.error('Failed to parse session cookie:', error);
      errorMessage({ message: 'Failed to retrieve session information. Please refresh the page.' });
      return null;
    }
  };

  const handleToggleCollapse = () => {
    setOpen(!open);
  };

  const handleRemoveCookie = () => {
    setUserSuggested(false);
    destroyCookie(undefined, 'session', {
      path: '/',
    });
  };

  const getProvider = () => {
    return Object.values(signInProviders).find((provider: any) => provider.id === getCookieData()?.provider) as {
      name: string;
      id: string;
    };
  };

  return (
    <>
      {signInProviders && session && userSuggested && (
        <UserSuggestionRow
          key={getProvider().id}
          provider={getProvider()}
          name={getCookieData()?.name}
          image={getCookieData()?.image}
          handleRemoveCookie={handleRemoveCookie}
          handleToggleCollapse={handleToggleCollapse}
          open={open}
        />
      )}
      <Collapse in={open || !session} unmountOnExit>
        {signInProviders &&
          Object.values(signInProviders).map((provider: any) => (
            <LoginProviderRow key={provider.id} provider={provider} />
          ))}
      </Collapse>
    </>
  );
}
