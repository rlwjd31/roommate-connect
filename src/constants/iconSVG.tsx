import { FC, SVGProps } from 'react';

import Apartment from '@/assets/icons/apartment.svg?react';
import Close from '@/assets/icons/close.svg?react';
import DontMindPet from '@/assets/icons/dont-mind-pet.svg?react';
import DontMindSex from '@/assets/icons/dont-mind-sex.svg?react';
import ExpandArrow from '@/assets/icons/expand-arrow.svg?react';
import Female from '@/assets/icons/female.svg?react';
import GoogleLogo from '@/assets/icons/google-logo.svg?react';
import Invisible from '@/assets/icons/invisible.svg?react';
import KakaotalkLogo from '@/assets/icons/kakaotalk-logo.svg?react';
import LeftArrowLogo from '@/assets/icons/left-arrow.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import Male from '@/assets/icons/male.svg?react';
import NonePetLover from '@/assets/icons/none-pet-lover.svg?react';
import NoneSmoke from '@/assets/icons/none-smoke.svg?react';
import PetLover from '@/assets/icons/pet-lover.svg?react';
import RightArrow from '@/assets/icons/right-arrow.svg?react';
import SingleFamilyHouse from '@/assets/icons/single-family-house.svg?react';
import Smoke from '@/assets/icons/smoke.svg?react';
import StudioOfficetel from '@/assets/icons/studio-officetel.svg?react';
import VillaTownhouse from '@/assets/icons/villa-townhouse.svg?react';
import HouseCharacter from '@/assets/images/house-character.svg?react';
import ImgWelcome from '@/assets/images/img-welcome.svg?react';
import SeekingHouse from '@/assets/images/seeking-house.svg?react';
import Visible from '@/assets/icons/visible.svg?react';
import AlarmExist from '@/assets/icons/alarm-exist.svg?react';
import AlarmNone from '@/assets/icons/alarm-none.svg?react';
import Avatar from '@/assets/icons/avatar.svg?react';
import PaperClip from '@/assets/icons/paper-clip.svg?react';
import Send from '@/assets/icons/send.svg?react';
import Camera from '@/assets/icons/camera.svg?react';
import Next from '@/assets/icons/next.svg?react';
import Prev from '@/assets/icons/prev.svg?react';
import Back from '@/assets/icons/back.svg?react';
import Front from '@/assets/icons/front.svg?react';
import IconMale from '@/assets/icons/icon-male.svg?react';
import IconFemale from '@/assets/icons/icon-female.svg?react';
import GenderFree from '@/assets/icons/icon-gender-free.svg?react';
import OpenTriangle from '@/assets/icons/open-triangle.svg?react';
import CloseTriangle from '@/assets/icons/close-triangle.svg?react';
import PetHart from '@/assets/icons/pet_hart.svg?react';
import PetCircle from '@/assets/icons/pet-circle.svg?react';
import PetHate from '@/assets/icons/pet-hate.svg?react';
import { IconType } from '@/types/icon.type';
import cn from '@/libs/cn';

const IconSVG: { [key in IconType]: FC<SVGProps<SVGSVGElement>> } = {
  character: ({ className, ...others }) => (
    <HouseCharacter
      className={cn('w-[20.25rem] h-[25.6875rem]', className)}
      {...others}
    />
  ),
  logo: ({ className, ...others }) => (
    <Logo
      className={cn('w-[6.5625rem] h-[9.1875rem]', className)}
      {...others}
    />
  ),
  welcome: ({ className, ...others }) => (
    <ImgWelcome
      className={cn('h-[30.75rem] w-[35.5rem]', className)}
      {...others}
    />
  ),
  'seeking-house': ({ className, ...others }) => (
    <SeekingHouse
      className={cn('h-[17.25rem] w-[24rem]', className)}
      {...others}
    />
  ),
  male: ({ className, ...others }) => (
    <Male className={cn('w-[4.75rem] h-[4.25rem]', className)} {...others} />
  ),
  female: ({ className, ...others }) => (
    <Female className={cn('w-[4.75rem] h-[4.25rem]', className)} {...others} />
  ),
  'dont-mind-sex': ({ className, ...others }) => (
    <DontMindSex
      className={cn('w-[4.75rem] h-[4.25rem]', className)}
      {...others}
    />
  ),
  'dont-mind-pet': ({ className, ...others }) => (
    <DontMindPet
      className={cn('w-[6.25rem] h-[4.5rem]', className)}
      {...others}
    />
  ),
  'pet-lover': ({ className, ...others }) => (
    <PetLover className={cn('w-[6.25rem] h-[4.5rem]', className)} {...others} />
  ),
  'none-pet-lover': ({ className, ...others }) => (
    <NonePetLover
      className={cn('w-[6.25rem] h-[4.5rem]', className)}
      {...others}
    />
  ),
  'studio-officetel': ({ className, ...others }) => (
    <StudioOfficetel
      className={cn('w-[4.75rem] h-[3.75rem]', className)}
      {...others}
    />
  ),
  'villa-townhouse': ({ className, ...others }) => (
    <VillaTownhouse
      className={cn('w-[4.75rem] h-[3.75rem]', className)}
      {...others}
    />
  ),
  apartment: ({ className, ...others }) => (
    <Apartment
      className={cn('w-[4.75rem] h-[3.75rem]', className)}
      {...others}
    />
  ),
  'single-family-house': ({ className, ...others }) => (
    <SingleFamilyHouse
      className={cn('w-[4.75rem] h-[3.75rem]', className)}
      {...others}
    />
  ),
  smoke: ({ className, ...others }) => (
    <Smoke className={cn('w-[4.75rem] h-[4.25rem]', className)} {...others} />
  ),
  'none-smoke': ({ className, ...others }) => (
    <NoneSmoke
      className={cn('w-[4.75rem] h-[4.25rem]', className)}
      {...others}
    />
  ),
  'left-arrow': ({ className, ...others }) => (
    <LeftArrowLogo
      className={cn('w-[1.125rem] h-[1rem]', className)}
      {...others}
    />
  ),
  'right-arrow': ({ className, ...others }) => (
    <RightArrow
      className={cn('w-[1.125rem] h-[1rem]', className)}
      {...others}
    />
  ),
  close: ({ className, ...others }) => (
    <Close className={cn('w-[0.6875rem] h-[0.75rem]', className)} {...others} />
  ),
  'expand-arrow': ({ className, ...others }) => (
    <ExpandArrow
      className={cn('w-[0.75rem] h-[0.375rem]', className)}
      {...others}
    />
  ),
  'google-logo': ({ className, ...others }) => (
    <GoogleLogo
      className={cn('w-[30.625rem] h-[3.5rem]', className)}
      {...others}
    />
  ),
  'kakaotalk-logo': ({ className, ...others }) => (
    <KakaotalkLogo
      className={cn('w-[30.625rem] h-[3.5rem]', className)}
      {...others}
    />
  ),
  invisible: ({ className, ...others }) => (
    <Invisible
      className={cn('w-[1.25rem] h-[1.25rem]', className)}
      {...others}
    />
  ),
  visible: ({ className, ...others }) => (
    <Visible className={cn('w-[1.25rem] h-[1.25rem]', className)} {...others} />
  ),
  'alarm-exist': ({ className, ...others }) => (
    <AlarmExist
      className={cn('w-[1.375rem] h-[1.6875rem]', className)}
      {...others}
    />
  ),
  'alarm-none': ({ className, ...others }) => (
    <AlarmNone
      className={cn('w-[1.375rem] h-[1.6875rem]', className)}
      {...others}
    />
  ),
  avatar: ({ className, ...others }) => (
    <Avatar
      className={cn('w-[2.5625rem] h-[2.5625rem]', className)}
      {...others}
    />
  ),
  'paper-clip': ({ className, ...others }) => (
    <PaperClip
      className={cn('w-[1rem] h-[1.3125rem]', className)}
      {...others}
    />
  ),
  send: ({ className, ...others }) => (
    <Send
      className={cn('w-[1.1875rem] h-[1.1875rem]', className)}
      {...others}
    />
  ),
  camera: ({ className, ...others }) => (
    <Camera
      className={cn('h-[4.375rem] w-[4.875rem]', className)}
      {...others}
    />
  ),
  prev: ({ className, ...others }) => (
    <Prev className={cn('w-[0.6875rem] h-[1.25rem]', className)} {...others} />
  ),
  next: ({ className, ...others }) => (
    <Next className={cn('w-[0.6875rem] h-[1.25rem]', className)} {...others} />
  ),
  back: ({ className, ...others }) => (
    <Back className={cn('w-[2.75rem] h-[2.75rem]', className)} {...others} />
  ),
  front: ({ className, ...others }) => (
    <Front className={className} {...others} />
  ),
  'icon-male': ({ className, ...others }) => (
    <IconMale
      className={(cn('w-[1.5rem] h-[1.5rem]'), className)}
      {...others}
    />
  ),
  'icon-female': ({ className, ...others }) => (
    <IconFemale
      className={(cn('w-[1.5rem] h-[1.5rem]'), className)}
      {...others}
    />
  ),
  'icon-gender-free': ({ className, ...others }) => (
    <GenderFree
      className={(cn('w-[1.5rem] h-[1.5rem]'), className)}
      {...others}
    />
  ),
  'open-triangle': ({ className, ...others }) => (
    <OpenTriangle className={(cn('w-[1.25rem]'), className)} {...others} />
  ),
  'close-triangle': ({ className, ...others }) => (
    <CloseTriangle className={(cn('w-[1.25rem]'), className)} {...others} />
  ),
  'pet-hart': ({ className, ...others }) => (
    <PetHart className={(cn('w-[1.125rem] h-auto'), className)} {...others} />
  ),
  'pet-circle': ({ className, ...others }) => (
    <PetCircle
      className={(cn('w-[1.125rem] h-[1.125rem]'), className)}
      {...others}
    />
  ),
  'pet-hate': ({ className, ...others }) => (
    <PetHate
      className={(cn('w-[1.125rem] h-[1.125rem'), className)}
      {...others}
    />
  ),
};

export default IconSVG;
