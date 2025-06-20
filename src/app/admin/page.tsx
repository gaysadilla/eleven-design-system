import { redirect } from 'next/navigation';
 
export default function AdminPage() {
  // Redirect to TinaCMS admin interface
  redirect('/admin/index.html');
} 