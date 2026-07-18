'use client';

import { useState, useEffect } from 'react';
import { checkAdminStatus } from '@/lib/adminAuth';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        const status = await checkAdminStatus();
        setIsAdmin(status);
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }
    verify();
  }, []);

  return { isAdmin, isLoading };
}
