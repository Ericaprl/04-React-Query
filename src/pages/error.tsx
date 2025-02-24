import { Link, useRouteError } from "react-router";

export function Error() {
    const error = useRouteError() as Error

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">Something went wrong!</h1>
            <h2 className="text-3xl text-accent-foreground">Please try again and contact support if it doesn't work.</h2>
            <pre>{error?.message || JSON.stringify(error)}</pre>
            <p className="text-accent-foreground">
                Back to <Link to={'/'} className="text-sky-500 dark:text-sky-400">
                    Dashboard
                </Link>
            </p>
        </div>
    )
}
