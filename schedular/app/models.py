from django.db import models
from django.conf import settings

class User_Info(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True)
    name = models.CharField(max_length=200, blank=True)
    birthday = models.DateField(
        null=True, 
        blank=True)

class Templates(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True)
    name = models.CharField(max_length=200)
    notes = models.CharField(max_length=200, blank=True)

class Event(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True)
    name = models.CharField(max_length=200)
    notes = models.CharField(max_length=200, blank=True)
    date = models.DateField(null=True, blank=True)