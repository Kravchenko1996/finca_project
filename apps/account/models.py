from django.db import models


class Account(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username


class User(models.Model):
    name = models.CharField(max_length=100)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
