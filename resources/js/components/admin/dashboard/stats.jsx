import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle, 
} from "@/components/ui/card";

export default function Stats({stats}) {
    return (
        <>
            {/* Total Crops */}
            <Card className="col-span-2 row-span-1 p-2 h-20">
                <CardHeader className="p-0 pl-1 items-between">
                    <CardTitle className="text-xs text-muted-foreground">Total Vegetables</CardTitle>
                    <CardDescription className="text-xl font-extrabold p-0 flex items-center gap-1">
                        {stats.cropsCount}
                        <span className="text-xs font-thin bg-primary/30">recorded in total</span>
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Total Updated Crops */}
            <Card className="col-span-2 row-span-1 p-2 h-20">
                <CardHeader className="p-0 pl-1 items-between">
                    <CardTitle className="text-xs text-muted-foreground">Weekly price updates</CardTitle>
                    <CardDescription className="text-xl font-extrabold p-0 flex items-center gap-1">
                        {stats.updatedPriceCount}
                        <span className="text-xs font-thin bg-primary/30">updated prices</span>
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Total Users */}
            <Card className="col-span-2 row-span-1 p-2 h-20">
                <CardHeader className="p-0 pl-1 items-between">
                    <CardTitle className="text-xs text-muted-foreground">Total Users</CardTitle>
                    <CardDescription className="text-xl font-extrabold p-0 flex items-center gap-1">
                        {stats.usersCount}
                        <span className="text-xs font-thin bg-primary/30">signed users in total</span>
                    </CardDescription>
                </CardHeader>
            </Card>
            {/* Total Active Users */}
            <Card className="col-span-2 row-span-1 p-2 h-20">
                <CardHeader className="p-0 pl-1 items-between">
                    <CardTitle className="text-xs text-muted-foreground">Active users</CardTitle>
                    <CardDescription className="text-xl font-extrabold p-0 flex items-center gap-1">
                        {stats.activeUsersCount}
                        <span className="text-xs font-thin bg-primary/30">active this week</span>
                    </CardDescription>
                </CardHeader>
            </Card>
        </>
    )
}