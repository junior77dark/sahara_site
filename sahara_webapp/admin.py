from django.contrib import admin, messages
from django.utils.html import format_html
from django.core.mail import send_mail
from .models import Fournisseur, ValidationFournisseur
from django.contrib.auth.models import User


@admin.action(description="✅ Activer le compte utilisateur lié")
def activer_utilisateur(modeladmin, request, queryset):
    for fournisseur in queryset:
        try:
            user = User.objects.get(email=fournisseur.email)
            user.is_active = True
            user.save()

            fournisseur.statut = 'valide'
            fournisseur.save()

            ValidationFournisseur.objects.create(
                fournisseur=fournisseur,
                valide_par=request.user,
                decision='valide'
            )

            send_mail(
                subject="Compte validé - Sahara",
                message=(
                    f"Bonjour {user.username},\n\n"
                    "Félicitations ! Votre compte fournisseur sur Sahara a été validé.\n"
                    "Vous pouvez maintenant vous connecter et publier vos produits.\n\n"
                    "Cordialement,\nL'équipe Sahara."
                ),
                recipient_list=[user.email],
                from_email=None,
            )

        except User.DoesNotExist:
            messages.warning(request, f"Utilisateur introuvable pour : {fournisseur.email}")


@admin.action(description="❌ Refuser la validation (supprimer compte)")
def refuser_validation(modeladmin, request, queryset):
    motif = "Les informations transmises sont incomplètes, non valides ou illisibles."
    for fournisseur in queryset:
        try:
            user = User.objects.get(email=fournisseur.email)

            # Envoi de l'email de refus
            send_mail(
                subject="Compte refusé - Sahara",
                message=(
                    f"Bonjour {user.username},\n\n"
                    "Votre demande d'inscription fournisseur a été refusée.\n"
                    f"Motif : {motif}\n\n"
                    "Vous pouvez soumettre une nouvelle demande avec des documents clairs et valides.\n\n"
                    "Cordialement,\nL'équipe Sahara."
                ),
                recipient_list=[user.email],
                from_email=None,
            )

            user.delete()
            fournisseur.delete()

        except User.DoesNotExist:
            fournisseur.delete()

    messages.success(request, "Les fournisseurs sélectionnés ont été refusés et supprimés.")


@admin.register(Fournisseur)
class FournisseurAdmin(admin.ModelAdmin):
    list_display = (
        'nom_entreprise', 'email', 'rccm', 'statut',
        'decision_validation', 'compte_actif'
    )
    list_filter = ('statut', 'pays', 'ville', 'type_entreprise')
    search_fields = ('nom_entreprise', 'email', 'rccm')
    readonly_fields = ('document_identite',)
    actions = [activer_utilisateur, refuser_validation]

    def decision_validation(self, obj):
        try:
            v = obj.validationfournisseur
            return f"{v.get_decision_display()} ({v.date_decision.strftime('%d/%m/%Y')})"
        except ValidationFournisseur.DoesNotExist:
            return "Non traité"

    def compte_actif(self, obj):
        try:
            user = User.objects.get(email=obj.email)
            return user.is_active
        except User.DoesNotExist:
            return False

    compte_actif.boolean = True
    compte_actif.short_description = "Compte actif"
