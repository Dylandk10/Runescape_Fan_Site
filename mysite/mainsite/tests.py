from django.test import TestCase
from .OSRSAPIHandler import OSRS_API_handler

# Create your tests here.
class Test_OSRS_API(TestCase):
    def setUp(self):
        self.name = "TH3 VOID"
        self.item = "abyssal whip"
        self.item_id = 4151
    #test to check the api is pulling names
    def test_get_name(self):
        self.assertEqual(OSRS_API_handler.lookup_player(self.name), True)

    #test for making sure the player stats are working
    def test_user_stats(self):
        player = OSRS_API_handler.DEBUG_get_player(self.name)
        player_stat_att = player.skills['attack'].level
        player_stat_hunter = player.skills['hunter'].level
        self.assertEqual(player_stat_att, 76)
        self.assertEqual(player_stat_hunter, 99)

    #test for item id in osrs api handler
    def test_item_id(self):
        test_item_id = OSRS_API_handler.get_item_id(self.item)
        self.assertEqual(test_item_id, self.item_id)

    #test for item to exist 
    def test_item_exist(self):
        self.assertEqual(OSRS_API_handler.DEBUG_get_item(self.item_id), True)
