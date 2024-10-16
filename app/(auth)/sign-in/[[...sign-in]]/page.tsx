// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//     return <SignIn />;
// }

'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignIn, useUser } from "@clerk/nextjs";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Component() {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, isLoaded, setActive } = useSignIn();
    const { push } = useRouter();
    const { isSignedIn } = useUser();

    async function handleWithLogin() {
        if (!isLoaded) return;

        try {
            if (isSignedIn) {
                push('/home');
            }

            if (username === '' || password === '') {
                return;
            }

            const result = await signIn.create({
                identifier: username,
                password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                push('/home');
            } else {
                console.log(JSON.stringify(result, null, 2));
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Entre com suas credenciais para acessar sua conta.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Usuário</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Digite seu nome de usuário"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button name="login" className="w-full" onClick={handleWithLogin}>Entrar</Button>
                    <div className="text-sm text-center">
                        Não tem uma conta?{" "}
                        <Link href="/sign-up" className="text-primary hover:underline">
                            Registre-se
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}