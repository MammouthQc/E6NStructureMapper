export type GlobalStructureInputType = object; // Changes too often to be typed
export type StaticStructureInputType = object; // Changes too often to be typed

export type GlobalStructureResultType = {
    alerts: GlobalAlert[],
    candidates: GlobalCandidate[],
    closedPolls: number,
    electedNumber: number,
    governmentCall: GlobalGovernmentCall,
    lists: GlobalList[],
    noResultsRidingsNumber: number,
    pollingTime: number,
    parties: GlobalParty[],
    previousTimestamp: string,
    refreshToken: string,
    ridings: GlobalRiding[],
    ridingsNumberWithoutElected: number,
    totalPolls: number,
    turnoutTextual: string,
    voteNumber: number,
};

type GlobalAlert = {
    candidateId: number,
    date: string,
    isVIP: boolean,
    ridingId: number,
};

type GlobalCandidate = {
    differentialA11y: string,
    differentialTextual: string,
    id: number,
    status: string,
    voteNumber: number,
    voteNumberTextual: string,
    votePercent: number,
    votePercentTextual: string,
};

type GlobalList = {
    id: number,
    referencedIds: number[],
};

type GlobalParty = {
    aheadNumber: number,
    electedNumber: number,
    id: number,
    status: string,
    voteNumber: number,
    voteNumberTextual: string,
    votePercent: number,
    votePercentTextual: string,
};

type GlobalRiding = {  
    closedPolls: number,
    differentialA11y: string,
    differentialTextual: string,
    hasAGain: boolean,
    id: number,
    leadingPartyIds: number[],
    pollsTotal: number,
    status: string,
    turnout: number,
    turnoutTextual: string,
    voteNumber: number,
    voteNumberTextual: string,
};

type GlobalGovernmentCall = {
    partyId: number,
    status: number,
};

export type StaticStructureResultType = {
    candidates: object, // Properties are mapped by the identifiers of the candidates, therefore cannot be typed
    lists: StaticList[],
    name: string,
    parties: object,  // Properties are mapped by the identifiers of the parties, therefore cannot be typed
    ridings: object,  // Properties are mapped by the identifiers of the ridings, therefore cannot be typed
};

type StaticList = {
    name: string,
    lists: StaticListData[]
};

type StaticListData = {
    id: number,
    name: string,
    referencedIds: number[],
    type: number,
};

export type MergedStructureType = {
    alerts: GlobalAlert[],
    candidates: object,
    closedPolls: number,
    electedNumber: number,
    governmentCall: GlobalGovernmentCall,
    lists: StaticList[],
    name: string,
    noResultsRidingsNumber: number,
    pollingTime: number,
    parties: object,
    previousTimestamp: string,
    refreshToken: string,
    ridings: object,
    ridingsNumberWithoutElected: number,
    totalPolls: number,
    voteNumber: number,
}

type MergedCandidate = {
    differentialTextual: string,
    id: number,
    status: string,
    voteNumber: number,
    voteNumberTextual: string,
    votePercent: number,
    votePercentTextual: string,
}

export function mapE6NGlobalResultsToStructure(e6nGlobalResults: GlobalStructureInputType): GlobalStructureResultType;

export function mapE6NStaticResultsToStructure(e6nStaticResults: StaticStructureInputType): StaticStructureResultType;

export namespace mapE6NGlobalResultsToStructure {}

export namespace mapE6NStaticResultsToStructure {}

