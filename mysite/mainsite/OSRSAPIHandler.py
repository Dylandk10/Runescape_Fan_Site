from osrs_api import Hiscores

class OSRS_API_handler:

    #testing to see if user exist
    def lookup_player(name):
        try:
            user = Hiscores(name)
            result = True
        except:
            result = False
        return result

    #getting player stats
    def get_player_stats(name):
        try:
            user = Hiscores(name)
            result = OSRS_API_handler.parse_skills(user)
        except:
            result = None
        return result

    #parse the data skills and ranking
    #the internal data is a dictonary inside a tuple so you have to loop manually
    #this saves massive data dunps tofront end and saves from front-end work
    def parse_skills(user_data):
        #parse data
        att_lvl = user_data.skills['attack'].level
        att_rank = user_data.skills['attack'].rank
        str_lvl = user_data.skills['strength'].level
        str_rank = user_data.skills['strength'].rank
        def_lvl = user_data.skills['defence'].level
        def_rank = user_data.skills['defence'].rank
        rng_lvl = user_data.skills['ranged'].level
        rng_rank = user_data.skills['ranged'].rank
        pray_lvl = user_data.skills['prayer'].level
        pray_rank = user_data.skills['prayer'].rank
        mage_lvl = user_data.skills['magic'].level
        mage_rank = user_data.skills['magic'].rank
        rune_lvl = user_data.skills['runecrafting'].level
        rune_rank = user_data.skills['runecrafting'].rank
        hp_lvl = user_data.skills['hitpoints'].level
        hp_rank = user_data.skills['hitpoints'].rank
        craf_lvl = user_data.skills['crafting'].level
        craf_rank = user_data.skills['crafting'].rank
        mine_lvl = user_data.skills['mining'].level
        mine_rank = user_data.skills['mining'].rank
        smith_lvl = user_data.skills['smithing'].level
        smith_rank = user_data.skills['smithing'].rank
        fish_lvl = user_data.skills['fishing'].level
        fish_rank = user_data.skills['fishing'].rank
        cook_lvl = user_data.skills['cooking'].level
        cook_rank = user_data.skills['cooking'].rank
        fire_lvl = user_data.skills['firemaking'].level
        fire_rank = user_data.skills['firemaking'].rank
        wood_lvl = user_data.skills['woodcutting'].level
        wood_rank = user_data.skills['woodcutting'].rank
        ag_lvl = user_data.skills['agility'].level
        ag_rank = user_data.skills['agility'].rank
        herb_lvl = user_data.skills['herblore'].level
        herb_rank = user_data.skills['herblore'].rank
        thiev_lvl = user_data.skills['thieving'].level
        thiev_rank = user_data.skills['thieving'].rank
        flet_lvl = user_data.skills['fletching'].level
        flet_rank = user_data.skills['fletching'].rank
        slay_lvl = user_data.skills['slayer'].level
        slay_rank = user_data.skills['slayer'].rank
        farm_lvl = user_data.skills['farming'].level
        farm_rank = user_data.skills['farming'].rank
        con_lvl = user_data.skills['construction'].level
        con_rank = user_data.skills['construction'].rank
        hunt_lvl = user_data.skills['hunter'].level
        hunt_rank = user_data.skills['hunter'].rank

        #make dic
        data = {
            'att_lvl': att_lvl,
            'att_rank': att_rank,
            'str_lvl': str_lvl,
            'str_rank': str_rank,
            'def_lvl': def_lvl,
            'def_rank': def_rank,
            'rng_lvl': rng_lvl,
            'rng_rank': rng_rank,
            'pray_lvl':pray_lvl,
            'pray_rank': pray_rank,
            'mage_lvl': mage_lvl,
            'mage_rank': mage_rank,
            'rune_lvl': rune_lvl,
            'rune_rank': rune_rank,
            'hp_lvl': hp_lvl,
            'hp_rank': hp_rank,
            'craf_lvl': craf_lvl,
            'craf_rank': craf_rank,
            'mine_lvl': mine_lvl,
            'mine_rank': mine_rank,
            'smith_lvl': smith_lvl,
            'smith_rank': smith_rank,
            'fish_lvl': fish_lvl,
            'fish_rank': fish_rank,
            'cook_lvl': cook_lvl,
            'cook_rank': cook_rank,
            'fire_lvl': fire_lvl,
            'fire_rank':fire_rank,
            'wood_lvl': wood_lvl,
            'wood_rank': wood_rank,
            'ag_lvl': ag_lvl,
            'ag_rank': ag_rank,
            'herb_lvl': herb_lvl,
            'herb_rank': herb_rank,
            'thiev_lvl': thiev_lvl,
            'thiev_rank': thiev_rank,
            'flet_lvl': flet_lvl,
            'flet_rank': flet_rank,
            'slay_lvl': slay_lvl,
            'slay_rank': slay_rank,
            'farm_lvl': farm_lvl,
            'farm_rank': farm_rank,
            'con_lvl': con_lvl,
            'con_rank': con_rank,
            'hunt_lvl': hunt_lvl,
            'hunt_rank': hunt_rank,
        }
        return data
