module.exports = {
  mapE6NGlobalResultsToStructure,
  mapE6NStaticResultsToStructure,
};

const keyBy = require('lodash/keyBy');
const { toSearchableString } = require('diacritics-helper');

function mapE6NGlobalResultsToStructure(e6nGlobalResults) {
  if (!e6nGlobalResults) return null;

  const {
    A,
    C,
    DRT,
    G,
    L,
    N,
    NRR,
    P,
    PC,
    PING,
    PR,
    PT,
    R,
    RT,
    TS,
    URT,
  } = e6nGlobalResults;

  return {
    alerts: mapE6NGlobalAlerts(A),
    candidates: mapE6NGlobalCandidates(C),
    closedPolls: PC,
    electedNumber: DRT,
    governmentCall: mapE6NGlobalGovernmentCall(G),
    lists: mapE6NGlobalLists(L),
    noResultsRidingsNumber: NRR,
    pollingTime: (PING > 0) ? PING * 1000 : PING,
    parties: mapE6NGlobalParties(P),
    previousTimestamp: TS,
    refreshToken: RT,
    ridings: mapE6NGlobalRidings(R),
    ridingsNumberWithoutElected: URT,
    totalPolls: PT,
    turnoutTextual: (PR === 0.0 || !PR) ? null : percentToTextualPercent(PR),
    voteNumber: N,
  };
}

function mapE6NStaticResultsToStructure(e6nStaticResults) {
  if (!e6nStaticResults) return null;

  const {
    C,
    L,
    NAME,
    P,
    R,
  } = e6nStaticResults;

  return {
    candidates: keyBy(mapE6NStaticCandidate(C), 'id'),
    lists: mapE6NStaticLists(L),
    name: NAME,
    parties: keyBy(mapE6NStaticParties(P), 'id'),
    ridings: keyBy(mapE6NStaticRidings(R), 'id'),
  };
}

function mapE6NStaticParties(e6nParties) {
  if (!e6nParties) return [];

  return e6nParties.map((e6nParty) => {
    const {
      AC,
      I,
      IC,
      NAME,
      PC,
      PP,
    } = e6nParty;

    return {
      acronym: AC,
      chiefId: IC,
      color: `rgb(${PC})`,
      id: I,
      name: NAME,
      priority: PP,
    };
  });
}

function mapE6NStaticRidings(e6nRidings) {
  if (!e6nRidings) return [];

  return e6nRidings.map((e6nRiding) => {
    const {
      C,
      I,
      NAME,
    } = e6nRiding;

    return {
      candidateIds: C,
      id: I,
      name: NAME,
      searchableName: toSearchableString(NAME, true),
    };
  });
}

function mapE6NStaticCandidate(e6nCandidates) {
  if (!e6nCandidates) return [];

  return e6nCandidates.map((e6nCandidate) => {
    const {
      F,
      G,
      I,
      L,
      M,
      IC,
      IP,
      PI,
      PL,
      RI,
    } = e6nCandidate;

    const name = `${F} ${L}`;

    return {
      name,
      firstName: F,
      gender: G,
      id: I,
      isIncumbentCandidate: (IC === 1),
      isIncumbentParty: (IP === 1),
      isMinister: (M === 1),
      isPartyLeader: (PL === 1),
      lastName: L,
      partyId: PI,
      ridingId: RI,
      searchableName: toSearchableString(name, true),
    };
  });
}

function mapE6NStaticLists(e6nLists) {
  if (!e6nLists) return [];

  return e6nLists.map((e6nList) => {
    const {
      N,
      L,
    } = e6nList;

    return {
      name: N,
      lists: L.map((list) => {
        const {
          I,
          NAME,
          L: referencedIds,
          T,
        } = list;

        return {
          id: I,
          name: NAME,
          referencedIds,
          type: T,
        };
      }),
    };
  });
}

function mapE6NGlobalCandidates(e6nGlobalCandidates) {
  if (!e6nGlobalCandidates) return [];

  return e6nGlobalCandidates.map((e6nGlobalCandidate) => {
    const {
      D,
      I,
      R,
      N,
      PN,
    } = e6nGlobalCandidate;

    return {
      differentialTextual: differentialNumberToTextualDifferential(D),
      id: I,
      status: R,
      voteNumber: N,
      voteNumberTextual: numberToTextualNumber(N),
      votePercent: PN || 0,
      votePercentTextual: percentToTextualPercent(PN),
    };
  });
}

function mapE6NGlobalParties(e6nParties) {
  if (!e6nParties) return [];

  return e6nParties.map((e6nParty) => {
    const {
      A,
      E,
      I,
      N,
      PN,
      R,
    } = e6nParty;

    return {
      aheadNumber: A,
      electedNumber: E,
      id: I,
      status: R,
      voteNumber: N,
      voteNumberTextual: numberToTextualNumber(N),
      votePercent: PN || 0,
      votePercentTextual: percentToTextualPercent(PN),
    };
  });
}

function mapE6NGlobalRidings(e6nRidings) {
  if (!e6nRidings) return [];

  return e6nRidings.map((e6nRiding) => {
    const {
      D,
      I,
      ITP,
      R,
      N,
      PC,      
      PR,
      PT,
    } = e6nRiding;

    return {
      closedPolls: PC,
      differentialTextual: differentialNumberToTextualDifferential(D),
      id: I,
      leadingPartyId: ITP,
      pollsTotal: PT,
      status: R,
      turnout: PR,
      turnoutTextual: percentToTextualPercent(PR),
      voteNumber: N,
      voteNumberTextual: numberToTextualNumber(N),
    };
  });
}

function mapE6NGlobalGovernmentCall(e6nGovernmentCall) {
  if (!e6nGovernmentCall) return null;

  const {
    P,
    W,
  } = e6nGovernmentCall;

  return {
    partyId: P,
    status: W,
  };
}

function mapE6NGlobalAlerts(e6nAlerts) {
  if (!e6nAlerts) return [];

  return e6nAlerts.map((e6nAlert) => {
    const {
      C,
      R,
      UTC,
      V,
    } = e6nAlert;

    return {
      candidateId: C,
      date: UTC,
      isVIP: (V === 1),
      ridingId: R,
    };
  });
}

function mapE6NGlobalLists(e6nLists) {
  if (!e6nLists) return [];

  return e6nLists.map((e6nList) => {
    const {
      I,
      L,
    } = e6nList;

    return {
      id: I,
      referencedIds: L,
    };
  });
}

function differentialNumberToTextualDifferential(nmbr) {
  if (nmbr === null || nmbr === undefined) return null;

  if (nmbr === 0) return 'Égalité';

  return `${nmbr > 0 ? '+' : '-'}&nbsp;${numberToTextualNumber(Math.abs(nmbr))}`;
}

function percentToTextualPercent(perc) {
  if (!perc) return '0,0&nbsp;%';

  return `${perc
    .toFixed(1)
    .toString()
    .replace('.', ',')}&nbsp;%`;
}

function numberToTextualNumber(nmbr) {
  if (!nmbr) return '0';

  return nmbr
    .toString()
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '&nbsp;');
}
