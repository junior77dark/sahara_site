document.addEventListener('DOMContentLoaded', function() {
    // Éléments du header et menu mobile
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileCategoriesToggle = document.getElementById('mobile-categories-toggle');
    const mobileCategoriesSubmenu = document.getElementById('mobile-categories-submenu');
    const categoriesDropdown = document.getElementById('categories-dropdown');
    const categoriesBtn = document.getElementById('categories-btn');
    
    // Éléments du formulaire
    const shopNameInput = document.getElementById('shopName');
    const ownerNameInput = document.getElementById('ownerName');
    const locationInput = document.getElementById('location');
    
    // Éléments d'erreur
    const shopNameError = document.getElementById('shopNameError');
    const ownerNameError = document.getElementById('ownerNameError');
    const locationError = document.getElementById('locationError');
    
    // Éléments de prévisualisation
    const previewSection = document.getElementById('previewSection');
    const previewShopName = document.getElementById('previewShopName');
    const previewOwnerName = document.getElementById('previewOwnerName');
    const previewLocation = document.getElementById('previewLocation');
    
    // Formulaire
    const createShopForm = document.getElementById('createShopForm');
    
    // Gestion du menu mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Empêcher le défilement du body quand le menu est ouvert
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Gestion des catégories en mobile
    if (mobileCategoriesToggle) {
        mobileCategoriesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            mobileCategoriesSubmenu.classList.toggle('active');
        });
    }
    
    // Gestion du dropdown des catégories en desktop
    if (categoriesBtn) {
        categoriesBtn.addEventListener('click', function() {
            categoriesDropdown.classList.toggle('active');
            
            // Fermer le dropdown quand on clique ailleurs
            document.addEventListener('click', function closeDropdown(e) {
                if (!categoriesDropdown.contains(e.target) && e.target !== categoriesBtn) {
                    categoriesDropdown.classList.remove('active');
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
    }
    
    // Fermer le menu mobile quand on clique sur un lien
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a:not(.mobile-categories-toggle a)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Fermer le menu mobile lors du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fonction pour valider le formulaire
    function validateForm() {
        let isValid = true;
        
        // Validation du nom de la boutique
        if (!shopNameInput.value.trim()) {
            shopNameError.style.display = 'block';
            isValid = false;
        } else {
            shopNameError.style.display = 'none';
        }
        
        // Validation du nom du propriétaire
        if (!ownerNameInput.value.trim()) {
            ownerNameError.style.display = 'block';
            isValid = false;
        } else {
            ownerNameError.style.display = 'none';
        }
        
        // Validation de la localisation
        if (!locationInput.value.trim()) {
            locationError.style.display = 'block';
            isValid = false;
        } else {
            locationError.style.display = 'none';
        }
        
        return isValid;
    }
    
    // Fonction pour mettre à jour la prévisualisation
    function updatePreview() {
        previewShopName.textContent = shopNameInput.value || 'Nom de la boutique';
        previewOwnerName.textContent = `Propriétaire: ${ownerNameInput.value || 'Nom du propriétaire'}`;
        previewLocation.textContent = locationInput.value || 'Localisation';
        
        previewSection.style.display = 'block';
        
        // Scroll to preview section
        previewSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Fonction pour télécharger les informations de la boutique
    function downloadShopInfo() {
        if (!validateForm()) {
            return;
        }
        
        const shopData = {
            shopName: shopNameInput.value,
            ownerName: ownerNameInput.value,
            location: locationInput.value,
            createdAt: new Date().toISOString()
        };
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shopData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "boutique_info.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    
    // Événements du formulaire
    if (createShopForm) {
        createShopForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Afficher la prévisualisation
                updatePreview();
                
                // Simuler la création de la boutique
                setTimeout(() => {
                    alert('Votre boutique a été créée avec succès !');
                    
                    // Télécharger automatiquement les informations
                    downloadShopInfo();
                    
                    // En situation réelle, on enverrait les données au serveur ici
                    // puis on redirigerait vers la page de la boutique
                }, 500);
            }
        });
    }
    
    // Mise à jour en temps réel de la prévisualisation lors de la saisie
    if (shopNameInput && previewSection.style.display === 'block') {
        shopNameInput.addEventListener('input', function() {
            previewShopName.textContent = this.value || 'Nom de la boutique';
        });
    }
    
    if (ownerNameInput && previewSection.style.display === 'block') {
        ownerNameInput.addEventListener('input', function() {
            previewOwnerName.textContent = `Propriétaire: ${this.value || 'Nom du propriétaire'}`;
        });
    }
    
    if (locationInput && previewSection.style.display === 'block') {
        locationInput.addEventListener('input', function() {
            previewLocation.textContent = this.value || 'Localisation';
        });
    }
    
    // Gestion de la barre de recherche
    const searchInput = document.getElementById('search-input-center');
    const searchBtn = document.getElementById('search-btn-center');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            if (searchInput.value.trim()) {
                alert(`Recherche de "${searchInput.value}" (fonctionnalité à implémenter)`);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                alert(`Recherche de "${this.value}" (fonctionnalité à implémenter)`);
            }
        });
    }
    
    // Gestion du compteur de panier
    const cartCounter = document.getElementById('cart-counter');
    const cartIcon = document.getElementById('cart-icon');
    
    if (cartIcon && cartCounter) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartCounter.classList.add('bounce');
            
            // Retirer la classe après l'animation
            setTimeout(() => {
                cartCounter.classList.remove('bounce');
            }, 500);
        });
    }
    
    // Animations au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-up, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Exécuter une fois au chargement
    animateOnScroll();
    
    // Puis à chaque défilement
    window.addEventListener('scroll', animateOnScroll);
});
