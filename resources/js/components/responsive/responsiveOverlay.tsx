/* Used for a responsive Overlay, either a Dialog or a Drawer */

import { 
    Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";

import {
    Drawer, DrawerContent, DrawerHeader, DrawerTitle
} from '@/components/ui/drawer'

import { useMounted } from "@/hooks/useMounted";
import useMediaQuery from '@/components/responsive/useMediaQuery'

export default function ResponsiveOverlay ({
    open,
    onOpenChange,
    title,
    children
}:{
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    children: React.ReactNode
}) {
    const mounted = useMounted()
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if(!mounted) return null

    if(isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="p-5">
                    <div className='m-auto w-full max-w-sm'>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                        </DialogHeader>
                        {children}
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>
                    {children}
                </div>
                
            </DrawerContent>
        </Drawer>
    )
}