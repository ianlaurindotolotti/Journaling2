from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'default': False}
        }

    def create(self, validated_data):
        if 'email' not in validated_data:
            validated_data['email'] = ''
        
        user = super().create(validated_data)
        return user
