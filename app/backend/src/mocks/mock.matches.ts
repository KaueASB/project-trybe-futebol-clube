export const mockMatches = [
  {
    id: 39,
    homeTeam: 3,
    homeTeamGoals: 2,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Botafogo',
    },
    teamAway: {
      teamName: 'Napoli-SC',
    },
  },
  {
    id: 40,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Palmeiras',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Internacional',
    },
  },
  {
    id: 42,
    homeTeam: 6,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Ferroviária',
    },
    teamAway: {
      teamName: 'Avaí/Kindermann',
    },
  },
];

export const mockTeamsExists = [
  { id: 16, teamName: 'São Paulo' },
  { id: 8, teamName: 'Grêmio' },
];

export const addMatch = {
  homeTeam: 1,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const teamEquals = {
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const createdMatch = {
  inProgress: true,
  id: 1,
  homeTeam: 1,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const updateGoals = {
  homeTeamGoals: 200,
  awayTeamGoals: 100,
};
