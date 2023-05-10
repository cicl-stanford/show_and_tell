class MinSampler:
    """
    A non-random sampler where the category sampled is always one with the fewest samples drawn previously.
    This is useful for assigning conditions in real-time so that the conditions are assigned in a balanced way.
    """

    def __init__(self, categories: list, counts: dict = None):
        """
        :param categories: list of things to sample
        :param counts: dict of previously drawn counts
            e.g. {'A': 20} would mean A was drawn 20 times previously
            counts should not contain any keys that are not already in categories.
        """
        if counts is None:
            counts = {}

        for c in categories:
            if c not in counts:
                counts[c] = 0
        if len(set(counts) - set(categories)) > 0:
            raise Exception("Category found in `counts` but not in `categories`.")

        self.counts = counts

    def sample(self):
        category = min(self.counts, key=lambda k: self.counts[k])
        self.counts[category] += 1
        return category
