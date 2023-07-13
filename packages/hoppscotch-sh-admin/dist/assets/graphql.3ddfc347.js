var n=(e=>(e.Editor="EDITOR",e.Owner="OWNER",e.Viewer="VIEWER",e))(n||{});const i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"AddUserToTeamByAdmin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userEmail"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"role"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TeamMemberRole"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamID"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"addUserToTeamByAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"role"},value:{kind:"Variable",name:{kind:"Name",value:"role"}}},{kind:"Argument",name:{kind:"Name",value:"userEmail"},value:{kind:"Variable",name:{kind:"Name",value:"userEmail"}}},{kind:"Argument",name:{kind:"Name",value:"teamID"},value:{kind:"Variable",name:{kind:"Name",value:"teamID"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"membershipID"}},{kind:"Field",name:{kind:"Name",value:"role"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"}}]}}]}}]}}]},a={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"ChangeUserRoleInTeamByAdmin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userUID"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamID"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"newRole"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TeamMemberRole"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"changeUserRoleInTeamByAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"userUID"},value:{kind:"Variable",name:{kind:"Name",value:"userUID"}}},{kind:"Argument",name:{kind:"Name",value:"teamID"},value:{kind:"Variable",name:{kind:"Name",value:"teamID"}}},{kind:"Argument",name:{kind:"Name",value:"newRole"},value:{kind:"Variable",name:{kind:"Name",value:"newRole"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"membershipID"}},{kind:"Field",name:{kind:"Name",value:"role"}}]}}]}}]},d={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CreateTeam"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userUid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"createTeamByAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"userUid"},value:{kind:"Variable",name:{kind:"Name",value:"userUid"}}},{kind:"Argument",name:{kind:"Name",value:"name"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"members"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"membershipID"}},{kind:"Field",name:{kind:"Name",value:"role"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"}},{kind:"Field",name:{kind:"Name",value:"displayName"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"photoURL"}}]}}]}},{kind:"Field",name:{kind:"Name",value:"ownersCount"}},{kind:"Field",name:{kind:"Name",value:"editorsCount"}},{kind:"Field",name:{kind:"Name",value:"viewersCount"}}]}}]}}]},m={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"InviteNewUser"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"inviteeEmail"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"inviteNewUser"},arguments:[{kind:"Argument",name:{kind:"Name",value:"inviteeEmail"},value:{kind:"Variable",name:{kind:"Name",value:"inviteeEmail"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"inviteeEmail"}}]}}]}}]},l={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"MakeUserAdmin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"uid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"makeUserAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"userUID"},value:{kind:"Variable",name:{kind:"Name",value:"uid"}}}]}]}}]},t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"RemoveTeam"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"uid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"deleteTeamByAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"teamID"},value:{kind:"Variable",name:{kind:"Name",value:"uid"}}}]}]}}]},k={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"RemoveUserAsAdmin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"uid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"removeUserAsAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"userUID"},value:{kind:"Variable",name:{kind:"Name",value:"uid"}}}]}]}}]},o={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"RemoveUserByAdmin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"uid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"removeUserByAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"userUID"},value:{kind:"Variable",name:{kind:"Name",value:"uid"}}}]}]}}]},u={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"RemoveUserFromTeamByAdmin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userUid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamID"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"removeUserFromTeamByAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"userUid"},value:{kind:"Variable",name:{kind:"Name",value:"userUid"}}},{kind:"Argument",name:{kind:"Name",value:"teamID"},value:{kind:"Variable",name:{kind:"Name",value:"teamID"}}}]}]}}]},s={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"RenameTeam"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"uid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"renameTeamByAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"teamID"},value:{kind:"Variable",name:{kind:"Name",value:"uid"}}},{kind:"Argument",name:{kind:"Name",value:"newName"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}}]}}]}}]},v={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"RevokeTeamInvitation"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"inviteID"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"revokeTeamInvitation"},arguments:[{kind:"Argument",name:{kind:"Name",value:"inviteID"},value:{kind:"Variable",name:{kind:"Name",value:"inviteID"}}}]}]}}]},r={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"UserInfo"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"uid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"admin"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userInfo"},arguments:[{kind:"Argument",name:{kind:"Name",value:"userUid"},value:{kind:"Variable",name:{kind:"Name",value:"uid"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"}},{kind:"Field",name:{kind:"Name",value:"displayName"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"isAdmin"}},{kind:"Field",name:{kind:"Name",value:"photoURL"}},{kind:"Field",name:{kind:"Name",value:"createdOn"}}]}}]}}]}}]},N={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"InvitedUsers"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"admin"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"invitedUsers"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"adminUid"}},{kind:"Field",name:{kind:"Name",value:"adminEmail"}},{kind:"Field",name:{kind:"Name",value:"inviteeEmail"}},{kind:"Field",name:{kind:"Name",value:"invitedOn"}}]}}]}}]}}]},c={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"Metrics"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"admin"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"usersCount"}},{kind:"Field",name:{kind:"Name",value:"teamsCount"}},{kind:"Field",name:{kind:"Name",value:"teamRequestsCount"}},{kind:"Field",name:{kind:"Name",value:"teamCollectionsCount"}}]}}]}}]},p={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"TeamInfo"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamID"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"admin"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamInfo"},arguments:[{kind:"Argument",name:{kind:"Name",value:"teamID"},value:{kind:"Variable",name:{kind:"Name",value:"teamID"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"teamMembers"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"membershipID"}},{kind:"Field",name:{kind:"Name",value:"role"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"}},{kind:"Field",name:{kind:"Name",value:"displayName"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"photoURL"}}]}}]}},{kind:"Field",name:{kind:"Name",value:"teamInvitations"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"inviteeEmail"}},{kind:"Field",name:{kind:"Name",value:"inviteeRole"}}]}},{kind:"Field",name:{kind:"Name",value:"teamEnvironments"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}}]}},{kind:"Field",name:{kind:"Name",value:"ownersCount"}},{kind:"Field",name:{kind:"Name",value:"editorsCount"}},{kind:"Field",name:{kind:"Name",value:"viewersCount"}}]}}]}}]}}]},D={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"TeamList"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"cursor"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"take"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"admin"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"allTeams"},arguments:[{kind:"Argument",name:{kind:"Name",value:"cursor"},value:{kind:"Variable",name:{kind:"Name",value:"cursor"}}},{kind:"Argument",name:{kind:"Name",value:"take"},value:{kind:"Variable",name:{kind:"Name",value:"take"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"members"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"membershipID"}}]}}]}}]}}]}}]},S={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"UsersList"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"cursor"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"take"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"admin"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"allUsers"},arguments:[{kind:"Argument",name:{kind:"Name",value:"cursor"},value:{kind:"Variable",name:{kind:"Name",value:"cursor"}}},{kind:"Argument",name:{kind:"Name",value:"take"},value:{kind:"Variable",name:{kind:"Name",value:"take"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"}},{kind:"Field",name:{kind:"Name",value:"displayName"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"isAdmin"}},{kind:"Field",name:{kind:"Name",value:"photoURL"}},{kind:"Field",name:{kind:"Name",value:"createdOn"}}]}}]}}]}}]};export{i as A,d as C,N as I,l as M,o as R,D as T,S as U,m as a,k as b,c,t as d,p as e,v as f,n as g,a as h,u as i,s as j,r as k};
