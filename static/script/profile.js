document.addEventListener('DOMContentLoaded', function() {
    // --- Gestion des onglets du profil ---
    const navLinks = document.querySelectorAll('.profile-nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.profile-tab-content');
    const contentTitle = document.querySelector('.profile-content-title');

    function activateTab(tabName) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-tab') === tabName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        tabContents.forEach(content => {
            if (content.getAttribute('data-content') === tabName) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
        if (contentTitle) {
            switch(tabName) {
                case 'orders':
                    contentTitle.textContent = document.getElementById('account-type').textContent === 'Fournisseur' ? 'Tableau de bord' : 'Historique des commandes';
                    break;
                case 'products':
                    contentTitle.textContent = 'Mes produits';
                    break;
                case 'security':
                    contentTitle.textContent = 'Sécurité et Informations';
                    break;
            }
        }
    }

    // Activation automatique selon l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const stepParam = urlParams.get('step');
    if (tabParam) {
        activateTab(tabParam);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            activateTab(tabName);
        });
    });

    // --- Gestion des sous-onglets/étapes de sécurité ---
    const steps = Array.from(document.querySelectorAll('.security-step'));
    const indicators = Array.from(document.querySelectorAll('.step-indicator'));
    const btnPrev = document.querySelector('.security-pagination .btn-prev');
    const btnNext = document.querySelector('.security-pagination .btn-next');
    let currentStep = 0;

    function updateSecurityStep() {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === currentStep);
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentStep);
        });
        if (btnPrev) btnPrev.style.display = currentStep === 0 ? 'none' : '';
        if (btnNext) btnNext.textContent = currentStep === steps.length - 1 ? 'Terminer' : 'Suivant';
    }

    // Activation automatique de l'étape de sécurité selon l'URL
    if (stepParam && steps.length) {
        const stepIndex = parseInt(stepParam, 10) - 1;
        if (!isNaN(stepIndex) && stepIndex >= 0 && stepIndex < steps.length) {
            currentStep = stepIndex;
        }
    }

    if (steps.length && indicators.length && btnNext) {
        updateSecurityStep();
        if (btnPrev) {
            btnPrev.addEventListener('click', function() {
                if (currentStep > 0) {
                    currentStep--;
                    updateSecurityStep();
                }
            });
        }
        btnNext.addEventListener('click', function() {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateSecurityStep();
            } else {
                // Dernière étape : revenir à la première étape
                currentStep = 0;
                updateSecurityStep();
            }
        });
        indicators.forEach((ind, i) => {
            ind.addEventListener('click', function() {
                currentStep = i;
                updateSecurityStep();
            });
        });
    }
}); 