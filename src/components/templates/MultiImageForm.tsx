import { useEffect, useState } from 'react';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';
import { useWatch } from 'react-hook-form';

import { supabase } from '@/libs/supabaseClient';
import { createToast } from '@/libs/toast';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Img from '@/components/atoms/Img';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import { HouseRegisterFormType } from '@/components/templates/HouseRegisterTemplate1';

type MultiImageFormProp = HouseRegisterFormType & {
  userId: string;
  houseId: string;
  isEditMode: boolean;
};

export default function MultiImageForm({
  form,
  userId,
  houseId,
  isEditMode,
}: MultiImageFormProp) {
  const IMAGE_PER_PAGE = 3;
  const HOUSE_STORAGE_URL = import.meta.env.VITE_SUPABASE_HOUSE_STORAGE_URL;
  const [currentImgPage, setCurrentImgPage] = useState(0);
  const [renderImg, setRenderImg] = useState<string[]>([]);
  const representativeImg = form.watch('representative_img');
  const houseImages = useWatch({
    control: form.control,
    name: 'house_img',
  });
  const imageLen = houseImages?.length || 0;

  const createErrorToast = (message: string) =>
    createToast('uploadImage', `${message}`, {
      type: 'error',
      autoClose: 3000,
      isLoading: false,
    });

  // file을 받아서 supabase storage에 이미지를 넣는 함수
  // TODO: trigger() 쓰지 않고 form에서 house_img의 길이를 인식하도록 하기!
  const handleAddImages = async (file: File) => {
    try {
      const newFileName = uuid();
      const { error } = await supabase.storage
        .from(`images/house/${userId}`)
        .upload(`temporary/${newFileName}`, file);

      if (error) {
        createErrorToast('이미지 업로드에 실패했습니다.');
        return;
      }

      const images = form.getValues('house_img');
      images.push(newFileName);
      form.setValue('house_img', images);
      form.trigger();

      const newFileUrl = `${HOUSE_STORAGE_URL}/${userId}/temporary/${newFileName}`;
      setRenderImg(prev => [...prev, newFileUrl]);
    } catch (error) {
      createErrorToast('이미지 업로드에 실패했습니다.');
    }
  };

  // file을 입력받는 input 함수
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach(file => {
        handleAddImages(file);
      });
    }
  };

  // 라디오버튼 선택시 대표사진으로 설정하는 함수
  const handleRepresentativeChange = (imgSrc: string) => {
    const imgName = imgSrc.split('/').slice(-1)[0];
    form.setValue('representative_img', imgName);
  };

  // 이미지 삭제 버튼 이벤트
  const onClickDeleteImg = async (imgSrc: string) => {
    const imgName = imgSrc.split('/').slice(-1)[0];
    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([`house/${userId}/temporary/${imgName}`]);

      if (imgName === representativeImg) {
        form.setValue('representative_img', '');
      }
      const images = form.watch('house_img').filter(img => img !== imgName);
      form.setValue('house_img', images);
      form.trigger();

      setRenderImg(prev => prev.filter(imgUrl => !imgUrl.includes(imgName)));
      if (imageLen % 3 === 0 && currentImgPage > 0) {
        setCurrentImgPage(currentImgPage - 1);
      }

      if (error) {
        createErrorToast('supabase에서 이미지를 삭제하는 데 실패했습니다.');
      }
    } catch (error) {
      createErrorToast('이미지 삭제에 실패했습니다.');
    }
  };

  const handleNextImage = () => {
    if (currentImgPage < Math.ceil(imageLen / IMAGE_PER_PAGE) - 1) {
      setCurrentImgPage(currentImgPage + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImgPage > 0) {
      setCurrentImgPage(currentImgPage - 1);
    }
  };

  // 처음 이미지 업로드시 첫번째 사진을 대표사진으로 지정
  useEffect(() => {
    if (
      (representativeImg === '' || representativeImg === undefined) &&
      imageLen !== 0
    ) {
      const firstImage = form.getValues('house_img')[0];
      form.setValue('representative_img', firstImage);
    }
  }, [imageLen]);

  // edit이라면 db에 있는 대표사진과 이미지배열을 가져와 Rendering 되도록 정제
  useEffect(() => {
    if (!houseImages.includes(representativeImg)) {
      if (isEditMode && representativeImg !== '') {
        const totalImages = [];
        totalImages.push(representativeImg);

        if (houseImages.length !== 0) {
          totalImages.push(...houseImages);
        }

        const houseImageUrls = totalImages.map(
          imgName => `${HOUSE_STORAGE_URL}/${userId}/${houseId}/${imgName}`,
        );
        form.setValue('house_img', totalImages);
        setRenderImg(houseImageUrls);
      }
    }
  }, [representativeImg, houseImages]);

  return (
    <Container.FlexCol>
      <Container.FlexRow>
        {currentImgPage !== 0 && (
          <IconButton.Ghost
            iconType="prev"
            iconClassName="absolute left-0 z-10"
            stroke="brown"
            onClick={handlePrevImage}
          />
        )}
        <Container.Grid className="w-full grid-cols-4 gap-4 px-6">
          <div className="relative w-full pb-[100%]">
            <Label
              htmlFor="house_img"
              className="absolute inset-0 mb-0 flex w-full cursor-pointer items-center justify-center rounded-xl bg-brown3"
            >
              <Icon type="camera" />
              <Input
                type="file"
                id="house_img"
                name="house_img"
                className="hidden"
                onChange={handleFiles}
                accept=".jpg, .jpeg, .png"
                multiple
              />
            </Label>
            <Typography.SubTitle1 className="absolute bottom-4 left-4 p-1 text-brown">
              {`${imageLen} / 10`}{' '}
            </Typography.SubTitle1>
          </div>
          {renderImg
            .slice(
              currentImgPage * IMAGE_PER_PAGE,
              (currentImgPage + 1) * IMAGE_PER_PAGE,
            )
            .map((imgSrc, index) => (
              <div key={uuid()} className="relative w-full pb-[75%]">
                <IconButton.Ghost
                  iconType="close"
                  stroke="brown"
                  iconClassName="absolute top-5 right-5 w-[1rem] h-[1rem] z-10"
                  onClick={() => onClickDeleteImg(imgSrc)}
                />
                <Label
                  htmlFor={`image_${index}`}
                  className="absolute inset-0 block"
                >
                  <Input
                    type="radio"
                    id={`image_${index}`}
                    className="absolute bottom-3 right-3 z-10 h-7 w-7 accent-point"
                    checked={imgSrc.includes(representativeImg)}
                    onChange={() => handleRepresentativeChange(imgSrc)}
                  />
                  <div className="absolute inset-0">
                    <Img className="size-full object-cover" src={imgSrc} />
                  </div>
                  {imgSrc.includes(representativeImg) && (
                    <Typography.SubTitle2 className="absolute bottom-0 w-full rounded-b-xl bg-brown/70 p-4 text-bg">
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
                  className="mb-0 flex w-full cursor-pointer items-center justify-center rounded-[10px] bg-brown3 pb-[75%]"
                />
              ))}
        </Container.Grid>
        {imageLen > 3 &&
          Math.ceil(imageLen / IMAGE_PER_PAGE) - 1 !== currentImgPage && (
            <IconButton.Ghost
              iconType="next"
              iconClassName="absolute right-0 z-10"
              stroke="brown"
              onClick={handleNextImage}
            />
          )}
      </Container.FlexRow>
      <Typography.Span2
        className={`${!form.formState.errors.house_img?.message && 'invisible h-3'} mr-7 mt-[8px] block text-right text-point`}
      >
        {form.formState.errors.house_img?.message as string}
      </Typography.Span2>
    </Container.FlexCol>
  );
}
