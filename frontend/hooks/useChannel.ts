import React, { useContext } from 'react';

import { ChannelContext } from '@/context/ChannelContext';

export const useChannel = () => {
  const context = useContext(ChannelContext);
  if (!context) throw new Error("useChannel must be used within a ChannelProvider");
  return context;
};