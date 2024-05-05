'use client';

import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterProvider: FC = () => <Toaster position="bottom-right" />;

ToasterProvider.displayName = 'ToasterProvider';

export default ToasterProvider;
