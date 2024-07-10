import { useEffect, useState } from 'react';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';
import { useRecoilState } from 'recoil';

import { supabase } from '@/libs/supabaseClient';
import { createToast } from '@/libs/toast';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Img from '@/components/atoms/Img';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import { SessionAtom } from '@/stores/auth.store';

type MultiImageFormProps = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  representativeImg: string;
  setRepresentativeImg: React.Dispatch<React.SetStateAction<string>>;
};

export default function MultiImageForm({
  images,
  setImages,
  representativeImg,
  setRepresentativeImg,
}: MultiImageFormProps) {
  const IMAGE_PER_PAGE = 3;
  const MAX_IMAGES = 10;
  const HOUSE_STORAGE_URL = import.meta.env.VITE_SUPABASE_HOUSE_STORAGE_URL;
  const userId = useRecoilState(SessionAtom)[0]?.user.id;
  const [currentPage, setCurrentPage] = useState(0);
  const [renderImg, setRenderImg] = useState<string[]>([]);
  const imageLen = renderImg.length;

  const createErrorToast = (message: string) =>
    createToast('uploadImage', `${message}`, {
      type: 'error',
      autoClose: 3000,
      isLoading: false,
    });

  // file을 받아서 supabase storage에 이미지를 넣는 함수
  const handleAddImages = async (file: File) => {
    try {
      const newFileName = uuid();
      const { error } = await supabase.storage
        .from(`images/house/${userId}`)
        .upload(`temporary/${newFileName}`, file);

      if (error) {
        createErrorToast('supabase 업로드에 실패했습니다.');
        return;
      }
      setImages(prev => [...prev, newFileName]);

      const newFileUrl = `${HOUSE_STORAGE_URL}/${userId}/temporary/${newFileName}`;
      setRenderImg(prev => [...prev, newFileUrl]);
    } catch (error) {
      createErrorToast('이미지 저장에 실패했습니다.');
    }
  };

  // file을 입력받는 input 함수
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      if (imageLen + filesArray.length > MAX_IMAGES) {
        createErrorToast('이미지는 최대 10개까지만 업로드 할 수 있습니다.');
        return;
      }
      filesArray.forEach(file => {
        handleAddImages(file);
      });
    }
  };

  // 라디오버튼 선택시 대표사진으로 설정하는 함수
  const handleRepresentativeChange = (imgUrl: string) => {
    setRepresentativeImg(imgUrl);
  };

  // 이미지 삭제 버튼 이벤트
  const onClickDeleteImg = async (imgSrc: string) => {
    const imgName = imgSrc.split('/').slice(-1)[0];
    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([`house/${userId}/temporary/${imgName}`]);

      if (imgName === representativeImg.split('/').slice(-1)[0]) {
        setRepresentativeImg('');
      } else {
        setImages(prev => {
          const newImages = prev.filter(img => img !== imgSrc);

          if (newImages.length % 3 === 0 && currentPage > 0) {
            setCurrentPage(currentPage - 1);
          }
          return newImages;
        });
      }

      setRenderImg(prev => prev.filter(imgUrl => !imgUrl.includes(imgName)));

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

  // 처음 이미지 업로드시 첫번째 사진을 대표사진으로 지정
  useEffect(() => {
    if (
      renderImg &&
      (representativeImg === undefined || representativeImg === '')
    ) {
      setRepresentativeImg(renderImg[0]);
    }
  }, [renderImg, setRepresentativeImg]);

  return (
    <Container.FlexCol>
      <Container.FlexRow>
        {currentPage !== 0 && (
          <IconButton.Ghost
            iconType="prev"
            iconClassName="absolute left-3 z-10 w-[0.6875rem] h-[1.25rem]"
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
              <Icon type="camera" className="h-[4.375rem] w-[4.875rem]" />
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
              {`${imageLen} / 10`}{' '}
            </Typography.SubTitle1>
          </div>
          {renderImg
            .slice(
              currentPage * IMAGE_PER_PAGE,
              (currentPage + 1) * IMAGE_PER_PAGE,
            )
            .map((img, index) => (
              <div key={uuid()} className="relative">
                <IconButton.Ghost
                  iconType="close"
                  stroke="brown"
                  iconClassName="absolute top-4 right-4 w-[0.6875rem] h-[0.75rem]"
                  onClick={() => onClickDeleteImg(img)}
                />
                <Label htmlFor={`image_${index}`}>
                  <Input
                    type="radio"
                    id={`image_${index}`}
                    name="representativeImage"
                    className="absolute bottom-2 right-3 size-6 p-1"
                    checked={img === representativeImg}
                    onChange={() => handleRepresentativeChange(img)}
                  />
                  <Img className="size-[17rem] object-cover" src={img} />
                  {img === representativeImg && (
                    <Typography.SubTitle2 className="absolute bottom-2 w-full rounded-xl bg-brown/70 p-4 text-bg">
                      대표사진
                    </Typography.SubTitle2>
                  )}
                </Label>
              </div>
            ))}
          {imageLen < 3 &&
            Array(3 - imageLen)
              .fill(0)
              .map(_ => (
                <Label
                  key={uuid()}
                  htmlFor="house_img"
                  className="mb-0 flex size-[17rem] cursor-pointer items-center justify-center rounded-[10px] bg-brown3"
                />
              ))}
        </Container.FlexRow>
        {imageLen > 3 &&
          Math.ceil(imageLen / IMAGE_PER_PAGE) - 1 !== currentPage && (
            <IconButton.Ghost
              iconType="next"
              iconClassName="absolute right-3 z-10 w-[0.6875rem] h-[1.25rem]"
              stroke="brown"
              onClick={handleNextImage}
            />
          )}
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
