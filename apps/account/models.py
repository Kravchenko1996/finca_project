from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    activation_code = models.CharField(max_length=6, null=True, blank=True)

    def __str__(self):
        return self.username


class Account(models.Model):
    name = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)


class Transaction(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    summary = models.FloatField(default=0)
    month = models.DateField(auto_now=True)
    description = models.CharField(max_length=200)