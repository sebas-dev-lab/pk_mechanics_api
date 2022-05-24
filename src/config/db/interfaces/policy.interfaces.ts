export enum enumPolicy {
    'B' = 'brand', 
    'M' = 'model', 
    'Y' = 'year', 
    'C' = 'color',
}

export enum enumPermissions  {
    'A' = 'allowed',
    'NA' = 'notAllowed',
}

export default interface PolicyAttributes {
    id: number;
    active: boolean;
    type: enumPolicy;
    title: string;
    description: string;
    permission:enumPermissions;
  }