"""
URL configuration for sahara_site project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from sahara_webapp import views

urlpatterns = [
    # Pages principales
    path('admin/', admin.site.urls),
    path('', views.accueil, name='accueil'),
    path('promotion.html', views.promotion, name='promotion'),
    path('contact.html', views.contact, name='contact'),
    
    # Pages utilisateur
    path('login.html', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),  # Nouvelle URL pour la déconnexion
    path('s\'inscrire.html', views.inscription, name='inscription'),
    path('user-profile.html', views.user_profile, name='user_profile'),
    path('panier.html', views.panier, name='panier'),
    
    # Pages fournisseur
    path('espace_fournisseur.html', views.espace_fournisseur, name='espace_fournisseur'),
    path('add-product.html', views.add_product, name='add_product'),
    
    # Pages catégories
    path('categories/categorie-bijoux.html', views.categorie_bijoux, name='categorie_bijoux'),
    path('categories/categorie-cuisine.html', views.categorie_cuisine, name='categorie_cuisine'),
    path('categories/categorie-decoration.html', views.categorie_decoration, name='categorie_decoration'),
    path('categories/categorie-high-tech.html', views.categorie_high_tech, name='categorie_high_tech'),
    path('categories/categorie-jeux.html', views.categorie_jeux, name='categorie_jeux'),
    path('categories/categorie-livres.html', views.categorie_livres, name='categorie_livres'),
    path('categories/categorie-sport.html', views.categorie_sport, name='categorie_sport'),
    path('categories/categorie-vetements.html', views.categorie_vetements, name='categorie_vetements'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
