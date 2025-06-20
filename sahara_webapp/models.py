# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User

class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Boutique(models.Model):
    fournisseur = models.ForeignKey('Fournisseur', models.DO_NOTHING)
    nom = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    date_creation = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'boutique'


class Categorie(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categorie'


class Client(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=255)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    adresse = models.CharField(max_length=255)
    ville = models.CharField(max_length=100)
    code_postal = models.CharField(max_length=10, blank=True, null=True)  # Modification ici
    pays = models.CharField(max_length=100)
    date_inscription = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'client'


class Commande(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    date_commande = models.DateTimeField(blank=True, null=True)
    statut = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'commande'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'

STATUT_CHOICES = [
    ('en_attente', 'En attente'),
    ('valide', 'Validé'),
    ('refuse', 'Refusé'),
]

class Fournisseur(models.Model):
    id = models.AutoField(primary_key=True)
    nom_entreprise = models.CharField(max_length=255)
    rccm = models.CharField(unique=True, max_length=14)
    description = models.TextField(blank=True, null=True)  # Nouveau champ description
    telephone = models.CharField(max_length=20)
    adresse = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    ville = models.CharField(max_length=100)
    code_postal = models.CharField(max_length=10, blank=True, null=True)
    pays = models.CharField(max_length=100)
    type_entreprise = models.CharField(max_length=50)
    date_inscription = models.DateTimeField(blank=True, null=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
    site_web = models.URLField(max_length=200, blank=True, null=True)
    document_identite = models.FileField(upload_to='documents_identite/', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fournisseur'

class ValidationFournisseur(models.Model):
    fournisseur = models.OneToOneField(Fournisseur, on_delete=models.CASCADE)
    valide_par = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    decision = models.CharField(max_length=10, choices=[('valide', 'Validé'), ('refuse', 'Refusé')])
    date_decision = models.DateTimeField(auto_now_add=True)
    motif_refus = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'validation_fournisseur'

class Orderitem(models.Model):
    commande = models.ForeignKey(Commande, models.DO_NOTHING)
    produit = models.ForeignKey('Produit', models.DO_NOTHING)
    quantite = models.IntegerField()
    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'orderitem'


class Paiement(models.Model):
    commande = models.ForeignKey(Commande, models.DO_NOTHING)
    mode = models.CharField(max_length=8)
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    statut = models.CharField(max_length=6, blank=True, null=True)
    date_paiement = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'paiement'


class Produit(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(blank=True, null=True)
    boutique = models.ForeignKey(Boutique, models.DO_NOTHING)
    categorie = models.ForeignKey(Categorie, models.DO_NOTHING, blank=True, null=True)
    date_ajout = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'produit'


class Produitimage(models.Model):
    produit = models.ForeignKey(Produit, models.DO_NOTHING)
    image_url = models.ImageField(upload_to='produit/', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'produitimage'

class PanierItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    produit = models.ForeignKey('Produit', on_delete=models.CASCADE)
    quantite = models.PositiveIntegerField()
    date_ajout = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'produit')
        db_table = 'panier_item'
        managed = True