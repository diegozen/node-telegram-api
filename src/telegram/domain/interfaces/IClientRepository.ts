export interface IClientRepository {
    createEmptyGroup(title: string): Promise<number>;
    getInvitationLinks(telegramGroupId: number): Promise<any>;
}
