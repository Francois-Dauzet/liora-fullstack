from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Task."""
    class Meta:
        model = Task
        fields = ['id', 'title', 'completed']
