from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    activation_code = models.CharField(max_length=6, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Account(models.Model):
    name = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)


class Transaction(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    summary = models.FloatField(default=0)
    date = models.DateField()
    description = models.CharField(max_length=200)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
