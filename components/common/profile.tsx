import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProfileProps {
  user: {
    name?: string;
    email: string;
    image?: string;
  };
  className?: string;
}

export const Profile = ({ user, className }: ProfileProps) => {
  const profileImage = user.image ? user.image : "/images/user-fallback.png";

  return (
    <Image
      src={profileImage}
      alt={user.name || ""}
      width={500}
      height={600}
      className={cn(
        "object-cover aspect-square w-full h-full rounded-md shadow-md",
        className,
      )}
    />
  );
};
