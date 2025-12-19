import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navigation from '@/components/Navigation/Navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import LeftSidebar from '@/components/Sidebars/LeftSidebar';
import AdminProfile from '@/components/admin/AdminProfile';
import ApprovedProfile from '@/components/approved/ApprovedProfile';

export default function AppLayout({ 
    children, 
    title,
    leftSidebar = null,
    leftSidebarTitle = '',
    rightSidebarContent = null,
    rightSidebarBadge = 0,
    rightSidebarTitle = '',
    showMap = true,
    mapContent = null
}) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false)
    return (
        <>
            <Head title={title} />
            
            <div className="h-screen flex flex-col">
                {/* Map/Content Background */}
                <div className="fixed inset-0 top-16 z-0">
                    {showMap ? mapContent : <div className="bg-white w-full h-full" />}
                </div>

                {/* Navigation */}
                <Navigation onMobileMenuToggle={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)} setOpenProfile={setOpenProfile} />

                {/* Content */}
                <div className='relative flex flex-row overflow-hidden justify-between pointer-events-none h-full'>
                    {/* Left Sidebar */}
                    {leftSidebar && (
                        <LeftSidebar
                            isOpen={isLeftSidebarOpen}
                            onClose={() => setIsLeftSidebarOpen(false)}
                            title={leftSidebarTitle}
                        >
                            {leftSidebar}
                        </LeftSidebar>
                    )}

                    {/* Main Content Area */}
                    <div className='grow overflow-y-auto pr-12 pointer-events-none '>
                        <div className='pointer-events-auto p-6'>
                            {children}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    {auth.user?.isApproved && (
                        <Sheet open={openProfile} onOpenChange={setOpenProfile}>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>{auth.user?.name} Panel</SheetTitle>
                                    <SheetDescription>
                                        {auth.user?.isAdmin
                                            ? 'Check the pending farmers and verify'
                                            : 'This is your profile'
                                        }
                                    </SheetDescription>
                                </SheetHeader>
                                    <div className='px-4'>
                                        {auth.user?.isAdmin
                                            ? (<AdminProfile />)
                                            : (<ApprovedProfile />)
                                        }
                                    </div>
                                    
                                <SheetFooter>

                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                        
                    )}

                    {/* <RightSidebar openProfile={openProfile}>
                            {auth.user?.isAdmin
                            ? (<AdminPendingPanel />)
                            : (<FarmerProfilePanel />)}
                        </RightSidebar> */}
                </div>
            </div>
        </>
    );
}