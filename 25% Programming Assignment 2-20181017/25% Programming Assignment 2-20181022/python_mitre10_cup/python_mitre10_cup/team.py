class Team(object):
    def __init__(self, new_rank, new_name, new_venue, new_city):
        self.rank = new_rank
        self.name = new_name
        self.venue = new_venue
        self.city = new_city

    def __str__(self):
        return self.name

    def get_venue(self):
        return self.venue.ljust(35) + self.city
