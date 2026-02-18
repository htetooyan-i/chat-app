import React, { useContext } from 'react';

import { ChannelContext } from '@/context/ChannelContext';

export const useChannel = () => {
  const ctx = useContext(ChannelContext);
  if (!ctx) throw new Error("useChannel must be used within ChannelProvider");
  return ctx;
};
