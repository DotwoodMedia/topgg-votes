export type BotVoteEvent = {
  userId: string;
  botId: string;
  isWeekend?: boolean;
  type: string;
};
