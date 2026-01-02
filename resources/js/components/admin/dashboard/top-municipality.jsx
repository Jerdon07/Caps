import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle, 
} from "@/components/ui/card";

export default function TopMunicipality({ topMunicipality }){
    return (
        <Card className="col-span-4 p-2 h-20 justify-between">
            <CardHeader className="p-0 pl-1 items-between">
                <CardTitle className="text-xs text-muted-foreground">Most Users</CardTitle>
                <CardDescription className="text-xl font-extrabold p-0 flex items-center gap-1">
                    {topMunicipality.name}
                    <span className="text-xs font-thin bg-primary/30">{topMunicipality.farmersCount} Farmers</span>
                </CardDescription>
            </CardHeader>
        </Card>
    )
}