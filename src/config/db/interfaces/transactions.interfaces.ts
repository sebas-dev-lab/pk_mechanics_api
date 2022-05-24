export enum StatusTr {
    c = 'complete',
    a = 'active',
    f = 'failed'
} 

export default interface TransactionsAttributes {
    id: number;
    cid: number;
    owid: number;
    sids: JSON;
    amount: number;
    date: Date;
    status: StatusTr
}