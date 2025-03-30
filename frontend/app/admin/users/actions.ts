'use server';

import { getServerSession } from 'next-auth';
import { authConfig } from '../../../lib/auth.config';
import { User } from './columns';

export async function getUsers(): Promise<User[]> {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user || !session.accessToken) {
      throw new Error('Not authenticated');
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000/api';
    const response = await fetch(`${backendUrl}/users`, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
} 