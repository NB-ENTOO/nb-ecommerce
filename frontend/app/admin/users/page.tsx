import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { DataTable } from '../../../components/ui/data-table';
import { columns } from './columns';
import { getUsers } from './actions';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link href="/admin/register">
          <Button>Create User</Button>
        </Link>
      </div>

      <DataTable columns={columns} data={users} />
    </div>
  );
} 