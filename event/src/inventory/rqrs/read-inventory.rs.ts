export class ReadInventoryRs {
  constructor(
    readonly titles: OwnTitleRs[],
    readonly items: OwnItemRs[]
  ) {
  }
}

export class OwnTitleRs {
  constructor(
    readonly titleId: string,
    readonly titleName: string,
    readonly getDate: Date
  ) {
  }
}

export class OwnItemRs {
  constructor(
    readonly itemId: string,
    readonly itemName: string
  ) {
  }
}