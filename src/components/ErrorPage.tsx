import type { ReactNode } from "react";

interface ErrorPageProps {
    code: string;
    message: string;
    image: string;
    children?: ReactNode;
}

export function ErrorPage({
    code,
    message,
    image,
    children,
}: ErrorPageProps) {
    return (
        <main className="flex h-screen items-center justify-center overflow-hidden bg-background px-6">
            <div className="flex w-full max-w-3xl flex-col items-center text-center">
                <h1 className="font-display text-7xl font-extrabold text-primary sm:text-8xl">
                    {code}
                </h1>
                <img src={image} alt={`Error ${code}`} draggable={false} className="mt-2 mb-2 h-72 w-72 object-contain select-none sm:h-80 sm:w-80 md:h-96 md:w-96" />
                <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {message}
                </p>
                {children && (
                    <div className="mt-3">
                    {children}
                    </div>
                )}
            </div>
        </main>
    );
}