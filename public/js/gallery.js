// Image view modal functionality
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');

function viewImage(imagePath, description) {
    modalImage.src = imagePath;
    modalDescription.textContent = description;
    imageModal.style.display = 'block';
}

closeBtn.onclick = () => {
    imageModal.style.display = 'none';
}

// Delete confirmation modal functionality
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
let imageToDelete = null;

function confirmDelete(imageId) {
    imageToDelete = imageId;
    deleteModal.style.display = 'block';
}

confirmDeleteBtn.onclick = async () => {
    if (imageToDelete) {
        try {
            const response = await fetch(`/images/${imageToDelete}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                const element = document.querySelector(`[data-id="${imageToDelete}"]`);
                element.remove();
                deleteModal.style.display = 'none';
                
                // Reload if gallery is empty
                const gallery = document.querySelector('.gallery');
                if (!gallery.children.length) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }
};

cancelDeleteBtn.onclick = () => {
    deleteModal.style.display = 'none';
    imageToDelete = null;
};

// Close modals when clicking outside
window.onclick = (event) => {
    if (event.target === imageModal) {
        imageModal.style.display = 'none';
    }
    if (event.target === deleteModal) {
        deleteModal.style.display = 'none';
        imageToDelete = null;
    }
};