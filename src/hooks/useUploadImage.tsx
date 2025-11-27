import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

type UploadFn = (uris: string[]) => Promise<string[]>;

interface UseUploadImageProps {
  uploadFn: UploadFn;
  multiple?: boolean;
}

export function useUploadImage({
  uploadFn,
  multiple = false,
}: UseUploadImageProps) {
  const [urls, setUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [visibleImage, setVisibleImage] = useState<string[]>([]);

  const pickAndUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      allowsMultipleSelection: multiple,
      selectionLimit: multiple ? 10 : 1,
    });

    if (!result.canceled) {
      setUploading(true);

      // extract uris
      const uris = result.assets.map((a) => a.uri);
      setVisibleImage(uris);
      // let uploadFn handle multiple
      const uploadedUrls = await uploadFn(uris);

      setUrls(uploadedUrls);
      setUploading(false);
    }
  };
  return { pickAndUpload, urls, uploading, visibleImage };
}

// --------------- uses example ---------------- //
//   const { pickAndUpload, urls, uploading, visibleImage } = useUploadImage({
//     uploadFn,
//     multiple: false,
//   });
//   const uploadFn = async (uris: string[]) => {
//     const form = new FormData();

//     uris.forEach((uri, index) => {
//       form.append("files", {
//         uri,
//         type: "image/jpeg",
//         name: `photo_${index}.jpg`,
//       } as any);
//     });
//     return form;
//   };

//   console.log(visibleImage, "++++++++++++++++++++++");
