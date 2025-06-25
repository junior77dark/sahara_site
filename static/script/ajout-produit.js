// Variables globales pour la page d'ajout de produit
let uploadedImages = {
    main: null,
    additional: [null, null, null, null]
};

let characteristics = [];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeAddProductPage();
    setupImageUploads();
    setupCharacteristics();
    setupFormValidation();
    setupPreview();
    setupFormSubmission();
});

// Initialisation de la page d'ajout de produit
function initializeAddProductPage() {
    // Animation d'entrée pour les sections
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Initialiser une caractéristique par défaut
    addCharacteristic();
}

// Configuration des uploads d'images
function setupImageUploads() {
    // Photo principale
    const mainPhotoUpload = document.getElementById('main-photo-upload');
    const mainPhotoInput = document.getElementById('main-photo-input');
    
    if (mainPhotoUpload && mainPhotoInput) {
        mainPhotoUpload.addEventListener('click', () => {
            mainPhotoInput.click();
        });
        
        mainPhotoInput.addEventListener('change', (e) => {
            handleImageUpload(e, 'main');
        });
    }
    
    // Photos supplémentaires
    const additionalPhotos = document.querySelectorAll('.additional-photo');
    additionalPhotos.forEach((photoArea, index) => {
        const input = photoArea.querySelector('input[type="file"]');
        
        photoArea.addEventListener('click', () => {
            input.click();
        });
        
        input.addEventListener('change', (e) => {
            handleImageUpload(e, 'additional', index);
        });
    });
}

// Gestion de l'upload d'images
function handleImageUpload(event, type, index = null) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validation du fichier
    if (!validateImageFile(file)) {
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        if (type === 'main') {
            uploadedImages.main = imageData;
            displayMainImage(imageData);
        } else if (type === 'additional') {
            uploadedImages.additional[index] = imageData;
            displayAdditionalImage(imageData, index);
        }
    };
    
    reader.readAsDataURL(file);
}

// Validation du fichier image
function validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        showToast('Format de fichier non supporté. Utilisez JPG, PNG ou WebP.', 'error');
        return false;
    }
    
    if (file.size > maxSize) {
        showToast('Le fichier est trop volumineux. Taille maximum : 5MB.', 'error');
        return false;
    }
    
    return true;
}

// Afficher l'image principale
function displayMainImage(imageData) {
    const mainPhotoUpload = document.getElementById('main-photo-upload');
    const placeholder = mainPhotoUpload.querySelector('.upload-placeholder');
    const preview = mainPhotoUpload.querySelector('.photo-preview');
    const img = preview.querySelector('img');
    const removeBtn = preview.querySelector('.btn-remove-photo');
    
    placeholder.style.display = 'none';
    preview.style.display = 'block';
    img.src = imageData;
    
    // Bouton de suppression
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeMainImage();
    });
}

// Afficher une image supplémentaire
function displayAdditionalImage(imageData, index) {
    const photoArea = document.querySelector(`.additional-photo[data-index="${index}"]`);
    const placeholder = photoArea.querySelector('.upload-placeholder');
    const preview = photoArea.querySelector('.photo-preview');
    const img = preview.querySelector('img');
    const removeBtn = preview.querySelector('.btn-remove-photo');
    
    placeholder.style.display = 'none';
    preview.style.display = 'block';
    img.src = imageData;
    
    // Bouton de suppression
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeAdditionalImage(index);
    });
}

// Supprimer l'image principale
function removeMainImage() {
    uploadedImages.main = null;
    const mainPhotoUpload = document.getElementById('main-photo-upload');
    const placeholder = mainPhotoUpload.querySelector('.upload-placeholder');
    const preview = mainPhotoUpload.querySelector('.photo-preview');
    const input = document.getElementById('main-photo-input');
    
    placeholder.style.display = 'block';
    preview.style.display = 'none';
    input.value = '';
}

// Supprimer une image supplémentaire
function removeAdditionalImage(index) {
    uploadedImages.additional[index] = null;
    const photoArea = document.querySelector(`.additional-photo[data-index="${index}"]`);
    const placeholder = photoArea.querySelector('.upload-placeholder');
    const preview = photoArea.querySelector('.photo-preview');
    const input = photoArea.querySelector('input[type="file"]');
    
    placeholder.style.display = 'block';
    preview.style.display = 'none';
    input.value = '';
}

// Configuration des caractéristiques techniques
function setupCharacteristics() {
    const addCharacteristicBtn = document.getElementById('add-characteristic');
    
    if (addCharacteristicBtn) {
        addCharacteristicBtn.addEventListener('click', addCharacteristic);
    }
}

// Ajouter une nouvelle caractéristique
function addCharacteristic() {
    const container = document.getElementById('characteristics-container');
    const characteristicItem = document.createElement('div');
    characteristicItem.className = 'characteristic-item';
    
    characteristicItem.innerHTML = `
        <div class="form-group">
            <label class="form-label">Nom de la caractéristique</label>
            <input type="text" class="form-input characteristic-name" placeholder="Ex: Écran">
        </div>
        <div class="form-group">
            <label class="form-label">Valeur</label>
            <input type="text" class="form-input characteristic-value" placeholder="Ex: 6.7 pouces OLED">
        </div>
        <button type="button" class="btn-remove-characteristic" title="Supprimer cette caractéristique">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(characteristicItem);
    
    // Animation d'apparition
    characteristicItem.style.opacity = '0';
    characteristicItem.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        characteristicItem.style.transition = 'all 0.5s ease';
        characteristicItem.style.opacity = '1';
        characteristicItem.style.transform = 'translateY(0)';
    }, 100);
    
    // Bouton de suppression
    const removeBtn = characteristicItem.querySelector('.btn-remove-characteristic');
    removeBtn.addEventListener('click', () => {
        removeCharacteristic(characteristicItem);
    });
}

// Supprimer une caractéristique
function removeCharacteristic(characteristicItem) {
    const container = document.getElementById('characteristics-container');
    
    // Vérifier qu'il reste au moins une caractéristique
    if (container.children.length <= 1) {
        showToast('Vous devez conserver au moins une caractéristique.', 'error');
        return;
    }
    
    // Animation de suppression
    characteristicItem.style.transition = 'all 0.3s ease';
    characteristicItem.style.opacity = '0';
    characteristicItem.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
        container.removeChild(characteristicItem);
    }, 300);
}

// Configuration de la validation du formulaire
function setupFormValidation() {
    const form = document.getElementById('add-product-form');
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

// Valider un champ
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    clearFieldError(field);
    
    if (isRequired && !value) {
        showFieldError(field, 'Ce champ est obligatoire');
        return false;
    }
    
    // Validations spécifiques
    if (field.type === 'number' && value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue < 0) {
            showFieldError(field, 'Veuillez entrer un nombre valide');
            return false;
        }
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Veuillez entrer une adresse email valide');
            return false;
        }
    }
    
    showFieldSuccess(field);
    return true;
}

// Afficher une erreur de champ
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    // Supprimer le message d'erreur existant
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Ajouter le nouveau message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Afficher le succès d'un champ
function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    // Supprimer le message d'erreur
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Effacer l'erreur d'un champ
function clearFieldError(field) {
    field.classList.remove('error', 'success');
    
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Configuration de la prévisualisation
function setupPreview() {
    const previewBtn = document.getElementById('preview-product');
    const modal = document.getElementById('preview-modal');
    const closeBtn = document.getElementById('close-preview');
    const overlay = modal.querySelector('.modal-overlay');
    
    if (previewBtn) {
        previewBtn.addEventListener('click', showPreview);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePreview);
    }
    
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                hidePreview();
            }
        });
    }
    
    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hidePreview();
        }
    });
}

// Afficher la prévisualisation
function showPreview() {
    const productData = collectFormData();
    
    if (!validatePreviewData(productData)) {
        return;
    }
    
    const modal = document.getElementById('preview-modal');
    const previewContent = document.getElementById('preview-content');
    
    previewContent.innerHTML = generatePreviewHTML(productData);
    modal.classList.add('show');
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
}

// Masquer la prévisualisation
function hidePreview() {
    const modal = document.getElementById('preview-modal');
    modal.classList.remove('show');
    
    // Restaurer le scroll du body
    document.body.style.overflow = '';
}

// Collecter les données du formulaire
function collectFormData() {
    const form = document.getElementById('add-product-form');
    const formData = new FormData(form);
    
    const data = {
        name: formData.get('product-name') || '',
        category: formData.get('product-category') || '',
        price: formData.get('product-price') || '',
        warranty: formData.get('product-warranty') || '',
        description: formData.get('product-description') || '',
        characteristics: collectCharacteristics(),
        images: uploadedImages
    };
    
    return data;
}

// Collecter les caractéristiques
function collectCharacteristics() {
    const characteristicItems = document.querySelectorAll('.characteristic-item');
    const characteristics = [];
    
    characteristicItems.forEach(item => {
        const name = item.querySelector('.characteristic-name').value.trim();
        const value = item.querySelector('.characteristic-value').value.trim();
        
        if (name && value) {
            characteristics.push({ name, value });
        }
    });
    
    return characteristics;
}

// Valider les données pour la prévisualisation
function validatePreviewData(data) {
    if (!data.name) {
        showToast('Veuillez entrer le nom du produit', 'error');
        return false;
    }
    
    if (!data.description) {
        showToast('Veuillez entrer une description', 'error');
        return false;
    }
    
    if (!data.images.main) {
        showToast('Veuillez ajouter au moins la photo principale', 'error');
        return false;
    }
    
    return true;
}

// Générer le HTML de prévisualisation
function generatePreviewHTML(data) {
    const additionalImages = data.images.additional.filter(img => img !== null);
    
    return `
        <div class="preview-product">
            <div class="preview-images">
                <img src="${data.images.main}" alt="${data.name}" class="preview-main-image">
                ${additionalImages.length > 0 ? `
                    <div class="preview-thumbnails">
                        ${additionalImages.map(img => `
                            <img src="${img}" alt="Photo supplémentaire" class="preview-thumbnail">
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="preview-info">
                <h3>${data.name}</h3>
                <div class="preview-price">${formatPrice(data.price)} FCFA</div>
                <div class="preview-description">${data.description}</div>
                
                ${data.characteristics.length > 0 ? `
                    <div class="preview-characteristics">
                        <h4>Caractéristiques techniques</h4>
                        ${data.characteristics.map(char => `
                            <div class="preview-characteristic">
                                <span class="characteristic-name">${char.name}:</span>
                                <span class="characteristic-value">${char.value}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="preview-warranty">
                    <strong>Garantie:</strong> ${data.warranty} an${data.warranty > 1 ? 's' : ''}
                </div>
            </div>
        </div>
    `;
}

// Formater le prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price);
}

// Configuration de la soumission du formulaire
function setupFormSubmission() {
    const form = document.getElementById('add-product-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

// Gérer la soumission du formulaire
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validation complète du formulaire
    if (!validateCompleteForm()) {
        return;
    }
    
    // Afficher l'état de chargement
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simuler l'envoi (remplacer par l'appel API réel)
    setTimeout(() => {
        const productData = collectFormData();
        
        // Ici, vous pouvez envoyer les données à votre serveur
        console.log('Données du produit à envoyer:', productData);
        
        // Simulation de succès
        showToast('Produit ajouté avec succès !', 'success');
        
        // Réinitialiser le formulaire
        resetForm();
        
        // Restaurer le bouton
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
    }, 2000);
}

// Validation complète du formulaire
function validateCompleteForm() {
    const form = document.getElementById('add-product-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Valider tous les champs obligatoires
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Valider l'image principale
    if (!uploadedImages.main) {
        showToast('Veuillez ajouter au moins la photo principale', 'error');
        isValid = false;
    }
    
    // Valider les caractéristiques
    const characteristics = collectCharacteristics();
    if (characteristics.length === 0) {
        showToast('Veuillez ajouter au moins une caractéristique technique', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Réinitialiser le formulaire
function resetForm() {
    const form = document.getElementById('add-product-form');
    form.reset();
    
    // Réinitialiser les images
    uploadedImages = {
        main: null,
        additional: [null, null, null, null]
    };
    
    // Réinitialiser l'affichage des images
    removeMainImage();
    for (let i = 0; i < 4; i++) {
        removeAdditionalImage(i);
    }
    
    // Réinitialiser les caractéristiques
    const container = document.getElementById('characteristics-container');
    container.innerHTML = '';
    addCharacteristic();
    
    // Supprimer les classes de validation
    const fields = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    fields.forEach(field => {
        clearFieldError(field);
    });
}

// Fonction utilitaire pour afficher les notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    // Mettre à jour le contenu
    toastMessage.textContent = message;
    
    // Changer l'icône selon le type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toast.style.backgroundColor = '#27ae60';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toast.style.backgroundColor = '#e74c3c';
    } else if (type === 'info') {
        toastIcon.className = 'fas fa-info-circle';
        toast.style.backgroundColor = '#3498db';
    }
    
    // Afficher le toast
    toast.classList.add('show');
    
    // Masquer après 4 secondes
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Fonctions utilitaires pour les animations
function animateElement(element, animation) {
    element.style.animation = animation;
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    }, { once: true });
}

// Gestion du drag & drop pour les images
function setupDragAndDrop() {
    const uploadAreas = document.querySelectorAll('.photo-upload-area');
    
    uploadAreas.forEach(area => {
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('drag-over');
        });
        
        area.addEventListener('dragleave', () => {
            area.classList.remove('drag-over');
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const input = area.querySelector('input[type="file"]');
                input.files = files;
                input.dispatchEvent(new Event('change'));
            }
        });
    });
}

// Initialiser le drag & drop
document.addEventListener('DOMContentLoaded', setupDragAndDrop);

