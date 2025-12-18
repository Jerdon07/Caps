import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Navigation({ onMobileMenuToggle }) {
    const page = usePage();
    const { auth } = page.props;
    const isHome = page.url === '/';
    const user = auth?.user;

    return (
        <nav className="bg-white border-b border-gray-200 z-50 relative">
            <div className="max-w-full px-3 md:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Left - Logo and Menu */}
                    <div className="flex items-center gap-2">
                        {/* Mobile Menu Button */}
                        {!isHome && (
                            <button
                                onClick={onMobileMenuToggle}
                                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}

                        <Link href="/" className="flex items-center">
                            <img 
                                src="/assets/hrvst.svg" 
                                alt="Hrvst" 
                                className="w-6 h-6 md:w-8 md:h-8 object-contain"
                            />
                            <span className="text-xl md:text-2xl font-bold text-gray-900">
                                Hrvst
                            </span>
                        </Link>
                    </div>

                    {/* Center - Navigation Links (Desktop) */}
                    {!isHome && (
                        <div className="hidden md:flex space-x-1">
                            <Link href={route('farmers.index')}>
                                <Button variant='ghost'>
                                    Farmers
                                </Button>
                            </Link>
                            <Link href={route('crops.index')}>
                                <Button variant='ghost'>
                                    Crops
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Right - Auth Buttons */}
                    <div className="flex items-center space-x-1 md:space-x-3">
                        {user ? (
                            <Link href={route('logout')} method="post">
                                <Button variant='outline' className="text-sm md:text-base px-2 md:px-4">
                                    <span className="hidden md:inline">Sign out</span>
                                    <span className="md:hidden">Out</span>
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')}>
                                    <Button variant="outline" className="text-sm md:text-base px-2 md:px-4">
                                        Log in
                                    </Button>
                                </Link>
                                
                                <Link href={route('register')}>
                                    <Button className="text-sm md:text-base px-2 md:px-4">
                                        Sign up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Links */}
                {!isHome && (
                    <div className="md:hidden flex gap-2 pb-2">
                        <Link href={route('farmers.index')} className="flex-1">
                            <Button variant='ghost' className="w-full">
                                Farmers
                            </Button>
                        </Link>
                        <Link href={route('crops.index')} className="flex-1">
                            <Button variant='ghost' className="w-full">
                                Crops
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
