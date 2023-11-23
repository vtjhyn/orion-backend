import { User } from "@prisma/client";

export default function exclude<Key extends keyof User>(
  user: User | User[],
  keys: Key[]
): Omit<User, Key> | Omit<User, Key>[] {
  if (Array.isArray(user)) {
    // If it's an array of users, exclude the specified keys from each user
    return user.map((singleUser) =>
      Object.fromEntries(
        Object.entries(singleUser).filter(([key]) => !keys.includes(key as Key))
      ) as Omit<User, Key>
    );
  } else {
    // If it's a single user, exclude the specified keys from that user
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key as Key))
    ) as Omit<User, Key>;
  }
}
