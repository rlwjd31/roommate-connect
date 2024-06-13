import { useState } from 'react';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import { supabase } from '@/libs/supabaseClient';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { errorToast } from '@/libs/toast';
import Img from '@/components/atoms/Img';

export default function MultiImageForm({ images, setImages }) {
  const [files, setFiles] = useState<File[]>([]);

  const handleAddImages = async (file: File) => {
    try {
      const newFileName = uuid();
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`${newFileName}`, file);
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
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    console.log(fileList);
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach(file => {
        handleAddImages(file);
      });
    }
  };

  return (
    <>
      {images.map((img, idx) => (
        <div className="size-[208px]" key={idx}>
          <Img src={img} />
        </div>
      ))}
      <Label
        htmlFor="house_img"
        className="flex size-[282px] cursor-pointer items-center justify-center rounded-[10px] bg-brown3"
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
    </>
  );
}
