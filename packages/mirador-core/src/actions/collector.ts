import {COLLECT_GARBAGE} from "./action-types"
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();
export const collectGarbage = actionCreator<{id: string, children: any}>(COLLECT_GARBAGE)
