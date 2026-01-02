import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle, 
} from "@/components/ui/card";
import { ChevronsDown, ChevronsUp } from "lucide-react";

export default function Market({ ranks, frequency }) {
    const { topGainers, topLosers } = ranks
    const { stableCrops, unstableCrops } = frequency
    return (
        <>
            <Card className="col-span-4 row-span-4 gap-0 p-2">
                <CardHeader className="p-0 pl-1 gap-1 text-center">
                    <CardTitle className="text-xs text-muted-foreground flex items-center">
                        <ChevronsUp className="text-primary" />
                        <span>Top Gainers</span>
                    </CardTitle>
                </CardHeader>
                <Table className="text-xs">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Vegetable</TableHead>
                            <TableHead>Prev AVG</TableHead>
                            <TableHead>New AVG</TableHead>
                            <TableHead>% Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {topGainers.map((gainers) => (
                            <TableRow key={gainers.name}>
                                <TableCell>{gainers.name}</TableCell>
                                <TableCell>{gainers.prevAvgPrice}</TableCell>
                                <TableCell>{gainers.newAvgPrice}</TableCell>
                                <TableCell>{gainers.percentChange}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <CardHeader className="p-0 pl-1 gap-1 text-center">
                    <CardTitle className="text-xs text-muted-foreground flex items-center">
                        <ChevronsDown className="text-destructive" />
                        <span>Top Losers</span>
                    </CardTitle>
                </CardHeader>
                <Table className="text-xs">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Vegetable</TableHead>
                            <TableHead>Prev AVG</TableHead>
                            <TableHead>New AVG</TableHead>
                            <TableHead>% Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {topLosers.map((losers) => (
                            <TableRow key={losers.name}>
                                <TableCell>{losers.name}</TableCell>
                                <TableCell>{losers.prevAvgPrice}</TableCell>
                                <TableCell>{losers.newAvgPrice}</TableCell>
                                <TableCell>{losers.percentChange}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Card className="col-span-4 row-span-4 gap-0 p-2">
            <CardHeader className="p-0 pl-1 gap-1 text-center">
                    <CardTitle className="text-xs text-muted-foreground flex items-center">
                        <ChevronsUp className="text-primary" />
                        <span>Top Stable Vegetables</span>
                    </CardTitle>
                </CardHeader>
                <Table className="text-xs">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Prices Count</TableHead>
                            <TableHead>Last Recording</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {stableCrops.map((stable) => (
                            <TableRow key={stable.name}>
                                <TableCell>{stable.name}</TableCell>
                                <TableCell>{stable.pricesCount}</TableCell>
                                <TableCell>{stable.lastRecorded}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <CardHeader className="p-0 pl-1 gap-1 text-center">
                    <CardTitle className="text-xs text-muted-foreground flex items-center">
                        <ChevronsDown className="text-destructive" />
                        <span>Top Unstable Vegetables</span>
                    </CardTitle>
                </CardHeader>
                <Table className="text-xs">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Prices Count</TableHead>
                            <TableHead>Last Recording</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {unstableCrops.map((unstable) => (
                            <TableRow key={unstable.name}>
                                <TableCell>{unstable.name}</TableCell>
                                <TableCell>{unstable.pricesCount}</TableCell>
                                <TableCell>{unstable.lastRecorded}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}