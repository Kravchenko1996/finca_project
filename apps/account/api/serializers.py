from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from apps.account.email_activation import send_email_with_activation_code, generate_code
from apps.account.models import User, Account


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def save(self):
        activation_code = generate_code(6)
        user = User.objects.create(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            activation_code=activation_code,
            is_active=False,
            password=make_password(self.validated_data['password'])
        )
        send_email_with_activation_code(user.email, activation_code)
        return user


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name', 'user']


class UserNotFound(Exception):
    pass


class ConfirmEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def save(self, **kwargs):
        email = self.validated_data['email']
        activation_code = self.validated_data['code']
        user = User.objects.filter(email=email, activation_code=activation_code).first()
        if not user:
            raise UserNotFound
        user.activation_code = None
        user.is_active = True
        return user.save()
