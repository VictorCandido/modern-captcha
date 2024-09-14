'use client';

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    const { push } = useRouter();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="flex h-16 w-full justify-between items-center px-4 border-b">
                <Button variant="ghost" onClick={() => push('/home')}>
                    <h1 className="text-2xl font-bold">Modern Poc</h1>
                </Button>

                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: 'h-10 w-10',
                        }
                    }}
                />

            </div>
            {children}
        </div>
    );
}

export default MainLayout;