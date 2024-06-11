import { useState } from 'react';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import { supabase } from '@/libs/supabaseClient';
import { createToast } from '@/libs/toast';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Img from '@/components/atoms/Img';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import { useSignInState } from '@/hooks/useSign';

type MultiImageFormProps = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function MultiImageForm({
  images,
  setImages,
}: MultiImageFormProps) {
  const IMAGE_PER_PAGE = 3;
  const MAX_IMAGES = 10;
  const [_files, setFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const len = images.length;
  const userInfo = useSignInState();

  const createErrorToast = (message: string) =>
    createToast('uploadImage', `${message}`, {
      type: 'error',
      autoClose: 3000,
      isLoading: false,
    });

  // file을 받아서 supabase storage에 이미지를 넣는 함수
  const handleAddImages = async (file: File) => {
    try {
      if (!userInfo?.user.id) {
        createErrorToast('로그인 후에 이용 가능합니다.');
        return;
      }
      const newFileName = uuid();
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`house/${userInfo?.user.id}/${newFileName}`, file);
      if (error) {
        createErrorToast('supabase 업로드에 실패했습니다.');
        return;
      }
      // 업로드 하면서 생긴 url을 다시 받아와서 images 배열에 넣어주기
      const res = supabase.storage.from('images').getPublicUrl(data.path);
      setFiles(prevFiles => [...prevFiles, file]);
      setImages(prev => [...prev, res.data.publicUrl]);
    } catch (error) {
      createErrorToast('이미지 저장에 실패했습니다.');
    }
  };

  // file을 입력받는 input 함수
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 다중입력을 받으므로 List로 받아온다.
    const fileList = e.target.files;
    if (fileList) {
      // 받아온 list는 객체이므로 배열로 바꾸어준다.
      const filesArray = Array.from(fileList);
      // 이미지 갯수 체크 (limit: 10)
      if (len + filesArray.length > MAX_IMAGES) {
        createErrorToast('이미지는 최대 10개까지만 업로드 할 수 있습니다.');
        return;
      }

      filesArray.forEach(file => {
        handleAddImages(file);
      });
    }
  };

  // 이미지 삭제 버튼 이벤트
  const onClickDeleteImg = async (imgSrc: string) => {
    // imgUrl에서 path만 추출해서 supabase storage에서 삭제
    const path = imgSrc.split('/').slice(-1);
    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([`house/${userInfo?.user.id}/${path}`]);

      // images 배열에서도 삭제 -> 화면에서도 없어지게함
      setImages(prev => {
        const newImages = prev.filter(img => img !== imgSrc);
        // 이때 삭제하고 난 이미지 갯수가 3의 배수이면 페이지를 앞으로 이동시킴
        if (newImages.length % 3 === 0 && currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
        return newImages;
      });

      if (error) {
        createErrorToast('supabase에서 이미지를 삭제하는 데 실패했습니다.');
      }
    } catch (error) {
      createErrorToast('이미지 삭제에 실패했습니다.');
    }
  };

  const handleNextImage = () => {
    if (currentPage < Math.ceil(images.length / IMAGE_PER_PAGE) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container.FlexCol>
      <Container.FlexRow>
        {currentPage !== 0 && (
          <IconButton.Ghost
            iconType="prev"
            iconClassName="absolute left-3 z-10"
            stroke="brown"
            onClick={handlePrevImage}
          />
        )}
        <Container.FlexRow className="gap-4">
          <div className="relative">
            <Label
              htmlFor="house_img"
              className="mb-0 flex size-[17rem] cursor-pointer items-center justify-center rounded-[10px] bg-brown3"
            >
              <Icon type="camera" />
              <Input
                type="file"
                id="house_img"
                name="house_img"
                className="hidden"
                onChange={handleFiles}
                multiple
              />
            </Label>
            <Typography.SubTitle1 className="absolute bottom-4 left-4 p-1 text-brown">
              {`${len} / 10`}{' '}
            </Typography.SubTitle1>
          </div>
          {images
            .slice(
              currentPage * IMAGE_PER_PAGE,
              (currentPage + 1) * IMAGE_PER_PAGE,
            )
            .map((img, idx) => (
              <div key={uuid()} className="relative">
                <IconButton.Ghost
                  iconType="close"
                  stroke="brown"
                  iconClassName="absolute top-4 right-4"
                  onClick={() => onClickDeleteImg(img)}
                />
                <Img className="size-[17rem] object-cover" src={img} />
                {currentPage === 0 && idx === 0 && (
                  <Typography.SubTitle1 className="absolute bottom-4 left-4 p-1 text-brown">
                    대표사진
                  </Typography.SubTitle1>
                )}
              </div>
            ))}
          {len < 3 &&
            Array(3 - len)
              .fill(0)
              .map(_ => (
                <Label
                  key={uuid()}
                  htmlFor="house_img"
                  className="mb-0 flex size-[17rem] cursor-pointer items-center justify-center rounded-[10px] bg-brown3"
                />
              ))}
        </Container.FlexRow>
        {len > 3 && Math.ceil(len / IMAGE_PER_PAGE) - 1 !== currentPage && (
          <IconButton.Ghost
            iconType="next"
            iconClassName="absolute right-3 z-10"
            stroke="brown"
            onClick={handleNextImage}
          />
        )}
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
