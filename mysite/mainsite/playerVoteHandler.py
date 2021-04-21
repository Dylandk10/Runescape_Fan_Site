from .models import players_vote_table


class playerVoteHandler:

    def create_player(giveName, givenDescription):
        result = True
        if not playerVoteHandler.check_if_player_exist(giveName):
            player = players_vote_table.objects.create(name=giveName, description=givenDescription, number_of_votes=0)
        else:
            result = False
        return result

    def check_if_player_exist(name):
        if players_vote_table.objects.filter(name=name).exists():
            return True
        return False

    def get_all_players():
        q_set = players_vote_table.objects.all().values("name", "description", "number_of_votes")
        q_set = q_set.order_by("number_of_votes")
        return q_set

    def add_vote_to_player(name):
        player = players_vote_table.objects.get(name=name)
        playerCounter = player.number_of_votes
        playerCounter = playerCounter + 1
        player.number_of_votes = playerCounter
        player.save()
