import deepmerge from 'deepmerge'
import {ubl} from './ubl'
import {harvard} from './harvard'
import {nga} from './nga'
import {yale} from './yale'
import {ec} from './ecodices'
export const discovery = deepmerge.all([ubl, harvard, nga, yale, ec])
