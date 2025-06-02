-- Table Client
CREATE TABLE Client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    telephone VARCHAR(20),
    adresse VARCHAR(255) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Fournisseur
CREATE TABLE Fournisseur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_entreprise VARCHAR(255) NOT NULL,
    siret VARCHAR(14) NOT NULL UNIQUE,
    telephone VARCHAR(20) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    type_entreprise VARCHAR(50) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'approuve', 'refuse') DEFAULT 'en_attente'
);
-- Table Categorie (Catégorisation des produits)
CREATE TABLE Categorie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL
);

-- Table Boutique (Chaque fournisseur peut en créer une)
CREATE TABLE Boutique (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Produit (Ajout de la relation avec Categorie)
CREATE TABLE Produit (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    boutique_id INT NOT NULL,
    categorie_id INT NOT NULL,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (boutique_id) REFERENCES Boutique(id) ON DELETE CASCADE,
    FOREIGN KEY (categorie_id) REFERENCES Categorie(id) ON DELETE SET NULL
);

-- Table ProduitImage (Gestion des images des produits)
CREATE TABLE ProduitImage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (produit_id) REFERENCES Produit(id) ON DELETE CASCADE
);

-- Table Commande (Utilisateur géré par Django)
CREATE TABLE Commande (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en attente', 'payée', 'expédiée', 'livrée') DEFAULT 'en attente',
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);

-- Table OrderItem (Détails des produits commandés)
CREATE TABLE OrderItem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT NOT NULL,
    produit_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES Commande(id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES Produit(id) ON DELETE CASCADE
);

-- Table Paiement (Gestion des transactions)
CREATE TABLE Paiement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT NOT NULL,
    mode ENUM('carte', 'paypal', 'virement') NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    statut ENUM('réussi', 'échoué') DEFAULT 'réussi',
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commande_id) REFERENCES Commande(id) ON DELETE CASCADE
);