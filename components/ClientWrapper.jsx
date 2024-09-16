'use client';

import { usePathname } from 'next/navigation';
import ClientLayout from './ClientLayout';

const ClientWrapper = ({ children }) => {
  const pathname = usePathname();

  return (
    <ClientLayout pathname={pathname}>
      {children}
    </ClientLayout>
  );
};

export default ClientWrapper;
