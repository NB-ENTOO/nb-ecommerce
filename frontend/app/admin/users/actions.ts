'use server';

import getServerSession from 'next-auth';
import { authConfig } from '../../../lib/auth.config';
import type { User } from './columns';

export async function getUsers(): Promise<User[]> {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.accessToken) {
      return [];
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000/api';
    const response = await fetch(`${backendUrl}/users`, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch users:', await response.text());
      return [];
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
} 