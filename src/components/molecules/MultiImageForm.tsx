import { useState } from 'react';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import { supabase } from '@/libs/supabaseClient';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { errorToast } from '@/libs/toast';
import Img from '@/components/atoms/Img';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';

type MultiImageFormProps = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function MultiImageForm({
  images,
  setImages,
}: MultiImageFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const len = images.length;

  const handleAddImages = async (file: File) => {
    if (!files.includes(file)) {
      try {
        const newFileName = uuid();
        const { data, error } = await supabase.storage
          .from('images')
          .upload(`house/${newFileName}`, file);
        if (error) {
          errorToast('uploadImage', '💧 이미지 저장에 실패했습니다.(1)');
          console.log(error);
          return;
        }
        const res = supabase.storage.from('images').getPublicUrl(data.path);
        setFiles(prevFiles => [file, ...prevFiles]);
        setImages(prev => [...prev, res.data.publicUrl]);
      } catch (error) {
        errorToast('uploadImage', '💧 이미지 저장에 실패했습니다.(2)');
        console.error(error);
      }
    } else {
      // 왜 toast가 뜨지 않을 까...........
      errorToast('uploadImage', '👀 중복된 이미지입니다.');
    }
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach(file => {
        handleAddImages(file);
      });
    }
  };

  const onClickDeleteImg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const imgElement = target.querySelector('img');
    if (imgElement) {
      const imgSrc = imgElement.src;
      const path = imgSrc.split('/').slice(-1);
      try {
        const { error } = await supabase.storage
          .from('images')
          .remove([`house/${path}`]);
        setImages(prev => prev.filter(img => img !== imgSrc));
        if (error) {
          errorToast(
            'deleteImage',
            '⛔️ supabase에서 이미지를 삭제하는 데 실패했습니다.',
          );
          console.error(error);
        }
      } catch (error) {
        errorToast('deleteImage', '⛔️ 이미지 삭제에 실패했습니다.');
        console.error(error);
      }
    }
  };

  return (
    <Container.FlexCol>
      <Container.FlexRow className="gap-4">
        <Label
          htmlFor="house_img"
          className="mb-0 mr-[11px] flex size-[17rem] cursor-pointer items-center justify-center rounded-[10px] bg-brown3"
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
        {images.map((img, idx) => (
          <IconButton.Ghost
            key={`img_${idx}`}
            iconType="close"
            iconClassName="relative bottom-[7.25rem] right-7"
            stroke="brown"
            onClick={onClickDeleteImg}
          >
            <Img className="size-[17rem] object-cover" src={img} />
          </IconButton.Ghost>
        ))}
        {len < 3 &&
          Array(3 - len)
            .fill(0)
            .map((_, idx) => (
              <Label
                key={idx}
                htmlFor="house_img"
                className="mb-0 mr-[11px] flex size-[17rem] cursor-pointer items-center justify-center rounded-[10px] bg-brown3"
              />
            ))}
      </Container.FlexRow>
      <Container.FlexRow>
        <Typography.SubTitle1 className="relative bottom-11 left-5 text-brown">
          {`${len} / 10`}{' '}
        </Typography.SubTitle1>
        <Typography.SubTitle1 className="relative bottom-11 left-[17rem] text-brown">
          대표사진
        </Typography.SubTitle1>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
