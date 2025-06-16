-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 09 juin 2025 à 18:04
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sahara_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add auth group', 7, 'add_authgroup'),
(26, 'Can change auth group', 7, 'change_authgroup'),
(27, 'Can delete auth group', 7, 'delete_authgroup'),
(28, 'Can view auth group', 7, 'view_authgroup'),
(29, 'Can add auth group permissions', 8, 'add_authgrouppermissions'),
(30, 'Can change auth group permissions', 8, 'change_authgrouppermissions'),
(31, 'Can delete auth group permissions', 8, 'delete_authgrouppermissions'),
(32, 'Can view auth group permissions', 8, 'view_authgrouppermissions'),
(33, 'Can add auth permission', 9, 'add_authpermission'),
(34, 'Can change auth permission', 9, 'change_authpermission'),
(35, 'Can delete auth permission', 9, 'delete_authpermission'),
(36, 'Can view auth permission', 9, 'view_authpermission'),
(37, 'Can add auth user', 10, 'add_authuser'),
(38, 'Can change auth user', 10, 'change_authuser'),
(39, 'Can delete auth user', 10, 'delete_authuser'),
(40, 'Can view auth user', 10, 'view_authuser'),
(41, 'Can add auth user groups', 11, 'add_authusergroups'),
(42, 'Can change auth user groups', 11, 'change_authusergroups'),
(43, 'Can delete auth user groups', 11, 'delete_authusergroups'),
(44, 'Can view auth user groups', 11, 'view_authusergroups'),
(45, 'Can add auth user user permissions', 12, 'add_authuseruserpermissions'),
(46, 'Can change auth user user permissions', 12, 'change_authuseruserpermissions'),
(47, 'Can delete auth user user permissions', 12, 'delete_authuseruserpermissions'),
(48, 'Can view auth user user permissions', 12, 'view_authuseruserpermissions'),
(49, 'Can add boutique', 13, 'add_boutique'),
(50, 'Can change boutique', 13, 'change_boutique'),
(51, 'Can delete boutique', 13, 'delete_boutique'),
(52, 'Can view boutique', 13, 'view_boutique'),
(53, 'Can add commande', 14, 'add_commande'),
(54, 'Can change commande', 14, 'change_commande'),
(55, 'Can delete commande', 14, 'delete_commande'),
(56, 'Can view commande', 14, 'view_commande'),
(57, 'Can add django admin log', 15, 'add_djangoadminlog'),
(58, 'Can change django admin log', 15, 'change_djangoadminlog'),
(59, 'Can delete django admin log', 15, 'delete_djangoadminlog'),
(60, 'Can view django admin log', 15, 'view_djangoadminlog'),
(61, 'Can add django content type', 16, 'add_djangocontenttype'),
(62, 'Can change django content type', 16, 'change_djangocontenttype'),
(63, 'Can delete django content type', 16, 'delete_djangocontenttype'),
(64, 'Can view django content type', 16, 'view_djangocontenttype'),
(65, 'Can add django migrations', 17, 'add_djangomigrations'),
(66, 'Can change django migrations', 17, 'change_djangomigrations'),
(67, 'Can delete django migrations', 17, 'delete_djangomigrations'),
(68, 'Can view django migrations', 17, 'view_djangomigrations'),
(69, 'Can add django session', 18, 'add_djangosession'),
(70, 'Can change django session', 18, 'change_djangosession'),
(71, 'Can delete django session', 18, 'delete_djangosession'),
(72, 'Can view django session', 18, 'view_djangosession'),
(73, 'Can add orderitem', 19, 'add_orderitem'),
(74, 'Can change orderitem', 19, 'change_orderitem'),
(75, 'Can delete orderitem', 19, 'delete_orderitem'),
(76, 'Can view orderitem', 19, 'view_orderitem'),
(77, 'Can add paiement', 20, 'add_paiement'),
(78, 'Can change paiement', 20, 'change_paiement'),
(79, 'Can delete paiement', 20, 'delete_paiement'),
(80, 'Can view paiement', 20, 'view_paiement'),
(81, 'Can add produit', 21, 'add_produit'),
(82, 'Can change produit', 21, 'change_produit'),
(83, 'Can delete produit', 21, 'delete_produit'),
(84, 'Can view produit', 21, 'view_produit'),
(85, 'Can add categorie', 22, 'add_categorie'),
(86, 'Can change categorie', 22, 'change_categorie'),
(87, 'Can delete categorie', 22, 'delete_categorie'),
(88, 'Can view categorie', 22, 'view_categorie'),
(89, 'Can add client', 23, 'add_client'),
(90, 'Can change client', 23, 'change_client'),
(91, 'Can delete client', 23, 'delete_client'),
(92, 'Can view client', 23, 'view_client'),
(93, 'Can add fournisseur', 24, 'add_fournisseur'),
(94, 'Can change fournisseur', 24, 'change_fournisseur'),
(95, 'Can delete fournisseur', 24, 'delete_fournisseur'),
(96, 'Can view fournisseur', 24, 'view_fournisseur'),
(97, 'Can add produitimage', 25, 'add_produitimage'),
(98, 'Can change produitimage', 25, 'change_produitimage'),
(99, 'Can delete produitimage', 25, 'delete_produitimage'),
(100, 'Can view produitimage', 25, 'view_produitimage');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(7, 'pbkdf2_sha256$1000000$osIXQNBoUZXCvPj70d3ICu$4vR/xhf6NYwKwKR5m1L6JSN0lYlN/ujWmsupDDkLzrA=', '2025-06-02 15:38:24.829230', 0, 'junior555', 'sanon', 'fay', 'test@gmail.com', 0, 1, '2025-06-02 15:19:57.792557'),
(13, 'pbkdf2_sha256$1000000$XMrM9q1IQTte3gguWwpJCl$IJYlopgMDNpGZq19O2YeXPaVb+m5+l7xpuNtiSx4khM=', '2025-06-05 15:51:48.800308', 1, 'junior', '', '', 'sanoncheickfaycal7@gmail.com', 1, 1, '2025-06-05 10:52:35.594170'),
(19, 'pbkdf2_sha256$1000000$gjzM3FGX55tw7DfslQ90AG$RSJktUq9sk2x9pQ4QSogSfRW5jzKu3yNWHisAeNc4QI=', NULL, 0, 'Iwan Juste', '', '', 'iwanjstbado@gmail.com', 0, 1, '2025-06-05 15:51:27.306023');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `boutique`
--

DROP TABLE IF EXISTS `boutique`;
CREATE TABLE IF NOT EXISTS `boutique` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fournisseur_id` int NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fournisseur_id` (`fournisseur_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `adresse` varchar(255) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `code_postal` varchar(10) NOT NULL,
  `pays` varchar(100) NOT NULL,
  `date_inscription` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id`, `nom`, `prenom`, `email`, `telephone`, `adresse`, `ville`, `code_postal`, `pays`, `date_inscription`) VALUES
(6, 'fay', 'sanon', 'test@gmail.com', '05447730', 'Ouagadougou', 'ouaga', '', 'FR', '2025-06-02 15:19:58');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date_commande` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `statut` enum('en attente','payée','expédiée','livrée') DEFAULT 'en attente',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`)
) ;

--
-- Déchargement des données de la table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-06-05 15:37:51.182108', '9', 'Fournisseur object (9)', 2, '[{\"changed\": {\"fields\": [\"Statut\"]}}]', 24, 13),
(2, '2025-06-05 16:05:24.635363', '10', 'Fournisseur object (10)', 2, '[{\"changed\": {\"fields\": [\"Statut\", \"Site web\"]}}]', 24, 13);

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(7, 'sahara_webapp', 'authgroup'),
(8, 'sahara_webapp', 'authgrouppermissions'),
(9, 'sahara_webapp', 'authpermission'),
(10, 'sahara_webapp', 'authuser'),
(11, 'sahara_webapp', 'authusergroups'),
(12, 'sahara_webapp', 'authuseruserpermissions'),
(13, 'sahara_webapp', 'boutique'),
(22, 'sahara_webapp', 'categorie'),
(23, 'sahara_webapp', 'client'),
(14, 'sahara_webapp', 'commande'),
(15, 'sahara_webapp', 'djangoadminlog'),
(16, 'sahara_webapp', 'djangocontenttype'),
(17, 'sahara_webapp', 'djangomigrations'),
(18, 'sahara_webapp', 'djangosession'),
(24, 'sahara_webapp', 'fournisseur'),
(19, 'sahara_webapp', 'orderitem'),
(20, 'sahara_webapp', 'paiement'),
(21, 'sahara_webapp', 'produit'),
(25, 'sahara_webapp', 'produitimage'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-06-02 11:59:44.421414'),
(2, 'auth', '0001_initial', '2025-06-02 11:59:46.206893'),
(3, 'admin', '0001_initial', '2025-06-02 11:59:46.589401'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-06-02 11:59:46.602053'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-06-02 11:59:46.614770'),
(6, 'contenttypes', '0002_remove_content_type_name', '2025-06-02 11:59:46.770557'),
(7, 'auth', '0002_alter_permission_name_max_length', '2025-06-02 11:59:46.919880'),
(8, 'auth', '0003_alter_user_email_max_length', '2025-06-02 11:59:47.072012'),
(9, 'auth', '0004_alter_user_username_opts', '2025-06-02 11:59:47.081508'),
(10, 'auth', '0005_alter_user_last_login_null', '2025-06-02 11:59:47.205725'),
(11, 'auth', '0006_require_contenttypes_0002', '2025-06-02 11:59:47.210388'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2025-06-02 11:59:47.222054'),
(13, 'auth', '0008_alter_user_username_max_length', '2025-06-02 11:59:47.370038'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2025-06-02 11:59:47.488340'),
(15, 'auth', '0010_alter_group_name_max_length', '2025-06-02 11:59:47.669472'),
(16, 'auth', '0011_update_proxy_permissions', '2025-06-02 11:59:47.685818'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2025-06-02 11:59:47.840122'),
(18, 'sahara_webapp', '0001_initial', '2025-06-02 11:59:47.851953'),
(19, 'sessions', '0001_initial', '2025-06-02 11:59:47.920873'),
(20, 'sahara_webapp', '0002_categorie_client_fournisseur_produitimage', '2025-06-02 12:47:08.925211'),
(21, 'sahara_webapp', '0003_alter_fournisseur_options', '2025-06-04 18:48:00.430667'),
(22, 'sahara_webapp', '0004_fournisseur_description_fournisseur_site_web_and_more', '2025-06-04 18:54:10.411489'),
(23, 'sahara_webapp', '0005_alter_fournisseur_options', '2025-06-04 18:54:48.001426'),
(24, 'sahara_webapp', '0006_alter_fournisseur_options', '2025-06-04 19:09:22.804483'),
(25, 'sahara_webapp', '0007_alter_fournisseur_options', '2025-06-05 09:30:52.433688');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('0moar5zqtmy0fh7zpzfeyu9je9k326ia', '.eJxVjMsOwiAQRf-FtSG8mhlcuvcbyMCAVA0kpV0Z_12bdKHbe865LxFoW2vYRl7CzOIstDj9bpHSI7cd8J3arcvU27rMUe6KPOiQ1875eTncv4NKo35rcNpaB2VihUCO0ZBLlBA9KusLIqDB7DUbW6JKCmNSPAHG4iMXC-L9AcLSN5I:1uM8Co:IsO9EN3yxj00FINsXttOIsNFcqqPhvN0euxYKVzYnoM', '2025-06-16 16:40:10.779154'),
('18jbwg3ts4ru8o0484ae1kfvwg8rocco', '.eJxVjDEOwyAQBP9CHSFjDmRSps8brOPuCE4ikIxdWfl7bMlF0myxM7ubGnFd8rg2mceJ1VUZqy6_ZUR6STkIP7E8qqZalnmK-lD0SZu-V5b37XT_DjK2vK-j6RyB93ZPEOgxQsAOhJ0JQ29gCOAZKXkm19mYggdLNglIomAsq88X8wE4BQ:1uND5o:yaPQSaJkH1RoGGgjeLWGFlf1QqcybEIHfwFKk9G9lzk', '2025-06-19 16:05:24.692385'),
('d2reep18aqfue0ewuz72uq7ra5ogzcd1', '.eJxVjMsOwiAQRf-FtSG8mhlcuvcbyMCAVA0kpV0Z_12bdKHbe865LxFoW2vYRl7CzOIstDj9bpHSI7cd8J3arcvU27rMUe6KPOiQ1875eTncv4NKo35rcNpaB2VihUCO0ZBLlBA9KusLIqDB7DUbW6JKCmNSPAHG4iMXC-L9AcLSN5I:1uMslt:PsNZj0iAcE2gEyatj_5xdiuI2HWiQXeY21rly8fPTOA', '2025-06-18 18:23:29.085474'),
('m2hwqsz9r6cgdyvycsa6ebxzmamqfcr7', '.eJxVjEFuwyAQRa9CZ21ZFIwNXXaXRU8QIgTDNCZNIfLYq6p3byylUrv97_33BSFu6xw2piWUDC-goPu7pYgfVHeQL7GeW4-trktJ_a70D8r9W8t0fX24_wJz5Pn-RpVIjzpmtNM4DcZoaxA1JinlMCjjrDVauecxOsyJUnRJZ6unmJ3Bd2f26CcxxzPxPXc8egjhwq3-rh46ITuhTCc8HCrjUm5raVXgtVBdxeL9JiW5jbmQeNp1Dx5OJ_j-AaCNVJU:1uM6Yx:Sg60M0UhBqTmS-1V_gQsvTkSZAwnR3PVTzCaKyp8I7A', '2025-06-16 14:54:55.143870');

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_entreprise` varchar(255) NOT NULL,
  `rccm` varchar(14) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `code_postal` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `pays` varchar(100) NOT NULL,
  `type_entreprise` varchar(50) NOT NULL,
  `date_inscription` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `statut` enum('en_attente','approuve','refuse') DEFAULT 'en_attente',
  `description` text,
  `site_web` varchar(200) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `document_identite` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rccm` (`rccm`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`id`, `nom_entreprise`, `rccm`, `telephone`, `adresse`, `ville`, `code_postal`, `pays`, `type_entreprise`, `date_inscription`, `statut`, `description`, `site_web`, `email`, `document_identite`) VALUES
(10, 'IWAN BUSINESS GOLD', '55555', '05447730', 'Ouagadougou', 'ouaga', NULL, 'FR', 'manufacturer', '2025-06-05 15:51:27', 'en_attente', '', 'https://www.IWANBUSINESSGOLD.com', 'iwanjstbado@gmail.com', 'documents_identite/Theme-Installation-et-Configuration-dHyper-V-sous-Windows-Server-2019_yFwQ0rI.pdf');

-- --------------------------------------------------------

--
-- Structure de la table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
CREATE TABLE IF NOT EXISTS `orderitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `produit_id` int NOT NULL,
  `quantite` int NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commande_id` (`commande_id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

DROP TABLE IF EXISTS `paiement`;
CREATE TABLE IF NOT EXISTS `paiement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int NOT NULL,
  `mode` enum('carte','paypal','virement') NOT NULL,
  `montant` decimal(10,2) NOT NULL,
  `statut` enum('réussi','échoué') DEFAULT 'réussi',
  `date_paiement` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `commande_id` (`commande_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `description` text,
  `prix` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `boutique_id` int NOT NULL,
  `categorie_id` int DEFAULT NULL,
  `date_ajout` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `boutique_id` (`boutique_id`),
  KEY `categorie_id` (`categorie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `produitimage`
--

DROP TABLE IF EXISTS `produitimage`;
CREATE TABLE IF NOT EXISTS `produitimage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produit_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `validation_fournisseur`
--

DROP TABLE IF EXISTS `validation_fournisseur`;
CREATE TABLE IF NOT EXISTS `validation_fournisseur` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `decision` varchar(10) NOT NULL,
  `date_decision` datetime(6) NOT NULL,
  `motif_refus` longtext,
  `fournisseur_id` bigint NOT NULL,
  `valide_par_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fournisseur_id` (`fournisseur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `validation_fournisseur`
--

INSERT INTO `validation_fournisseur` (`id`, `decision`, `date_decision`, `motif_refus`, `fournisseur_id`, `valide_par_id`) VALUES
(1, 'valide', '2025-06-05 15:52:30.765050', NULL, 10, 13);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Contraintes pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `boutique`
--
ALTER TABLE `boutique`
  ADD CONSTRAINT `boutique_ibfk_1` FOREIGN KEY (`fournisseur_id`) REFERENCES `fournisseur` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`commande_id`) REFERENCES `commande` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `paiement_ibfk_1` FOREIGN KEY (`commande_id`) REFERENCES `commande` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`boutique_id`) REFERENCES `boutique` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `produit_ibfk_2` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `produitimage`
--
ALTER TABLE `produitimage`
  ADD CONSTRAINT `produitimage_ibfk_1` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
