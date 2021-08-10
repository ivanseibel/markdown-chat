from django.db import models


class SignedUser(models.Model):
    room = models.CharField(blank=False, null=False, max_length=50)
    username = models.CharField(blank=False, null=False, max_length=50)
    channel_name = models.CharField(blank=False, null=False, max_length=100)
