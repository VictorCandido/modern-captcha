// 'use client'

import { initialProfile } from '@/lib/initial-profile';
import { redirect } from 'next/navigation';

// export default function SetupPage() {
//   const { isConnected, socket } = useSocket();
//   const [msg, setMsg] = useState('inicio');

//   useEffect(() => {
//     if (!socket) return

//     socket.on('teste', (mensagem: string) => {
//       setMsg(mensagem);
//     });

//     return () => {
//       socket.off('teste')
//     }
//   }, [socket]);

//   return (
//     <div>
//       <p>{isConnected ? 'Conectado' : 'Desconectado'}</p>
//       <p>{msg}</p>
//     </div>
//   )

//   // const profile = await initialProfile();

//   // if (profile) {
//   //   return redirect(`/home`);
//   // }

//   // return (
//   //   <div>Falha ao logar no sistema</div>
//   // )
// }

export default async function SetupPage() {
  const profile = await initialProfile();

  if (profile) {
    return redirect(`/home`);
  }

  return (
    <div>Falha ao logar no sistema</div>
  )
}