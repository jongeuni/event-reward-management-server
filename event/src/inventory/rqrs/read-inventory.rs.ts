export class ReadInventoryRs {
  constructor(
    public readonly titles: OwnTitleRs[],
    public readonly items: OwnItemRs[]
  ) {
  }
}

export class OwnTitleRs {
  constructor(
    public readonly titleId: string,
    public readonly titleName: string,
    public readonly getDate: Date
  ) {
  }
}

export class OwnItemRs {
  constructor(
    public readonly itemId: string,
    public readonly itemName: string,
    // public readonly itemCount: number
  ) {
  }
}