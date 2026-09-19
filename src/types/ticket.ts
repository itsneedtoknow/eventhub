import type { IEvent } from "./event";
import type { ISeat } from "./seat";

export interface ITicket {
  id: number;
  seat?: ISeat;
  eventID: number;
  isCancelled: boolean;
}
export interface ITicketWithEvent extends ITicket {
  event?: IEvent;
}
