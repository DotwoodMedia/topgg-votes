import type { BotVoteEvent } from '../Events/BotVoteEvent';
import type { ServerVoteEvent } from '../Events/ServerVoteEvent';

export type VoteClientEvents = {
  botVote: (event: BotVoteEvent) => void;
  serverVote: (event: ServerVoteEvent) => void;
};
