import { Item } from "@prisma/client";

export default function exclude<Key extends keyof Item>(
  item: Item | Item[],
  keys: Key[]
): Omit<Item, Key> | Omit<Item, Key>[] {
  if (Array.isArray(item)) {
    // If it's an array of items, exclude the specified keys from each item
    return item.map((singleItem) =>
      Object.fromEntries(
        Object.entries(singleItem).filter(([key]) => !keys.includes(key as Key))
      ) as Omit<Item, Key>
    );
  } else {
    // If it's a single item, exclude the specified keys from that item
    return Object.fromEntries(
      Object.entries(item).filter(([key]) => !keys.includes(key as Key))
    ) as Omit<Item, Key>;
  }
}
