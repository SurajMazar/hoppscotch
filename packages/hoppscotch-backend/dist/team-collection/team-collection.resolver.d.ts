import { TeamCollection } from './team-collection.model';
import { TeamCollectionService } from './team-collection.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { PaginationArgs } from 'src/types/input-types.args';
import { CreateChildTeamCollectionArgs, CreateRootTeamCollectionArgs, GetRootTeamCollectionsArgs, MoveTeamCollectionArgs, RenameTeamCollectionArgs, ReplaceTeamCollectionArgs, UpdateTeamCollectionOrderArgs } from './input-type.args';
export declare class TeamCollectionResolver {
    private readonly teamCollectionService;
    private readonly pubsub;
    constructor(teamCollectionService: TeamCollectionService, pubsub: PubSubService);
    team(collection: TeamCollection): Promise<import("@prisma/client").Team>;
    parent(collection: TeamCollection): Promise<import("@prisma/client").TeamCollection>;
    children(collection: TeamCollection, args: PaginationArgs): Promise<import("@prisma/client").TeamCollection[]>;
    exportCollectionsToJSON(teamID: string): Promise<string>;
    rootCollectionsOfTeam(args: GetRootTeamCollectionsArgs): Promise<import("@prisma/client").TeamCollection[]>;
    collection(collectionID: string): Promise<import("@prisma/client").TeamCollection>;
    createRootCollection(args: CreateRootTeamCollectionArgs): Promise<TeamCollection>;
    importCollectionsFromJSON(teamID: string, jsonString: string, parentCollectionID?: string): Promise<boolean>;
    replaceCollectionsWithJSON(args: ReplaceTeamCollectionArgs): Promise<boolean>;
    createChildCollection(args: CreateChildTeamCollectionArgs): Promise<TeamCollection>;
    renameCollection(args: RenameTeamCollectionArgs): Promise<import("@prisma/client").TeamCollection>;
    deleteCollection(collectionID: string): Promise<boolean>;
    moveCollection(args: MoveTeamCollectionArgs): Promise<TeamCollection>;
    updateCollectionOrder(args: UpdateTeamCollectionOrderArgs): Promise<boolean>;
    teamCollectionAdded(teamID: string): AsyncIterator<unknown, any, undefined>;
    teamCollectionUpdated(teamID: string): AsyncIterator<unknown, any, undefined>;
    teamCollectionRemoved(teamID: string): AsyncIterator<unknown, any, undefined>;
    teamCollectionMoved(teamID: string): AsyncIterator<unknown, any, undefined>;
    collectionOrderUpdated(teamID: string): AsyncIterator<unknown, any, undefined>;
}
