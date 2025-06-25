# Create your views here.
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.models import User
from .models import Client, Fournisseur, PanierItem, Produit, AvisProduit, Commande, Orderitem, Paiement, AuthUser, Boutique, Categorie, Produitimage
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.urls import reverse
from django.core.paginator import Paginator

# Pages principales
def accueil(request):
    produits = Produit.objects.all().order_by('-date_ajout')[:6]  # Les 6 produits les plus récents
    return render(request, 'accueil.html', {'produits': produits})

def promotion(request):
    return render(request, 'promotion.html')

def contact(request):
    return render(request, 'contact.html')

# Pages catégories
def categorie_bijoux(request):
    produits = Produit.objects.filter(categorie__nom__iexact='Bijoux')
    return render(request, 'categories/categorie-bijoux.html', {'produits': produits})

def categorie_cuisine(request):
    produits = Produit.objects.filter(categorie__nom__iexact='Cuisine')
    return render(request, 'categories/categorie-cuisine.html', {'produits': produits})

def categorie_decoration(request):
    produits = Produit.objects.filter(categorie__nom__iexact='Décoration')
    return render(request, 'categories/categorie-decoration.html', {'produits': produits})

def categorie_high_tech(request):
    produits = Produit.objects.filter(categorie__nom__iexact='High-Tech')
    return render(request, 'categories/categorie-high-tech.html', {'produits': produits})

def categorie_jeux(request):
    produits = Produit.objects.filter(categorie__nom__iexact='Jeux')
    return render(request, 'categories/categorie-jeux.html', {'produits': produits})

def categorie_livres(request):
    produits = Produit.objects.filter(categorie__nom__iexact='Livres')
    return render(request, 'categories/categorie-livres.html', {'produits': produits})

def categorie_sport(request):
    produits = Produit.objects.filter(categorie__nom__iexact='Sport')
    return render(request, 'categories/categorie-sport.html', {'produits': produits})

def categorie_vetements(request):
    produits = Produit.objects.filter(categorie__nom__iexact='Vêtements')
    return render(request, 'categories/categorie-vetements.html', {'produits': produits})

# Pages utilisateur
# Ajoutez cette vue modifiée dans votre views.py

@login_required
def user_profile(request):
    """
    Affiche le profil utilisateur avec ses informations personnelles
    """
    user = request.user
    user_type = 'Client'  # Par défaut
    user_info = None
    has_boutique = False
    try:
        # Vérifier si l'utilisateur est un client
        client = Client.objects.get(email=user.email)
        user_info = client
        user_type = 'Client'
    except Client.DoesNotExist:
        try:
            # Vérifier si l'utilisateur est un fournisseur
            fournisseur = Fournisseur.objects.get(email=user.email)
            user_info = fournisseur
            user_type = 'Fournisseur'
            # Vérifier s'il a une boutique
            has_boutique = Boutique.objects.filter(fournisseur=fournisseur).exists()
        except Fournisseur.DoesNotExist:
            # Utilisateur sans profil client ou fournisseur
            user_info = None
    
    # Formatage de la date d'inscription
    date_inscription = None
    if user_info and hasattr(user_info, 'date_inscription') and user_info.date_inscription:
        date_inscription = user_info.date_inscription.strftime("%B %Y")
        # Traduction des mois en français
        mois_fr = {
            'January': 'Janvier', 'February': 'Février', 'March': 'Mars',
            'April': 'Avril', 'May': 'Mai', 'June': 'Juin',
            'July': 'Juillet', 'August': 'Août', 'September': 'Septembre',
            'October': 'Octobre', 'November': 'Novembre', 'December': 'Décembre'
        }
        for eng, fr in mois_fr.items():
            date_inscription = date_inscription.replace(eng, fr)
    elif user.date_joined:
        date_inscription = user.date_joined.strftime("%B %Y")
        mois_fr = {
            'January': 'Janvier', 'February': 'Février', 'March': 'Mars',
            'April': 'Avril', 'May': 'Mai', 'June': 'Juin',
            'July': 'Juillet', 'August': 'Août', 'September': 'Septembre',
            'October': 'Octobre', 'November': 'Novembre', 'December': 'Décembre'
        }
        for eng, fr in mois_fr.items():
            date_inscription = date_inscription.replace(eng, fr)
    
    # Correction : utiliser AuthUser pour le filter des commandes
    try:
        auth_user = AuthUser.objects.get(email=user.email)
    except AuthUser.DoesNotExist:
        auth_user = None
    commandes_data = []
    if auth_user:
        commandes_payees = Commande.objects.filter(user=auth_user, paiement__isnull=False).distinct().order_by('-date_commande')
        for commande in commandes_payees:
            items = Orderitem.objects.filter(commande=commande).select_related('produit')
            paiement = Paiement.objects.filter(commande=commande).first()
            commandes_data.append({
                'commande': commande,
                'items': items,
                'paiement': paiement,
            })
    
    no_boutique_error = request.session.pop('no_boutique_error', None)
    produits = []
    page_obj = None
    if user_type == 'Fournisseur' and user_info:
        produits_qs = Produit.objects.filter(boutique__fournisseur=user_info)
        paginator = Paginator(produits_qs, 6)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        produits = page_obj.object_list
    context = {
        'user': user,
        'user_info': user_info,
        'user_type': user_type,
        'date_inscription': date_inscription,
        'commandes_data': commandes_data,
        'has_boutique': has_boutique,
        'no_boutique_error': no_boutique_error,
        'produits': produits,
        'page_obj': page_obj,
    }
    
    return render(request, 'user-profile.html', context)

def login_view(request): 
    if request.method == 'POST':
        login_field = request.POST.get('email')  # Peut être un email ou un username
        password = request.POST.get('password')
        
        if not login_field or not password:
            messages.error(request, "Veuillez remplir tous les champs.")
            return render(request, 'login.html')
        
        try:
            # On tente d'abord de retrouver l'utilisateur par email
            user = User.objects.filter(email=login_field).first()

            # Si aucun résultat, on tente par nom d'utilisateur
            if not user:
                user = User.objects.filter(username=login_field).first()

            if user:
                if not user.is_active:
                    messages.error(request, "Votre compte n'est pas encore activé. Veuillez patienter.")
                    return render(request, 'login.html', {'email': login_field})

                # Authentification
                user = authenticate(request, username=user.username, password=password)

                if user is not None:
                    login(request, user)
                    return redirect('accueil')
                else:
                    messages.error(request, "Mot de passe incorrect.")
            else:
                messages.error(request, "Aucun compte n'est associé à ces identifiants.")

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
                        email=email,
                        description=request.POST.get('description'),  # Optionnel
                        telephone=request.POST.get('phone'),
                        adresse=request.POST.get('address'),
                        ville=request.POST.get('city'),
                        code_postal=request.POST.get('postal'),  # Optionnel
                        pays=request.POST.get('country'),
                        type_entreprise=request.POST.get('business-type'),
                        site_web=request.POST.get('website'),  # Optionnel
                        date_inscription=timezone.now(),
                        document_identite=request.FILES.get('id'),
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
    user = request.user
    if not user.is_authenticated:
        return redirect('login')
    try:
        fournisseur = Fournisseur.objects.get(email=user.email)
    except Fournisseur.DoesNotExist:
        messages.error(request, "Vous devez être un fournisseur pour ajouter un produit.")
        return redirect('accueil')
    categories = Categorie.objects.all()
    boutiques = Boutique.objects.filter(fournisseur=fournisseur)
    if not boutiques.exists():
        from_profile = request.GET.get('from_profile')
        if from_profile == '1':
            # Redirige vers le profil avec message d'erreur et onglet produits
            url = reverse('user_profile') + '?tab=products'
            request.session['no_boutique_error'] = "Vous devez d'abord créer une boutique avant de pouvoir ajouter un produit."
            return redirect(url)
        else:
            messages.error(request, "Vous devez d'abord créer une boutique avant de pouvoir ajouter un produit.")
            return redirect('espace_fournisseur')
    if request.method == 'POST':
        nom = request.POST.get('nom')
        description = request.POST.get('description')
        prix = request.POST.get('prix')
        stock = request.POST.get('stock')
        categorie_id = request.POST.get('categorie')
        boutique_id = request.POST.get('boutique')
        main_photo = request.FILES.get('main_photo')
        additional_photos = request.FILES.getlist('additional_photos')
        # Validation minimale
        if not (nom and description and prix and stock and categorie_id and boutique_id and main_photo):
            messages.error(request, "Veuillez remplir tous les champs obligatoires et ajouter une photo principale.")
            return render(request, 'add-product.html', {'categories': categories, 'boutiques': boutiques})
        try:
            categorie = Categorie.objects.get(id=categorie_id)
            boutique = Boutique.objects.get(id=boutique_id)
            produit = Produit.objects.create(
                nom=nom,
                description=description,
                prix=prix,
                stock=stock,
                boutique=boutique,
                categorie=categorie,
                date_ajout=timezone.now()
            )
            # Photo principale
            Produitimage.objects.create(produit=produit, image_url=main_photo)
            # Photos supplémentaires
            for photo in additional_photos:
                if photo:
                    Produitimage.objects.create(produit=produit, image_url=photo)
            messages.success(request, "Produit ajouté avec succès !")
            return redirect('espace_fournisseur')
        except Exception as e:
            messages.error(request, f"Erreur lors de l'ajout du produit : {str(e)}")
    return render(request, 'add-product.html', {'categories': categories, 'boutiques': boutiques})

# Page panier
def panier(request):
    return render(request, 'panier.html')

@login_required
def afficher_panier(request):
    items = PanierItem.objects.filter(user=request.user).select_related('produit')
    total = sum(item.produit.prix * item.quantite for item in items)
    return render(request, 'panier.html', {'items': items, 'total': total})

@login_required
def ajouter_au_panier(request):
    if request.method == 'POST':
        produit_id = request.POST.get('produit_id')
        quantite = int(request.POST.get('quantite', 1))
        try:
            produit = Produit.objects.get(id=produit_id)
            item, created = PanierItem.objects.get_or_create(user=request.user, produit=produit)
            if not created:
                item.quantite += quantite
            else:
                item.quantite = quantite
            item.save()
            return JsonResponse({'success': True, 'message': 'Produit ajouté au panier.'})
        except Produit.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Produit introuvable.'})
    return JsonResponse({'success': False, 'message': 'Méthode non autorisée.'})

@login_required
def modifier_quantite_panier(request):
    if request.method == 'POST':
        item_id = request.POST.get('item_id')
        quantite = int(request.POST.get('quantite', 1))
        try:
            item = PanierItem.objects.get(id=item_id, user=request.user)
            if quantite > 0:
                item.quantite = quantite
                item.save()
                return JsonResponse({'success': True, 'message': 'Quantité modifiée.'})
            else:
                item.delete()
                return JsonResponse({'success': True, 'message': 'Produit supprimé du panier.'})
        except PanierItem.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Article introuvable.'})
    return JsonResponse({'success': False, 'message': 'Méthode non autorisée.'})

@login_required
def supprimer_du_panier(request):
    if request.method == 'POST':
        item_id = request.POST.get('item_id')
        try:
            item = PanierItem.objects.get(id=item_id, user=request.user)
            item.delete()
            return JsonResponse({'success': True, 'message': 'Produit supprimé du panier.'})
        except PanierItem.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Article introuvable.'})
    return JsonResponse({'success': False, 'message': 'Méthode non autorisée.'})

@login_required
def panier_json(request):
    if request.method == 'GET':
        items = PanierItem.objects.filter(user=request.user).select_related('produit')
        data = []
        for item in items:
            data.append({
                'id': item.id,
                'produit_id': item.produit.id,
                'name': item.produit.nom,
                'price': float(item.produit.prix),
                'image': item.produit.produitimage_set.first().image_url.url if hasattr(item.produit, 'produitimage_set') and item.produit.produitimage_set.exists() else '',
                'quantity': item.quantite,
            })
        return JsonResponse({'items': data})
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@login_required
@csrf_exempt
def verifier_mdp(request):
    if request.method == 'POST' and request.is_ajax():
        import json
        data = json.loads(request.body)
        current_password = data.get('current_password')
        if request.user.check_password(current_password):
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False})
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@login_required
@csrf_exempt
def changer_mdp(request):
    user = request.user
    step = request.GET.get('step') or request.POST.get('step') or '2'
    redirect_url = reverse('user_profile') + f'?tab=security&step={step}'
    if request.method == 'POST':
        current_password = request.POST.get('current_password')
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')
        if not user.check_password(current_password):
            messages.error(request, "Mot de passe actuel incorrect.")
            return HttpResponseRedirect(redirect_url)
        if new_password != confirm_password:
            messages.error(request, "La confirmation du nouveau mot de passe ne correspond pas.")
            return HttpResponseRedirect(redirect_url)
        if len(new_password) < 8:
            messages.error(request, "Le nouveau mot de passe doit contenir au moins 8 caractères.")
            return HttpResponseRedirect(redirect_url)
        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)  # Pour ne pas déconnecter l'utilisateur
        messages.success(request, "Mot de passe modifié avec succès.")
        return HttpResponseRedirect(redirect_url)
    return HttpResponseRedirect(redirect_url)

@login_required
@csrf_exempt
def maj_client(request):
    if request.method == 'POST' and request.is_ajax():
        user = request.user
        username = request.POST.get('username')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        photo = request.FILES.get('profile_photo')
        if username and username != user.username:
            if User.objects.filter(username=username).exclude(pk=user.pk).exists():
                return JsonResponse({'success': False, 'error': "Ce nom d'utilisateur est déjà utilisé."})
            user.username = username
        if email and email != user.email:
            if User.objects.filter(email=email).exclude(pk=user.pk).exists():
                return JsonResponse({'success': False, 'error': "Cette adresse email est déjà utilisée."})
            user.email = email
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        # Photo de profil (à stocker dans Client si champ prévu)
        try:
            client = Client.objects.get(email=user.email)
            if photo:
                path = default_storage.save(f'profile_photos/{user.pk}_{photo.name}', ContentFile(photo.read()))
                client.photo = path  # suppose un champ photo dans Client
                client.save()
        except Client.DoesNotExist:
            pass
        return JsonResponse({'success': True})
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@login_required
@csrf_exempt
def maj_fournisseur(request):
    if request.method == 'POST' and request.is_ajax():
        user = request.user
        company_name = request.POST.get('company_name')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        photo = request.FILES.get('profile_photo')
        if email and email != user.email:
            if User.objects.filter(email=email).exclude(pk=user.pk).exists():
                return JsonResponse({'success': False, 'error': "Cette adresse email est déjà utilisée."})
            user.email = email
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        try:
            fournisseur = Fournisseur.objects.get(email=user.email)
            if company_name:
                fournisseur.nom_entreprise = company_name
            if photo:
                path = default_storage.save(f'profile_photos/{user.pk}_{photo.name}', ContentFile(photo.read()))
                fournisseur.photo = path  # suppose un champ photo dans Fournisseur
            fournisseur.save()
        except Fournisseur.DoesNotExist:
            pass
        return JsonResponse({'success': True})
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@login_required
@csrf_exempt
def supprimer_boutique(request):
    if request.method == 'POST':
        try:
            fournisseur = Fournisseur.objects.get(email=request.user.email)
            # Suppression des produits liés à la boutique
            Produit.objects.filter(fournisseur=fournisseur).delete()
            fournisseur.delete()
            return JsonResponse({'success': True})
        except Fournisseur.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Boutique introuvable.'})
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@login_required
def supprimer_compte(request):
    if request.method == 'POST':
        user = request.user
        # Supprime explicitement Client et Fournisseur liés à l'email de l'utilisateur
        Client.objects.filter(email=user.email).delete()
        Fournisseur.objects.filter(email=user.email).delete()
        user.delete()
        logout(request)
        return redirect('accueil')
    return redirect('user_profile')

def description_produit(request, produit_id):
    produit = get_object_or_404(Produit, id=produit_id)
    if request.method == 'POST':
        nom = request.POST.get('reviewer-name')
        note = int(request.POST.get('rating', 0))
        commentaire = request.POST.get('review-text')
        user = request.user if request.user.is_authenticated else None
        if nom and note and commentaire:
            AvisProduit.objects.create(
                produit=produit,
                user=user,
                nom=nom,
                note=note,
                commentaire=commentaire
            )
            messages.success(request, "Votre avis a été publié !")
        else:
            messages.error(request, "Veuillez remplir tous les champs et donner une note.")
        return redirect('description_produit', produit_id=produit.id)
    avis = produit.avis.all()
    return render(request, 'description_produit.html', {'produit': produit, 'avis': avis})

@login_required
def mes_commandes(request):
    # Récupère les commandes de l'utilisateur qui ont un paiement associé (donc payées)
    commandes_payees = Commande.objects.filter(user=request.user, paiement__isnull=False).distinct().order_by('-date_commande')
    commandes_data = []
    for commande in commandes_payees:
        items = Orderitem.objects.filter(commande=commande).select_related('produit')
        paiement = Paiement.objects.filter(commande=commande).first()
        commandes_data.append({
            'commande': commande,
            'items': items,
            'paiement': paiement,
        })
    return render(request, 'mes_commandes.html', {'commandes_data': commandes_data})

@login_required
def modifier_infos(request):
    user = request.user
    user_type = 'Client'
    step = request.GET.get('step') or request.POST.get('step') or '1'
    redirect_url = reverse('user_profile') + f'?tab=security&step={step}'
    try:
        client = Client.objects.get(email=user.email)
        user_type = 'Client'
    except Client.DoesNotExist:
        try:
            fournisseur = Fournisseur.objects.get(email=user.email)
            user_type = 'Fournisseur'
        except Fournisseur.DoesNotExist:
            fournisseur = None
            client = None
    if request.method == 'POST':
        if user_type == 'Client':
            username = request.POST.get('username')
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            email = request.POST.get('email')
            telephone = request.POST.get('telephone')
            if username and username != user.username:
                if User.objects.filter(username=username).exclude(pk=user.pk).exists():
                    messages.error(request, "Ce nom d'utilisateur est déjà utilisé.")
                    return HttpResponseRedirect(redirect_url)
                user.username = username
            if email and email != user.email:
                # Vérification dans User, Client, Fournisseur
                email_exists = (
                    User.objects.filter(email=email).exclude(pk=user.pk).exists() or
                    Client.objects.filter(email=email).exclude(pk=getattr(client, 'pk', None)).exists() or
                    Fournisseur.objects.filter(email=email).exists()
                )
                if email_exists:
                    messages.error(request, "Cette adresse email est déjà utilisée.")
                    return HttpResponseRedirect(redirect_url)
                user.email = email
            if telephone:
                # Vérification dans Client et Fournisseur
                tel_exists = (
                    Client.objects.filter(telephone=telephone).exclude(pk=getattr(client, 'pk', None)).exists() or
                    Fournisseur.objects.filter(telephone=telephone).exists()
                )
                if tel_exists:
                    messages.error(request, "Ce numéro de téléphone est déjà utilisé.")
                    return HttpResponseRedirect(redirect_url)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            if client:
                client.prenom = first_name
                client.nom = last_name
                if telephone:
                    client.telephone = telephone
                client.save()
            messages.success(request, "Informations du profil mises à jour avec succès.")
        else:
            company_name = request.POST.get('company_name')
            email = request.POST.get('email')
            telephone = request.POST.get('telephone')
            if fournisseur and company_name:
                fournisseur.nom_entreprise = company_name
            if email and email != user.email:
                # Vérification dans User, Client, Fournisseur
                email_exists = (
                    User.objects.filter(email=email).exclude(pk=user.pk).exists() or
                    Fournisseur.objects.filter(email=email).exclude(pk=getattr(fournisseur, 'pk', None)).exists() or
                    Client.objects.filter(email=email).exists()
                )
                if email_exists:
                    messages.error(request, "Cette adresse email est déjà utilisée.")
                    return HttpResponseRedirect(redirect_url)
                user.email = email
            if telephone:
                # Vérification dans Fournisseur et Client
                tel_exists = (
                    Fournisseur.objects.filter(telephone=telephone).exclude(pk=getattr(fournisseur, 'pk', None)).exists() or
                    Client.objects.filter(telephone=telephone).exists()
                )
                if tel_exists:
                    messages.error(request, "Ce numéro de téléphone est déjà utilisé.")
                    return HttpResponseRedirect(redirect_url)
                fournisseur.telephone = telephone
            user.save()
            if fournisseur:
                fournisseur.save()
            messages.success(request, "Informations du profil mises à jour avec succès.")
        return HttpResponseRedirect(redirect_url)
    return HttpResponseRedirect(redirect_url)
