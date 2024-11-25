import { Heart } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export function Favorites() {
  const photos = useQuery(api.photos.listPhotos);
  const favorite = useMutation(api.photos.addToFavorites);
  const favoritePhotos = photos?.filter((photo) => photo.favorite === true);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {favoritePhotos?.map((favoritePhoto) => (
          <div
            key={favoritePhoto._id}
            className="relative overflow-hidden rounded-lg bg-gray-200 shadow-lg"
          >
            <img
              src={favoritePhoto.data}
              alt={favoritePhoto.name}
              width="300"
              height="200"
              className="h-80 w-full object-cover"
            />
            <Heart
              onClick={() => favorite({ photoId: favoritePhoto._id })}
              className={`size-5 absolute top-2 right-2 ${favoritePhoto.favorite === true ? "fill-red-600 text-red-600" : ""} hover:cursor-pointer hover:fill-red-600 hover:text-red-600`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
