from django.db import models

# Create your models here.
class PlayerVoted(models.Model):
    username = models.CharField(max_length=120)
    voted = models.BooleanField()

    def getUsername(self):
        return self.username
    def getVoted(self):
        return self.voted

class players_vote_table(models.Model):
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=300)
    number_of_votes = models.IntegerField(default=0)

    def getName(self):
        return self.name
    def getDescription(self):
        return self.description
    def getNumberOfVotes(self):
        return self.number_of_votes
