import { usePage } from "@inertiajs/react"

export default function ApprovedProfile() {
    const { auth } = usePage().props;

    return (
        <>
            <div className="flex flex-col gap-2">
                {auth.user?.farmer?.crops.map(crop => (
                    <div key={crop}>{crop}</div>
                ))}
            </div>
        </>
    )
}