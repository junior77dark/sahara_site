# Create your views here.
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

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
    return render(request, 'login.html')

def inscription(request):
    return render(request, "s'inscrire.html")

# Pages fournisseur
def espace_fournisseur(request):
    return render(request, 'espace_fournisseur.html')
def add_product(request):
    return render(request, 'add-product.html')

# Page panier
def panier(request):
    return render(request, 'panier.html')
