/* eslint-disable consistent-return */
import { useMutation } from '@tanstack/react-query';
import { FileObject } from '@supabase/storage-js';

import {
  createToast,
  errorToast,
  removeToast,
  successToast,
} from '@/libs/toast';
import { supabase } from '@/libs/supabaseClient';
import { HouseFormType } from '@/types/house.type';
import {
  UserLifeStyleType,
  UserMateStyleType,
} from '@/components/pages/HouseRegister';

export const fetchData = async (
  fetchingDB: string,
  selectingDate: string,
  matchingId: string,
) => {
  const { data: response, error } = await supabase
    .from(fetchingDB)
    .select(selectingDate)
    .eq('id', matchingId)
    .single();

  if (error) throw new Error(error.message);
  return response;
};

// storage directory(temporary || post)의 이미지를 가져오는 함수
export const getStorageImage = async (storagePath: string) => {
  try {
    const { data: imageList, error } = await supabase.storage
      .from('images')
      .list(storagePath, {
        limit: 1000,
        offset: 0,
      });

    if (error) throw new Error(`getStorageImageError : ${error.message}`);

    return imageList;
  } catch (error) {
    createToast(
      'emptyError',
      `이미지 저장 중 문제가 발생했습니다. 고객센터에 문의해주세요.`,
      {
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      },
    );
  }
};

// 가져온 리스트의 이미지를 삭제하는 함수
export const removeStorageFile = async (
  imageList: FileObject[],
  storagePath: string,
) => {
  try {
    const removePromises = imageList.map(imgObj =>
      supabase.storage.from('images').remove([`${storagePath}/${imgObj.name}`]),
    );
    const results = await Promise.all(removePromises);

    results.forEach(({ error }) => {
      if (error) {
        throw new Error(`removeStorageFileError: ${error.message}`);
      }
    });
  } catch (error) {
    createToast(
      'emptyError',
      `이미지 저장 중 문제가 발생했습니다. 고객센터에 문의해주세요.`,
      {
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      },
    );
  }
};

// temporary storage 내 이미지 중 post내 업로드 될 이미지만 postId storage로 이동하는 함수
const moveImageStorage = async (
  images: string[],
  toStoragePath: string,
  fromStoragePath: string,
) => {
  try {
    const movePromises = images.map(imgName =>
      supabase.storage
        .from('images')
        .move(`${toStoragePath}/${imgName}`, `${fromStoragePath}/${imgName}`),
    );
    const results = await Promise.all(movePromises);

    results.forEach(({ error }, index) => {
      if (error)
        throw new Error(
          `moveImageError for ${images[index]}: ${error.message}`,
        );
    });

    return true;
  } catch (error) {
    createToast(
      'moveImageError',
      `이미지 저장 중 문제가 발생했습니다. 고객센터에 문의해주세요.`,
      {
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      },
    );
  }
};

// temporary에 있던 이미지들 중 house데이터에 들어가는 이미지만 postId 폴더로 옮기고, temporary내 이미지를 삭제하는 로직 함수
const saveImageStorage = async (
  userId: string,
  images: string[],
  postId: string,
) => {
  try {
    const postStoragePath = `house/${userId}/${postId}`;
    const tempStoragePath = `house/${userId}/temporary`;
    const moved = await moveImageStorage(
      images,
      tempStoragePath,
      postStoragePath,
    );
    if (moved) {
      const removeList = await getStorageImage(tempStoragePath);
      if (removeList) {
        await removeStorageFile(removeList, tempStoragePath);
      }
    }
  } catch (error) {
    createToast(
      'moveImageError',
      `이미지 저장 중 문제가 발생했습니다. 고객센터에 문의해주세요.`,
      {
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      },
    );
  }
};

// Insert house data
export const useHouseRegist = () => {
  const { mutate: registHouse, isPending: isRegistHouse } = useMutation({
    mutationFn: async (houseData: HouseFormType) => {
      const { data: insertedData, error } = await supabase
        .from('house')
        .insert(houseData)
        .select('id');

      if (error) throw new Error(`houseUploadError: ${error.message}`);
      const postId = insertedData[0].id;
      return postId;
    },
    onMutate: () => createToast('uploadHousePost', '게시글 업로드 중'),
    onError: error => errorToast('uploadHousePost', error.message),
    onSuccess: async (postId, variables) => {
      const { user_id, house_img, representative_img } = variables;
      const images = [representative_img, ...house_img];
      await saveImageStorage(user_id, images, postId);
      successToast('uploadHousePost', '게시글이 저장되었습니다.');
    },
  });
  return { registHouse, isRegistHouse };
};

// Update(Edit) House Post
export const useHouseUpdate = () => {
  const { mutate: updateHouse, isPending: isUpdateHouse } = useMutation({
    mutationFn: async ({
      houseData,
      houseId,
    }: {
      houseData: HouseFormType;
      houseId: string;
    }) => {
      const { data, error } = await supabase
        .from('house')
        .update(houseData)
        .eq('id', houseId)
        .select();

      if (error) throw new Error(`Post update error: ${error.message}`);
      return data;
    },
    onMutate: async ({
      houseData,
      houseId,
    }: {
      houseData: HouseFormType;
      houseId: string;
    }) => {
      const toastId = createToast('updateHouse', '게시글 수정 중', {
        autoClose: false,
      });
      try {
        const postStoragePath = `house/${houseData.user_id}/${houseId}`;
        const tempStoragePath = `house/${houseData.user_id}/temporary`;
        const imageList = await getStorageImage(postStoragePath);
        if (imageList) {
          const postImages = imageList.map(imgObj => imgObj.name);
          await moveImageStorage(postImages, postStoragePath, tempStoragePath);
          removeToast(toastId as string);
        }
      } catch (error) {
        errorToast(
          toastId as string,
          '게시글 수정 중 문제가 생겼습니다. 고객센터에 문의해주세요.',
        );
      }
    },
    onError: error => {
      errorToast('updateHouse:', error.message);
    },
    onSuccess: async data => {
      if (data && data.length > 0) {
        const { id, user_id, house_img, representative_img } = data[0];
        const images = [representative_img, ...house_img];
        await saveImageStorage(user_id, images, id);
        successToast('uploadHousePost', '게시글이 저장되었습니다.');
      }
    },
  });
  return { updateHouse, isUpdateHouse };
};

// Update user profile
export const useUserProfileUpdate = () => {
  const { mutate: updateUserProfile, isSuccess: updatedUserProfile } =
    useMutation({
      mutationFn: async ({
        dbName,
        data,
        userId,
      }: {
        dbName: string;
        data: UserLifeStyleType | UserMateStyleType;
        userId: string;
      }) => {
        const { error } = await supabase
          .from(dbName)
          .update(data)
          .eq('id', userId);
        if (error) throw new Error(`Profile update error: ${error.message}`);
      },
      onMutate: () => createToast('updateProfile', '프로필 수정 중'),
      onError: error => {
        console.error('Update profile error:', error);
        errorToast('updateProfile', error.message);
      },
      onSuccess: () =>
        successToast('updateProfile', '프로필이 수정되었습니다.'),
    });
  return { updateUserProfile, updatedUserProfile };
};
