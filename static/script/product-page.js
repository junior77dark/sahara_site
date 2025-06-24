// Variables globales
let cartCount = 0;
let quantity = 1;
let selectedRating = 0;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    loadCartFromStorage();
    setupEventListeners();
    setupImageGallery();
    setupTabs();
    setupQuantityControls();
    setupMobileMenu();
    setupReviewForm();
});

// Initialisation des composants
function initializeComponents() {
    // Animation d'entrée pour les éléments
    const animatedElements = document.querySelectorAll('.product-container, .tabs-container');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Charger le panier depuis le localStorage
function loadCartFromStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartCount = cartItems.length;
    updateCartCounter();
}

// Mettre à jour le compteur du panier
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = cartCount;
        if (cartCount > 0) {
            cartCounter.classList.add('bounce');
            setTimeout(() => cartCounter.classList.remove('bounce'), 500);
        }
    }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Bouton d'ajout au panier
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }

    // Menu déroulant des catégories
    const categoriesBtn = document.getElementById('categories-btn');
    const categoriesDropdown = document.getElementById('categories-dropdown');
    if (categoriesBtn && categoriesDropdown) {
        categoriesBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            categoriesDropdown.classList.toggle('active');
        });

        // Fermer le menu en cliquant ailleurs
        document.addEventListener('click', function() {
            categoriesDropdown.classList.remove('active');
        });
    }

    // Barre de recherche
    const searchBtn = document.getElementById('search-btn-center');
    const searchInput = document.getElementById('search-input-center');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Configuration de la galerie d'images (simplifiée)
function setupImageGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Retirer la classe active de toutes les miniatures
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active à la miniature cliquée
            this.classList.add('active');
            
            // Changer l'image principale
            const newSrc = this.getAttribute('data-main');
            if (mainImage && newSrc) {
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = '1';
                }, 200);
            }
        });
    });
}

// Configuration des onglets
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Retirer la classe active de tous les boutons et contenus
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Afficher le contenu correspondant
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Configuration des variantes de produit
function setupProductVariants() {
    // Options de couleur
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.getAttribute('data-color');
            updateProductInfo();
        });
    });

    // Options de stockage
    const storageOptions = document.querySelectorAll('.storage-option');
    storageOptions.forEach(option => {
        option.addEventListener('click', function() {
            storageOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedStorage = this.getAttribute('data-storage');
            updateProductInfo();
        });
    });
}

// Configuration des contrôles de quantité
function setupQuantityControls() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            if (quantity < 10) {
                quantity++;
                quantityInput.value = quantity;
            }
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            const value = parseInt(this.value);
            if (value >= 1 && value <= 10) {
                quantity = value;
            } else {
                this.value = quantity;
            }
        });
    }
}

// Configuration du menu mobile
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileCategoriesToggle = document.getElementById('mobile-categories-toggle');
    const mobileCategoriesSubmenu = document.getElementById('mobile-categories-submenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }

    if (mobileCategoriesToggle && mobileCategoriesSubmenu) {
        mobileCategoriesToggle.addEventListener('click', function() {
            mobileCategoriesSubmenu.classList.toggle('active');
        });
    }

    // Fermer le menu mobile en cliquant sur un lien
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
}

// Ajouter au panier
function addToCart(e) {
    e.preventDefault();
    const addToCartBtn = document.getElementById('add-to-cart');
    const produitId = addToCartBtn ? addToCartBtn.getAttribute('data-produit-id') : null;
    const quantite = document.getElementById('quantity') ? document.getElementById('quantity').value : 1;
    if (!produitId) {
        showToast("Impossible d'ajouter ce produit (id manquant)", 'error');
        return;
    }
    fetch('/panier/ajouter/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCSRFToken()
        },
        body: `produit_id=${produitId}&quantite=${quantite}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateCartCounterServer();
            showToast('Produit ajouté au panier !', 'success');
        } else {
            showToast(data.message || "Erreur lors de l'ajout au panier", 'error');
        }
    })
    .catch(() => {
        showToast("Erreur réseau lors de l'ajout au panier", 'error');
    });
}

// Utilitaire pour CSRF token (reprendre de panier.js)
function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === ('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
}

// Mettre à jour le compteur du panier depuis le serveur
function updateCartCounterServer() {
    fetch('/panier/json/', {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        let totalCount = 0;
        data.items.forEach(item => {
            totalCount += item.quantity;
        });
        const cartCounter = document.getElementById('cart-counter');
        if (cartCounter) {
            cartCounter.textContent = totalCount;
            if (totalCount > 0) {
                cartCounter.classList.add('bounce');
                setTimeout(() => cartCounter.classList.remove('bounce'), 500);
    }
        }
    });
}

// Configuration du formulaire d'avis
function setupReviewForm() {
    const starRating = document.getElementById('star-rating');
    const reviewForm = document.getElementById('review-form');
    
    // Gestion des étoiles de notation
    if (starRating) {
        const stars = starRating.querySelectorAll('i');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                selectedRating = index + 1;
                updateStarDisplay(stars, selectedRating);
            });
            
            star.addEventListener('mouseenter', function() {
                updateStarDisplay(stars, index + 1);
            });
        });
        
        starRating.addEventListener('mouseleave', function() {
            updateStarDisplay(stars, selectedRating);
        });
    }
    
    // Soumission du formulaire d'avis
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReview();
        });
    }
}

// Mettre à jour l'affichage des étoiles
function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

// Soumettre un avis
function submitReview() {
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review-text').value;
    
    if (!reviewerName || !reviewText || selectedRating === 0) {
        showToast('Veuillez remplir tous les champs et donner une note', 'error');
        return;
    }
    
    // Créer le nouvel avis
    const newReview = {
        name: reviewerName,
        rating: selectedRating,
        text: reviewText,
        date: 'Maintenant'
    };
    
    // Ajouter l'avis à la liste
    addReviewToList(newReview);
    
    // Réinitialiser le formulaire
    document.getElementById('review-form').reset();
    selectedRating = 0;
    const stars = document.querySelectorAll('#star-rating i');
    updateStarDisplay(stars, 0);
    
    showToast('Votre avis a été publié !', 'success');
}

// Ajouter un avis à la liste
function addReviewToList(review) {
    const reviewsList = document.querySelector('.reviews-list');
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    
    const starsHtml = Array.from({length: 5}, (_, i) => 
        `<i class="fas fa-star${i < review.rating ? '' : ' far'}"></i>`
    ).join('');
    
    reviewItem.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <span class="reviewer-name">${review.name}</span>
                <div class="review-rating">
                    ${starsHtml}
                </div>
            </div>
            <span class="review-date">${review.date}</span>
        </div>
        <p class="review-text">${review.text}</p>
    `;
    
    // Ajouter en haut de la liste
    reviewsList.insertBefore(reviewItem, reviewsList.firstChild);
    
    // Animation d'apparition
    reviewItem.style.opacity = '0';
    reviewItem.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        reviewItem.style.transition = 'all 0.5s ease';
        reviewItem.style.opacity = '1';
        reviewItem.style.transform = 'translateY(0)';
    }, 100);
}

// Effectuer une recherche
function performSearch() {
    const searchInput = document.getElementById('search-input-center');
    const query = searchInput.value.trim();
    
    if (query) {
        showToast(`Recherche pour: "${query}"`, 'info');
        // Ici on pourrait rediriger vers une page de résultats
        console.log(`Recherche effectuée pour: ${query}`);
    }
}

// Afficher une modal d'image
function showImageModal(imageSrc) {
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${imageSrc}" alt="Image agrandie">
            </div>
        </div>
    `;
    
    // Ajouter les styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 4000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background-color: white;
        border-radius: 12px;
        padding: 20px;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: #666;
    `;
    
    const img = modal.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(modal);
    
    // Événements de fermeture
    closeBtn.addEventListener('click', () => document.body.removeChild(modal));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(modal);
        }
    });
    
    // Fermer avec Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Afficher une notification toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    // Mettre à jour le contenu
    toastMessage.textContent = message;
    
    // Changer l'icône selon le type
    toastIcon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle';
    
    // Afficher le toast
    toast.classList.add('show');
    
    // Masquer après 3 secondes
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Fonctions utilitaires pour les animations
function animateElement(element, animation) {
    element.style.animation = animation;
    element.addEventListener('animationend', function() {
        element.style.animation = '';
    }, { once: true });
}

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    // Fermer les menus ouverts lors du redimensionnement
    const categoriesDropdown = document.getElementById('categories-dropdown');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (categoriesDropdown) {
        categoriesDropdown.classList.remove('active');
    }
    
    if (mobileMenu && window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
    }
});

// Intersection Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .tab-content, .spec-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Gestion des erreurs d'images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/images/logo.png'; // Image de fallback
        });
    });
});

// Préchargement des images pour une meilleure performance
function preloadImages() {
    const imageUrls = [
        'assets/images/product-main.png',
        'assets/images/product-alt1.jpg',
        'assets/images/product-alt2.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Lancer le préchargement
preloadImages();

