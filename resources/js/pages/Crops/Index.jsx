import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CategoryFilter from '@/Components/Crops/CategoryFilter';
import FarmerProfilePanel from '@/Components/Sidebars/FarmerProfilePanel';
import AdminPendingPanel from '@/Components/Sidebars/AdminPendingPanel';
import CropGrid from '@/Components/Crops/CropGrid';
import CropFormModal from '@/Components/Modals/Crops/CropFormModal';

export default function Index({ crops, categories, filters }) {
    const { auth, pendingFarmers } = usePage().props;
    const isAdmin = auth.user?.isAdmin;
    const isApprovedFarmer = auth.user && !auth.user.isAdmin && auth.user.isApproved;

    // State management
    const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCrop, setEditingCrop] = useState(null);

    // Filter crops client-side
    const displayedCrops = crops.filter(crop => {
        const matchesCategory = selectedCategory ? crop.category_id == selectedCategory : true;
        const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handlers
    const handleCategoryClick = (categoryId) => {
        const newCategory = categoryId === selectedCategory ? '' : categoryId;
        setSelectedCategory(newCategory);
        router.get(
            route('crops.index'),
            newCategory ? { category_id: newCategory } : {},
            { preserveState: true, replace: true }
        );
    };

    const openCreateModal = (categoryId) => {
        setEditingCrop({ category_id: categoryId });
        setIsCreateModalOpen(true);
    };

    const openEditModal = (crop) => {
        setEditingCrop(crop);
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setEditingCrop(null);
    };

    const handleDelete = (crop) => {
        if (confirm(`Delete ${crop.name}? This action cannot be undone.`)) {
            router.delete(route('crops.destroy', crop.id));
        }
    };

    // Render components
    const leftSidebar = (
        <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isAdmin={isAdmin}
            onAddCrop={openCreateModal}
        />
    );

    const rightSidebarContent = isAdmin 
        ? <AdminPendingPanel />
        : isApprovedFarmer 
        ? <FarmerProfilePanel />
        : null;

    const rightSidebarTitle = isAdmin ? "Pending Accounts" : isApprovedFarmer ? "Your Profile" : null;

    return (
        <AppLayout
            title="Crops Page"
            leftSidebar={leftSidebar}
            leftSidebarTitle=""
            rightSidebarTitle={rightSidebarTitle}
            rightSidebarContent={rightSidebarContent}
            rightSidebarBadge={pendingFarmers?.length || 0}
            showMap={false}
        >
            <div className="w-full p-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <CropGrid
                        crops={displayedCrops}
                        isAdmin={isAdmin}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            <CropFormModal
                isOpen={isCreateModalOpen || isEditModalOpen}
                onClose={closeModals}
                crop={(isCreateModalOpen || isEditModalOpen) ? editingCrop : null}
                categories={categories}
            />
        </AppLayout>
    );
}