from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    activation_code = models.CharField(max_length=6, null=True, blank=True)

    def __str__(self):
        return self.username


class Account(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
