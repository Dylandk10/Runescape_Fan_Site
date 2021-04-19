from django.db import models

# Create your models here.
class PlayerVoted(models.Model):
    username = models.CharField(max_length=120)
    voted = models.BooleanField()

    def getUsername(self):
        return self.username
    def getVoted(self):
        return self.voted 
