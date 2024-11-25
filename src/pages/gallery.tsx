import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ChangeEvent } from "react";
import { Heart } from "lucide-react";

export function Gallery() {
  const uploadPhoto = useMutation(api.photos.uploadPhoto);
  const photos = useQuery(api.photos.listPhotos);
  const favorite = useMutation(api.photos.addToFavorites);

  async function handleUploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result?.toString();
      if (base64Data) {
        const photo = {
          name: file.name,
          album: "default",
          data: base64Data,
          favorite: false,
          uploadedAt: Date.now(),
        };

        await uploadPhoto(photo);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-1 flex-col gap-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Gallery</h2>
        <input
          type="file"
          onChange={handleUploadPhoto}
          className="w-100"
          accept="image/*"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos?.map((photo) => (
          <div
            key={photo._id}
            className="relative overflow-hidden rounded-lg bg-gray-200 shadow-lg"
          >
            <img
              src={photo.data}
              alt={photo.name}
              width="300"
              height="200"
              className="h-80 w-full object-cover"
            />
            <Heart
              onClick={() => favorite({ photoId: photo._id })}
              className={`size-5 absolute top-2 right-2 ${photo.favorite === true ? "fill-red-600 text-red-600" : ""} hover:cursor-pointer hover:fill-red-600 hover:text-red-600`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
