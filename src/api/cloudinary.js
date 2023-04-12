// 클라우디너리에 이미지 업로드
export async function uploadImage(file) {
  const uploadUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_PRODUCT_ENVIRONMENT
  }/image/upload`;
  const formData = new FormData();

  formData.append('file', file);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESETS_UNSIGNED_NAME
  );

  return fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      return data.url;
    });
}
export async function deleteImage(id) {
  const deleteUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_PRODUCT_ENVIRONMENT
  }/image/destroy`;
  const formData = new FormData();

  formData.append('public_id', id);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESETS_UNSIGNED_NAME
  );

  return fetch(deleteUrl, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.result;
    });
}
