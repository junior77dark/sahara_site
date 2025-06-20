document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const productsPerPage = 6; // Nombre de produits par page
    let currentPage = 1;
    const allProducts = document.querySelectorAll('.product-card');
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Éléments de pagination
    const paginationNumbers = document.querySelector('.pagination-numbers');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // Fonction pour générer les numéros de page
    function generatePaginationNumbers() {
        paginationNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = `pagination-item ${i === currentPage ? 'active' : ''}`;
            pageLink.textContent = i;
            
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                updateDisplay();
            });
            
            paginationNumbers.appendChild(pageLink);
        }
    }

    // Fonction pour afficher les produits de la page courante
    function showProducts(page) {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        allProducts.forEach((product, index) => {
            if (index >= start && index < end) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Fonction pour mettre à jour l'affichage
    function updateDisplay() {
        showProducts(currentPage);
        generatePaginationNumbers();
        updateNavigationButtons();
        // Faire défiler vers le haut de la section des produits
        document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
    }

    // Fonction pour mettre à jour l'état des boutons de navigation
    function updateNavigationButtons() {
        prevButton.classList.toggle('disabled', currentPage === 1);
        nextButton.classList.toggle('disabled', currentPage === totalPages);
    }

    // Gestionnaires d'événements pour les boutons précédent/suivant
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updateDisplay();
        }
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplay();
        }
    });

    // Initialisation
    updateDisplay();
});