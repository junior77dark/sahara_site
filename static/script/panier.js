document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour charger le panier depuis le serveur
    function chargerPanierServeur() {
        fetch('/panier/json/', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            afficherPanier(data.items);
        });
    }

    // Fonction pour afficher les articles dans le panier
    function afficherPanier(items) {
        const cartContainer = document.getElementById('cart-container');
        const cartItemsDiv = cartContainer.querySelector('.cart-items');
        const cartCount = document.getElementById('cart-count');
        const subtotal = document.getElementById('subtotal');
        const taxes = document.getElementById('taxes');
        const total = document.getElementById('total');

        cartItemsDiv.innerHTML = '';

        let totalCount = 0;
        let totalPrice = 0;

        items.forEach(item => {
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price} Fcfa</span>
                    <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-item-id="${item.id}">
                    <button class="remove-item-btn" data-item-id="${item.id}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });

        cartCount.textContent = `${totalCount} article${totalCount > 1 ? 's' : ''}`;
        subtotal.textContent = `${totalPrice.toLocaleString()} Fcfa`;
        taxes.textContent = `${(totalPrice * 0.2).toLocaleString()} Fcfa`;
        total.textContent = `${(totalPrice * 1.2).toLocaleString()} Fcfa`;

        // Listeners pour modification de quantité
        cartItemsDiv.querySelectorAll('.cart-item-quantity').forEach(input => {
            input.addEventListener('change', function() {
                const itemId = this.getAttribute('data-item-id');
                const quantite = parseInt(this.value);
                if (quantite > 0) {
                    fetch('/panier/modifier/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRFToken': getCSRFToken()
                        },
                        body: `item_id=${itemId}&quantite=${quantite}`
                    })
                    .then(response => response.json())
                    .then(() => chargerPanierServeur());
                }
            });
        });

        // Listeners pour suppression d'article
        cartItemsDiv.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.getAttribute('data-item-id');
                fetch('/panier/supprimer/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: `item_id=${itemId}`
                })
                .then(response => response.json())
                .then(() => chargerPanierServeur());
            });
        });
    }

    // Fonction utilitaire pour récupérer le CSRF token
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

    // Ajout au panier côté serveur
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            let produitId = productCard.getAttribute('data-produit-id');
            if (!produitId) {
                alert('Impossible d\'ajouter ce produit (id manquant)');
                return;
            }
            fetch('/panier/ajouter/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCSRFToken()
                },
                body: `produit_id=${produitId}&quantite=1`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    chargerPanierServeur();
                } else {
                    alert(data.message || 'Erreur lors de l\'ajout au panier');
                }
            });
        });
    });

    // Charge le panier au chargement de la page
    chargerPanierServeur();
});
