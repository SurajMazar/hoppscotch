import * as T from 'fp-ts/Task';
import * as TO from 'fp-ts/TaskOption';
import { AuthUser } from '../types/AuthUser';
export interface UserDataHandler {
    canAllowUserDeletion: (user: AuthUser) => TO.TaskOption<string>;
    onUserDelete: (user: AuthUser) => T.Task<void>;
}
