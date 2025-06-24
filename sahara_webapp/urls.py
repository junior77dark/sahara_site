from django.urls import path
from . import views

urlpatterns = [
    path('produit/<int:produit_id>/', views.description_produit, name='description_produit'),
    path('mes-commandes/', views.mes_commandes, name='mes_commandes'),
    path('modifier_infos/', views.modifier_infos, name='modifier_infos'),
    path('changer_mdp/', views.changer_mdp, name='changer_mdp'),
] 