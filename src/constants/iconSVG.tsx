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
import { IconType } from '@/types/icon.type';

const IconSVG: { [key in IconType]: FC<SVGProps<SVGSVGElement>> } = {
  character: props => <HouseCharacter {...props} />,
  logo: props => <Logo {...props} />,
  welcome: props => <ImgWelcome {...props} />,
  'seeking-house': props => <SeekingHouse {...props} />,
  male: props => <Male {...props} />,
  female: props => <Female {...props} />,
  'dont-mind-sex': props => <DontMindSex {...props} />,
  'dont-mind-pet': props => <DontMindPet {...props} />,
  'pet-lover': props => <PetLover {...props} />,
  'none-pet-lover': props => <NonePetLover {...props} />,
  'studio-officetel': props => <StudioOfficetel {...props} />,
  'villa-townhouse': props => <VillaTownhouse {...props} />,
  apartment: props => <Apartment {...props} />,
  'single-family-house': props => <SingleFamilyHouse {...props} />,
  smoke: props => <Smoke {...props} />,
  'none-smoke': props => <NoneSmoke {...props} />,
  'left-arrow': props => <LeftArrowLogo {...props} />,
  'right-arrow': props => <RightArrow {...props} />,
  close: props => <Close {...props} />,
  'expand-arrow': props => <ExpandArrow {...props} />,
  'google-logo': props => <GoogleLogo {...props} />,
  'kakaotalk-logo': props => <KakaotalkLogo {...props} />,
  invisible: props => <Invisible {...props} />,
  visible: props => <Visible {...props} />,
  'alarm-exist': props => <AlarmExist {...props} />,
  'alarm-none': props => <AlarmNone {...props} />,
  avatar: props => <Avatar {...props} />,
  'paper-clip': props => <PaperClip {...props} />,
  send: props => <Send {...props} />,
  camera: props => <Camera {...props} />,
  prev: props => <Prev {...props} />,
  next: props => <Next {...props} />,
  back: props => <Back {...props} />,
};

export default IconSVG;
