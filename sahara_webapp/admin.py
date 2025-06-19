from django.contrib import admin
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib import messages
from .models import Fournisseur, ValidationFournisseur


@admin.action(description="✅ Activer le compte utilisateur lié")
def activer_utilisateur(modeladmin, request, queryset):
    for fournisseur in queryset:
        try:
            user = User.objects.get(email=fournisseur.email)
            user.is_active = True
            user.save()

            fournisseur.statut = 'valide'
            fournisseur.save()

            # Créer l'entrée de validation
            ValidationFournisseur.objects.create(
                fournisseur=fournisseur,
                valide_par=request.user,
                decision='valide'
            )

            # Préparer le contexte pour le template
            context = {
                'username': user.username,
                'nom_entreprise': fournisseur.nom_entreprise,
                'login_url': request.build_absolute_uri('/login/'),
                'request': request  # Nécessaire pour la fonction static dans le template
            }

            # Rendre le template HTML
            html_content = render_to_string('emails/email_accep.html', context)
            text_content = strip_tags(html_content)

            # Créer et envoyer l'email
            email = EmailMultiAlternatives(
                subject="Compte validé - Sahara",
                body=text_content,
                from_email=None,
                to=[user.email]
            )
            email.attach_alternative(html_content, "text/html")
            
            try:
                email.send()
                messages.success(
                    request, 
                    f"Le compte de {fournisseur.nom_entreprise} a été activé et notifié"
                )
            except Exception as e:
                messages.error(
                    request,
                    f"Erreur lors de l'envoi de l'email à {fournisseur.email}: {str(e)}"
                )

        except User.DoesNotExist:
            messages.warning(
                request,
                f"Utilisateur introuvable pour : {fournisseur.email}"
            )
        except Exception as e:
            messages.error(
                request,
                f"Erreur lors de l'activation de {fournisseur.email}: {str(e)}"
            )


@admin.action(description="❌ Refuser la validation (supprimer compte)")
def refuser_validation(modeladmin, request, queryset):
    for fournisseur in queryset:
        try:
            user = User.objects.get(email=fournisseur.email)

            motif = "Les informations transmises sont incomplètes, non valides ou illisibles."

            # Préparer le contexte pour le template
            context = {
                'user': user,
                'fournisseur': fournisseur,
                'motif': motif,
                'request': request
            }

            # Rendre le template HTML
            html_content = render_to_string('emails/email_refus.html', context)
            text_content = strip_tags(html_content)

            # Créer et envoyer l'email
            email = EmailMultiAlternatives(
                subject="Compte refusé - Sahara",
                body=text_content,
                from_email=None,
                to=[user.email]
            )
            email.attach_alternative(html_content, "text/html")
            
            try:
                email.send()
            except Exception as e:
                messages.error(
                    request,
                    f"Erreur lors de l'envoi de l'email à {fournisseur.email}: {str(e)}"
                )

            user.delete()
            fournisseur.delete()
            messages.success(
                request,
                f"Le compte de {fournisseur.nom_entreprise} a été refusé et supprimé"
            )

        except User.DoesNotExist:
            fournisseur.delete()
            messages.warning(
                request,
                f"Utilisateur déjà supprimé pour : {fournisseur.email}"
            )
        except Exception as e:
            messages.error(
                request,
                f"Erreur lors du refus de {fournisseur.email}: {str(e)}"
            )


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
