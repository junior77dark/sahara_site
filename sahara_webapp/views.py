# Create your views here.
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from .models import Client, Fournisseur
from django.contrib.auth.decorators import login_required
from django.utils import timezone

# Pages principales
def accueil(request):
    return render(request, 'accueil.html')

def promotion(request):
    return render(request, 'promotion.html')

def contact(request):
    return render(request, 'contact.html')

# Pages catégories
def categorie_bijoux(request):
    return render(request, 'categories/categorie-bijoux.html')

def categorie_cuisine(request):
    return render(request, 'categories/categorie-cuisine.html')

def categorie_decoration(request):
    return render(request, 'categories/categorie-decoration.html')

def categorie_high_tech(request):
    return render(request, 'categories/categorie-high-tech.html')

def categorie_jeux(request):
    return render(request, 'categories/categorie-jeux.html')

def categorie_livres(request):
    return render(request, 'categories/categorie-livres.html')

def categorie_sport(request):
    return render(request, 'categories/categorie-sport.html')

def categorie_vetements(request):
    return render(request, 'categories/categorie-vetements.html')

# Pages utilisateur
def user_profile(request):
    return render(request, 'user-profile.html')

def login_view(request):
    if request.method == 'POST':
        login_field = request.POST.get('email')  # Peut être un email ou un username
        password = request.POST.get('password')
        
        if not login_field or not password:
            messages.error(request, "Veuillez remplir tous les champs.")
            return render(request, 'login.html')
        
        try:
            # Essayer d'abord de trouver l'utilisateur par email
            user = User.objects.filter(email=login_field).first()
            if user:
                # Si trouvé par email, authentifier avec le username
                username = user.username
            else:
                # Sinon, considérer que c'est un username
                username = login_field
            
            # Tentative d'authentification
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('accueil')
                else:
                    messages.error(request, "Votre compte n'est pas encore activé. Veuillez patienter.")
            else:
                messages.error(request, "Identifiants incorrects.")
                
        except Exception as e:
            print(f"Erreur de connexion: {str(e)}")
            messages.error(request, "Une erreur est survenue lors de la connexion.")
        
        return render(request, 'login.html', {'email': login_field})
    
    return render(request, 'login.html')

def inscription(request):
    if request.method == 'POST':
        form_type = request.POST.get('form_type')
        try:
            email = request.POST.get('email')
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')
            username = request.POST.get('username')

            if form_type == 'client':
                try:
                    # Validation des champs requis
                    required_fields = {
                        'username': "Le nom d'utilisateur",
                        'firstname': 'Le prénom',
                        'lastname': 'Le nom',
                        'email': "L'adresse email",
                        'password': 'Le mot de passe',
                        'confirm_password': 'La confirmation du mot de passe',
                        'address': "L'adresse",
                        'city': 'La ville',
                        'country': 'Le pays'
                    }
                    
                    for field, name in required_fields.items():
                        if not request.POST.get(field):
                            messages.error(request, f"{name} est obligatoire.")
                            return render(request, "s'inscrire.html")

                    # Validation username
                    if User.objects.filter(username=username).exists():
                        messages.error(request, "Ce nom d'utilisateur est déjà utilisé.")
                        return render(request, "s'inscrire.html")

                    # Validation email
                    if User.objects.filter(email=email).exists() or Client.objects.filter(email=email).exists():
                        messages.error(request, "Cette adresse email est déjà utilisée.")
                        return render(request, "s'inscrire.html")

                    # Validation mot de passe
                    if len(password) < 8:
                        messages.error(request, "Le mot de passe doit contenir au moins 8 caractères.")
                        return render(request, "s'inscrire.html")
                    
                    if password != confirm_password:
                        messages.error(request, "Les mots de passe ne correspondent pas.")
                        return render(request, "s'inscrire.html")

                    # Création du client
                    try:
                        client = Client.objects.create(
                            nom=request.POST.get('lastname'),
                            prenom=request.POST.get('firstname'),
                            email=email,
                            telephone=request.POST.get('phone'),
                            adresse=request.POST.get('address'),
                            ville=request.POST.get('city'),
                            code_postal=request.POST.get('postal'),
                            pays=request.POST.get('country'),
                            date_inscription=timezone.now()
                        )
                    except Exception as e:
                        # Si la création du client échoue, on supprime l'utilisateur s'il a été créé
                        if 'user' in locals():
                            user.delete()
                        raise e

                    # Création du compte utilisateur
                    user = User.objects.create_user(
                        username=username,
                        email=email,
                        password=password,
                        first_name=request.POST.get('firstname'),
                        last_name=request.POST.get('lastname')
                    )
                    
                    login(request, user)
                    messages.success(request, "Inscription client réussie !")
                    return redirect('login')
                    
                except Exception as e:
                    print(f"Erreur inscription client: {str(e)}")
                    messages.error(request, "Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
                    return render(request, "s'inscrire.html")

            elif form_type == 'business':
                try:
                    # Validation des champs requis
                    required_fields = {
                        'username': "Le nom d'utilisateur",
                        'business-name': "Le nom de l'entreprise",
                        'rccm': 'Le numéro RCCM',
                        'phone': 'Le numéro de téléphone',
                        'email': "L'adresse email professionnelle",
                        'password': 'Le mot de passe',
                        'confirm_password': 'La confirmation du mot de passe',
                        'address': "L'adresse de l'entreprise",
                        'city': 'La ville',
                        'country': 'Le pays',
                        'business-type': "Le type d'entreprise"
                    }
                    
                    for field, name in required_fields.items():
                        if not request.POST.get(field):
                            messages.error(request, f"{name} est obligatoire.")
                            return render(request, "s'inscrire.html")

                    # Validation username
                    if User.objects.filter(username=username).exists():
                        messages.error(request, "Ce nom d'utilisateur est déjà utilisé.")
                        return render(request, "s'inscrire.html")

                    # Validation email
                    if User.objects.filter(email=email).exists():
                        messages.error(request, "Cette adresse email est déjà utilisée.")
                        return render(request, "s'inscrire.html")

                    # Validation RCCM
                    if Fournisseur.objects.filter(rccm=request.POST.get('rccm')).exists():
                        messages.error(request, "Ce numéro RCCM est déjà enregistré.")
                        return render(request, "s'inscrire.html")

                    # Validation mot de passe
                    if len(password) < 8:
                        messages.error(request, "Le mot de passe doit contenir au moins 8 caractères.")
                        return render(request, "s'inscrire.html")
                    
                    if password != confirm_password:
                        messages.error(request, "Les mots de passe ne correspondent pas.")
                        return render(request, "s'inscrire.html")

                    # Création du fournisseur
                    fournisseur = Fournisseur.objects.create(
                        nom_entreprise=request.POST.get('business-name'),
                        rccm=request.POST.get('rccm'),
                        description=request.POST.get('description'),  # Optionnel
                        telephone=request.POST.get('phone'),
                        adresse=request.POST.get('address'),
                        ville=request.POST.get('city'),
                        code_postal=request.POST.get('postal'),  # Optionnel
                        pays=request.POST.get('country'),
                        type_entreprise=request.POST.get('business-type'),
                        site_web=request.POST.get('website'),  # Optionnel
                        date_inscription=timezone.now(),
                        statut='en_attente'
                    )

                    # Création du compte utilisateur pour le fournisseur
                    user = User.objects.create_user(
                        username=username,
                        email=email,
                        password=password
                    )
                    user.is_active = False  # Le compte sera activé après validation
                    user.save()
                    
                    messages.success(request, "Votre demande d'inscription fournisseur a été enregistrée. Elle sera examinée sous peu.")
                    return redirect('login')
                    
                except Exception as e:
                    print(f"Erreur inscription fournisseur: {str(e)}")
                    messages.error(request, "Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
                    return render(request, "s'inscrire.html")

            else:
                messages.error(request, "Type de formulaire invalide")
                return render(request, "s'inscrire.html")
                
        except Exception as e:
            print(f"Erreur détaillée: {str(e)}")
            messages.error(request, f"Erreur lors de l'inscription: {str(e)}")
            return render(request, "s'inscrire.html")

    return render(request, "s'inscrire.html")

@login_required
def logout_view(request):
    logout(request)
    messages.info(request, "Vous avez été déconnecté avec succès.")  
    return redirect('login')

# Pages fournisseur
def espace_fournisseur(request):
    return render(request, 'espace_fournisseur.html')
def add_product(request):
    return render(request, 'add-product.html')

# Page panier
def panier(request):
    return render(request, 'panier.html')
