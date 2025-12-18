export default function LeftSidebar({ isOpen, onClose, children }) {
    return (
        <div
            className={`
                fixed md:relative
                flex flex-none shrink-0 w-64 md:m-4 m-0 md:rounded-lg rounded-none bg-white shadow-lg z-40 border p-3
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                overflow-y-auto pointer-events-auto
                h-full md:h-auto
                left-0 md:left-auto
            `}
        >
            {/* Close button for mobile */}
            <button
                onClick={onClose}
                className="md:hidden absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Content */}
            <div className="mt-10 md:mt-0">
                {children}
            </div>
        </div>
    );
}