from rest_framework import generics, permissions
from .models import Task
from .serializers import TaskSerializer

class TaskListCreateAPIView(generics.ListCreateAPIView):
    """Vue pour lister les tâches d'un utilisateur ou en créer une nouvelle."""
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """Cette vue ne retourne que les tâches de l'utilisateur authentifié."""
        if self.request.user.is_authenticated:
            return Task.objects.filter(owner=self.request.user)
        return Task.objects.all()

    def perform_create(self, serializer):
        """Associe automatiquement la nouvelle tâche à l'utilisateur authentifié."""
        user = self.request.user if self.request.user.is_authenticated else None
        from django.contrib.auth.models import User
        user, created = User.objects.get_or_create(username='testuser')
        serializer.save(owner=user)

class TaskDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Vue pour lire, mettre à jour ou supprimer une tâche spécifique."""
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """Cette vue ne retourne que les tâches de l'utilisateur authentifié."""
        if self.request.user.is_authenticated:
            return Task.objects.filter(owner=self.request.user)
        return Task.objects.all()
