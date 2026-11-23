import { cookies } from 'next/headers';
import { getAdminSession } from '@/lib/adminSession';
import type { Metadata } from 'next';
import AdminLayoutClient from './AdminLayoutClient';

export const metadata: Metadata = {
  title: 'Admin - GenshinHub',
  description: 'Admin area for managing GenshinHub content. This section is hidden from search indexes.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get('admin_token')?.value;
  const admin = await getAdminSession(token);
  return <AdminLayoutClient username={admin?.username}>{children}</AdminLayoutClient>;
}
