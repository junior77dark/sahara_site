        // Toggle du menu mobile
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileMenuToggle.classList.add('active');
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
        
        // Toggle du dropdown des catégories
        const categoriesBtn = document.getElementById('categories-btn');
        const categoriesDropdown = document.getElementById('categories-dropdown');
        
        categoriesBtn.addEventListener('click', function() {
            categoriesDropdown.classList.toggle('active');
        });
        
        // Fermer le dropdown quand on clique ailleurs
        document.addEventListener('click', function(event) {
            if (!categoriesDropdown.contains(event.target) && !categoriesBtn.contains(event.target)) {
                categoriesDropdown.classList.remove('active');
            }
        });
        
        // Toggle du sous-menu des catégories en mobile
        const mobileCategoriesToggle = document.getElementById('mobile-categories-toggle');
        const mobileCategoriesSubmenu = document.getElementById('mobile-categories-submenu');
        
        mobileCategoriesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mobileCategoriesSubmenu.classList.toggle('active');
        });