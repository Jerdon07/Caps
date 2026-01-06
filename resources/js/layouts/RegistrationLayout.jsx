import { Head } from "@inertiajs/react"
import { Card, CardContent } from "@/components/ui/card"

export default function Layout({children}) {

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 overflow-auto">
            <Head title="Register" />

            <div className="w-full max-w-sm md:max-w-4xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2 min-h-128.25">

                            <div className="bg-muted relative hidden md:block pt-12">
                                <div className="bg-primary absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"></div>
                                <div className="relative flex flex-col items-center text-muted gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Account Registration</h1>
                                    <p className="text-balance">
                                        Start your Harvest!
                                    </p>
                                </div>
                            </div>

                            {children}

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}