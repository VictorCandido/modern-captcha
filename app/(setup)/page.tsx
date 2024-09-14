import { initialProfile } from '@/lib/initial-profile';
import { redirect } from 'next/navigation';

export default async function SetupPage() {
  const profile = await initialProfile();

  if (profile) {
    return redirect(`/home`);
  }

  return (
    <div>Falha ao logar no sistema</div>
  )
}