// Generic Container

export default function RightSidebar({ isOpen, onToggle, children, badge }) {
    return (
        <>
            {/* Collapsed Strip - Always Visible */}
            <div
                className={`
                    fixed right-0 top-16 h-[calc(100vh-4rem)] bg-green-600 
                    transition-all duration-300 ease-in-out z-40 shadow-lg
                    ${isOpen ? 'w-80 md:w-96' : 'w-12'}
                `}
            >
                {/* Toggle Button */}
                <button
                    onClick={onToggle}
                    className="absolute left-2 top-4 text-white hover:text-green-100 transition-colors"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    ) : (
                        <>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {badge > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                                    {badge}
                                </span>
                            )}
                        </>
                    )}
                </button>

                {/* Expanded Content */}
                {isOpen && (
                    <div className="pt-16 px-4 pb-4 overflow-y-auto h-full">
                        {children}
                    </div>
                )}
            </div>

            {/* Spacer to prevent content overlap */}
            <div className={`transition-all duration-300 ${isOpen ? 'w-80 md:w-96' : 'w-12'}`} />
        </>
    );
}