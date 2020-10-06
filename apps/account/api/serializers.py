from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers

from apps.account.models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def save(self):
        return User.objects.create(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            password=make_password(self.validated_data['password'])
        )
