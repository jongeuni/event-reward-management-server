export class InventoryReadDto {
  constructor(
    public readonly titles: OwnTitleReadDto[],
    public readonly items: OwnItemReadDto[]
  ) {
  }
}

export class OwnTitleReadDto {
  constructor(
    public readonly titleId: string,
    public readonly titleName: string,
    public readonly getDate: Date
  ) {
  }
}

export class OwnItemReadDto {
  constructor(
    public readonly itemId: string,
    public readonly itemName: string,
  ) {
  }
}

export function toInventoryReadDto(inventory: any): InventoryReadDto {
  const items: OwnItemReadDto[] = (inventory?.itemId ?? []).map(
    (item) =>
      new OwnItemReadDto(
        item.id._id.toString(),
        item.id.title,
      )
  );


  const titles: OwnTitleReadDto[] = (inventory?.titleId ?? []).map(
    (title) =>
      new OwnTitleReadDto(
        title.id._id.toString(),
        title.id.name,
        title.id.createdAt,
      )
  );

  return new InventoryReadDto(titles, items);
}
