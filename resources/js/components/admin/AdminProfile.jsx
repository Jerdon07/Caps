import { router, usePage } from "@inertiajs/react"
import { useState } from "react"

import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import ResponsiveOverlay from "@/components/responsive/responsiveOverlay"
import { Button } from "@/components/ui/button"

import MapDialog from "../Registration/MapDialog"

export default function AdminProfile() {
    const { pendingFarmers } = usePage().props
    const [selectedFarmer, setSelectedFarmer] = useState(null);

    const handleApprove = (id) => {
        if(confirm('Approve this farmer account?')) {
            router.post(route('admin.farmers.approve', id), {}, {
                preserveScroll: true,
            });
        } setSelectedFarmer = null;
    }
    const handleReject = (id) => {
        if (confirm('Reject and permanently delete this farmer account? This cannot be undone.')) {
            router.delete(route('admin.farmers.delete', id), {}, {
                preserveScroll: true,
            });
        } setSelectedFarmer = null;
    }
    
    return (
        <>
            {!pendingFarmers || pendingFarmers.length === 0 ? (
                <p>No Pending farmers</p>
            ) : (
                <ScrollArea className=" h-80 border-y-4 bg-sidebar rounded">
                    <div className="flex flex-col gap-2 p-4 ">
                        {pendingFarmers.map(farmer => (
                            <Item onClick={() => setSelectedFarmer(farmer)} key={farmer.id} variant="outline" className="bg-background cursor-pointer transition-all duration-200 hover:shadow-xl hover:border-primary">
                                <ItemMedia>
                                    <Avatar className="size-10">
                                        <AvatarImage src={`/storage/farmer_images/${farmer.image_path}`} />
                                        <AvatarFallback>{farmer.name?.slice(0,1)}</AvatarFallback>
                                    </Avatar>
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>{farmer.user.name}</ItemTitle>
                                    <ItemDescription>{farmer.barangay.name}, {farmer.municipality.name}, Benguet</ItemDescription>
                                </ItemContent>
                            </Item>
                        ))}
                    </div>
                </ScrollArea>
            )}

            <ResponsiveOverlay
                open={!!selectedFarmer}
                onOpenChange={(isOpen) => {
                    if (!isOpen) setSelectedFarmer(null)
                }}
                title={selectedFarmer?.user.name}
                description={`From ${selectedFarmer?.barangay.name}, ${selectedFarmer?.municipality.name}`}
            >
                <div className="rounded-sm overflow-hidden border border-gray-300 mb-4"
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerMove={(e) => e.stopPropagation()}
                    onPointerUp={(e) => e.stopPropagation()}
                >
                    {selectedFarmer && (
                        <MapDialog 
                            center={[parseFloat(selectedFarmer.latitude), parseFloat(selectedFarmer.longitude)]}
                            zoom={15}
                            onSelect={false}
                            markerPosition={[parseFloat(selectedFarmer.latitude), parseFloat(selectedFarmer.longitude)]}
                        />
                    )}
                </div>
                <div className='flex w-full gap-4'>
                    <Button onClick={() => handleReject(selectedFarmer?.user.id)} variant="destructive" className='flex-1'>Reject</Button>
                    <Button onClick={() => handleApprove(selectedFarmer?.user.id)} className='flex-1'>Approve</Button>
                </div>
            </ResponsiveOverlay>
        </>
        
    )
}