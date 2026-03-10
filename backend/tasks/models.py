from django.db import models
from django.contrib.auth.models import User

class TaskManager(models.Manager):
    """Un manager personnalisé pour les tâches."""
    def completed(self):
        """Retourne uniquement les tâches complétées."""
        return self.get_queryset().filter(completed=True)

class Task(models.Model):
    """Représente une tâche dans la to-do list."""
    title = models.CharField(max_length=200, blank=False)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    objects = TaskManager() # Attachement du manager personnalisé

    def __str__(self):
        """Retourne le titre de la tâche pour une représentation lisible."""
        return self.title

    def mark_as_complete(self):
        """Marque la tâche comme terminée et la sauvegarde."""
        self.completed = True
        self.save()
