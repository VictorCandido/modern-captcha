interface AuthLayoutInterface {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutInterface) => {
    return (
        <div className="h-full w-full flex items-center justify-center">
            {children}
        </div>
    );
}

export default AuthLayout;