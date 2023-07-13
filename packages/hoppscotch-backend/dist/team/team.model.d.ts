export declare class Team {
    id: string;
    name: string;
}
export declare class TeamMember {
    membershipID: string;
    userUid: string;
    role: TeamMemberRole;
}
export declare enum TeamMemberRole {
    OWNER = "OWNER",
    VIEWER = "VIEWER",
    EDITOR = "EDITOR"
}
