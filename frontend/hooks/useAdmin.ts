'use client';

import { useState, useEffect } from 'react';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('admin_key');
    setIsAdmin(!!key && key.length > 0);
  }, []);

  return { isAdmin };
}
