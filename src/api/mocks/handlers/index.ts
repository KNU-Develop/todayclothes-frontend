import { recommendHandlers } from './recommend'
import { HistoryHandler } from './history'

export const handlers = [...HistoryHandler, ...recommendHandlers]
