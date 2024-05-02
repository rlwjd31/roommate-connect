import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useModal from 'hooks/useModal';

import IconButton from '@/components/molecules/IconButton';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import Icon from '@/components/atoms/Icon';
import Badge from '@/components/atoms/Badge';
import Divider from '@/components/atoms/Divider';
import Container from '@/components/atoms/Container';
import Selector from '@/components/molecules/Selector';
import { district, region } from '@/constants/regions';
import Img from '@/components/atoms/Img';
import DualInputRange, {
  InputRangeState,
} from '@/components/molecules/DualInputRange';
import InputRange from '@/components/atoms/InputRange';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import TextField from '@/components/molecules/TextField';
import StepIndicator from '@/components/atoms/StepLink';
import LabelDualInputRange from '@/components/organisms/LabelDualInputRange';
import Carousel from '@/components/organisms/Carousel';
import DistrictSelector from '@/components/organisms/districtSelector/DistrictSelector';
import LabelStepIndicator from '@/components/molecules/LabelStepIndicator';
import StepNavigation from '@/components/molecules/StepNavigation';
import { AlertModalState, ConfirmModalState } from '@/types/modal.type';

export default function ComponentTest() {
  const [carouselStep, setCarouselStep] = useState<number>(0);
  const [termLabelRange, setTermLabelRange] = useState<InputRangeState>([
    0, 24,
  ]);
  const [priceLabelRange, setPriceLabelRange] = useState<InputRangeState>([
    0, 10000,
  ]);
  const [dualRangeValue, setDualRangeValue] = useState<InputRangeState>([
    0, 100,
  ]);

  const { setModalState: setAlertModal, closeModal: closeAlertModal } =
    useModal('Alert');
  const alertModaContext: AlertModalState = {
    isOpen: true,
    type: 'Alert',
    title: '알림',
    message: '이메일로 인증번호가 전송되었습니다.',
    buttonContent: '확인',
    onClickConfirm: () => {
      alert('AlertModal is Popped!!');
      closeAlertModal();
    },
  };
  const { setModalState: setConfirmModal, closeModal: closeConfirmModal } =
    useModal('Confirm');
  const confirmModalContext: ConfirmModalState = {
    isOpen: true,
    type: 'Confim',
    title: '친구 차단',
    message: '선택한 유저를 차단하시겠습니까?',
    confirmButtonContent: '차단',
    cancelButtonContent: '취소',
    onClickConfirm: () => {
      alert('user is blocked!!✅');
      closeConfirmModal();
    },
    onClickCancel: () => {
      closeConfirmModal();
    },
  };

  const labelStepContents = [
    {
      labelName: '집 유형, 매물 종류',
      isActive: false,
    },
    {
      labelName: '위치, 기간',
      isActive: true,
    },
    {
      labelName: '가격대',
      isActive: false,
    },
  ];
  const [rangeValue, setRangeValue] = useState<number>(0);
  const formValues = useForm();

  console.log('📝📝📝 component Test is rendered!!');

  return (
    <div className="flex flex-col bg-bg p-8">
      {/* Button test */}
      <h1 className="my-12 text-Head1">Button</h1>
      <div className="flex">
        <div className="m-2 flex flex-col items-center justify-center gap-y-1 p-2">
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="brown3"
            iconType="right-arrow"
          >
            <Typography.Head1 className="text-point">
              Ghost and Head1!
            </Typography.Head1>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Head1>Ghost and Head1!</Typography.Head1>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Head3>Ghost and Head3!</Typography.Head3>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle1>Ghost and SubTitle1</Typography.SubTitle1>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle2>Ghost and SubTitle2</Typography.SubTitle2>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle3>Ghost and SubTitle3</Typography.SubTitle3>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P1>Ghost and P1</Typography.P1>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P2>Ghost and P2</Typography.P2>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P3>Ghost and P3</Typography.P3>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Span1>Ghost and Span1</Typography.Span1>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Span2>Ghost and Span2</Typography.Span2>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SpanMid1>Ghost and SpanMid1</Typography.SpanMid1>
          </IconButton.Ghost>
          <IconButton.Ghost
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SpanMid2>Ghost and SpanMid2</Typography.SpanMid2>
          </IconButton.Ghost>
        </div>
        <div className="m-2 flex flex-col items-center justify-center gap-y-1 p-2">
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Head1 className="text-subColor2">
              Outline and Head1!
            </Typography.Head1>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Head1>Outline and Head1!</Typography.Head1>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Head3>Outline and Head3!</Typography.Head3>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle1>Outline and SubTitle1</Typography.SubTitle1>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle2>Outline and SubTitle2</Typography.SubTitle2>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle3>Outline and SubTitle3</Typography.SubTitle3>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P1>Outline and P1</Typography.P1>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P2>Outline and P2</Typography.P2>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P3>Outline and P3</Typography.P3>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Span1>Outline and Span1</Typography.Span1>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Span2>Outline and Span2</Typography.Span2>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SpanMid1>Outline and SpanMid1</Typography.SpanMid1>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SpanMid2>Outline and SpanMid2</Typography.SpanMid2>
          </IconButton.Outline>
        </div>
        <div className="m-2 flex flex-col items-center justify-center gap-y-1 p-2">
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Head1>Fill and Head1!</Typography.Head1>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Head1>Fill and Head1!</Typography.Head1>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Head3>Fill and Head3!</Typography.Head3>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle1>Fill and SubTitle1</Typography.SubTitle1>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle2>Fill and SubTitle2</Typography.SubTitle2>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SubTitle3>Fill and SubTitle3</Typography.SubTitle3>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P1>Fill and P1</Typography.P1>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P2>Fill and P2</Typography.P2>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.P3>Fill and P3</Typography.P3>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Span1>Fill and Span1</Typography.Span1>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.Span2>Fill and Span2</Typography.Span2>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SpanMid1>Fill and SpanMid1</Typography.SpanMid1>
          </IconButton.Fill>
          <IconButton.Fill
            className="flex items-center justify-between rounded-full p-4 text-subColor1"
            stroke="point"
            iconType="right-arrow"
          >
            <Typography.SpanMid2>Fill and SpanMid2</Typography.SpanMid2>
          </IconButton.Fill>
        </div>
        <div className="m-2 flex flex-col items-center justify-center gap-y-1 p-2">
          <BadgeButton
            iconType="right-arrow"
            stroke="subColor1"
            iconClassName="group-hover:[&_path]:stroke-subColor2"
          >
            <Typography.SpanMid1 className="text-brown4 group-hover:text-brown">
              Button And Fill With Icon
            </Typography.SpanMid1>
          </BadgeButton>
          <BadgeButton>
            <Typography.P2 className="text-brown4 group-hover:text-brown">
              Button And Fill Without Icon
            </Typography.P2>
          </BadgeButton>
          <BadgeButton.Outline
            iconType="right-arrow"
            stroke="brown3"
            iconClassName="group-hover:[&_path]:stoke-subColor2"
          >
            <Typography.SpanMid2 className="text-brown">
              Button And Outline With Icon
            </Typography.SpanMid2>
          </BadgeButton.Outline>
          <BadgeButton.Outline>
            <Typography.Head3 className="text-brown">
              Button And Outline Without Icon
            </Typography.Head3>
          </BadgeButton.Outline>
          <Badge.Fill>
            <Typography.P1 className="text-brown4">
              None Button And Fill Without Icon
            </Typography.P1>
          </Badge.Fill>
          <Badge.Fill>
            <Icon
              type="right-arrow"
              stroke="point"
              className="group-hover:[&_path]:stroke-subColor2"
            />
            <Typography.P1 className="text-brown4">
              None Button And Fill With Icon
            </Typography.P1>
          </Badge.Fill>
          <Badge.Outline className="flex justify-between p-2">
            <Icon
              type="right-arrow"
              stroke="point"
              className="group-hover:[&_path]:stroke-subColor2"
            />
            <Typography.Span1 className="text-center text-brown">
              None Button And Outline With Icon
            </Typography.Span1>
          </Badge.Outline>
          <Badge.Outline className="flex justify-center p-2">
            <Typography.Span2 className="text-center text-brown">
              None Button And Outline Without Icon
            </Typography.Span2>
          </Badge.Outline>
        </div>
      </div>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      {/* divider test */}
      <h1 className="my-12 text-Head1">Divider</h1>
      <div>
        <div className="flex gap-2">
          <span>list1</span>
          <Divider.Row />
          <span>list2</span>
        </div>
        <br />
        <div className="flex w-fit flex-col gap-2">
          <span>list3</span>
          <Divider.Col type="medium" />
          <span>list4</span>
        </div>

        <br />
        <div className="flex gap-2">
          <span>list1</span>
          <Divider.Row type="thick" />
          <span>list2</span>
        </div>
        <br />
        <div className="flex">
          <Divider.Row>SNS 계정으로 로그인</Divider.Row>
        </div>
      </div>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      {/* container test */}
      <h1 className="my-12 text-Head1">Container</h1>
      <h2 className="my-3 text-Head3">Container Grid</h2>
      <Container.Grid className="grid-cols-2 grid-rows-2 bg-brown2">
        <div>someting</div>
        <div>someting</div>
        <div>someting</div>
        <div>someting</div>
      </Container.Grid>
      <br />
      <h2 className="my-3 text-Head3">Container FlexRow</h2>
      <Container.FlexRow className="gap-2 bg-subColor1">
        <div>someting</div>
        <div>someting</div>
      </Container.FlexRow>
      <br />
      <h2 className="my-3 text-Head3">Container FlexCol</h2>
      <Container.FlexCol className="gap-3 bg-brown1">
        <div>someting</div>
        <div>someting</div>
        <div>someting</div>
      </Container.FlexCol>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      {/* selector test */}
      <h1 className="my-12 text-Head1">Selector</h1>
      <Container.FlexRow className="gap-3">
        <Selector className="max-w-28" contents={region} label="지역" />
        <Selector
          className="max-w-48 [&_div>li>button]:justify-start"
          contents={district['서울']}
          label="시, 구"
        />
      </Container.FlexRow>
      <hr style={{ marginTop: '12rem', marginBottom: '2rem' }} />
      {/* districtSelector test */}
      <h1 className="my-12 text-Head1">District Selector</h1>
      <DistrictSelector />

      <hr style={{ marginTop: '12rem', marginBottom: '2rem' }} />
      {/* img test */}
      <h1 className="my-12 text-Head1">Image</h1>
      <Img
        src="https://source.unsplash.com/random/300×300"
        alt="house image"
        className="max-h-80 max-w-80"
      />
      {/* InputRange test */}
      <h1 className="my-12 text-Head1">InputRange</h1>
      <Container className="w-full max-w-[30rem]">
        <LabelDualInputRange
          className="mb-14"
          min={0}
          max={24}
          step={1}
          rangeValue={termLabelRange}
          setRangeValue={setTermLabelRange}
          category="term"
        />
        <LabelDualInputRange
          className="mb-14"
          min={0}
          max={10000}
          step={100}
          rangeValue={priceLabelRange}
          setRangeValue={setPriceLabelRange}
          label="보증금"
          category="price"
        />
        <DualInputRange
          rangeValue={dualRangeValue}
          setRangeValue={setDualRangeValue}
          min={0}
          max={200}
          step={1}
        />
        <div style={{ marginTop: '1rem' }}>
          <span>{`min: ${dualRangeValue[0]}\t`}</span>
          <span>{`max: ${dualRangeValue[1]}`}</span>
        </div>

        <InputRange
          min={0}
          max={100}
          value={rangeValue}
          onChange={e => setRangeValue(+e.target.value)}
          step={1}
          overlap={false}
        />
      </Container>
      {/* Step Indicator test */}
      <h1 className="my-12 text-Head1">Step Indicator</h1>
      <div>
        <StepIndicator labelName="집 유형, 매물 종류" />
      </div>
      <div className="mb-7" />
      <div>
        <StepIndicator labelName="위치, 기간" />
      </div>
      <hr style={{ marginTop: '12rem', marginBottom: '2rem' }} />
      {/* LabelStepIndicator test */}
      <h1 className="my-12 text-Head1">LabelStepIndicator</h1>
      <StepNavigation contents={labelStepContents} />
      <StepNavigation
        contents={[
          { labelName: '흡연, 반려동물', isActive: true },
          { labelName: '나의 라이프스타일 어필', isActive: false },
        ]}
      />
      {/* Carousel Test */}
      <Typography.Head1 className="mt-12">Carousel </Typography.Head1>
      <Container className="w-[300px]">
        <Carousel order={carouselStep}>
          <img
            src="https://picsum.photos/300/300"
            alt="house"
            className="flex-1"
          />
          <img
            src="https://source.unsplash.com/random/300×300"
            alt="house"
            className="flex-1"
          />
          <img
            src="https://picsum.photos/300/300"
            alt="house"
            className="flex-1"
          />
          <img
            src="https://source.unsplash.com/random/300×300"
            alt="house"
            className="flex-1"
          />
          <img
            src="https://picsum.photos/300/300"
            alt="house"
            className="flex-1"
          />
        </Carousel>
        <Container.FlexRow>
          <IconButton.Outline
            className="gap-x-1 rounded-xl px-12 py-8"
            iconType="right-arrow"
            direction="left"
            onClick={() => setCarouselStep(prev => (prev !== 0 ? prev - 1 : 4))}
          >
            <Typography.P1 className="text-brown">이전</Typography.P1>
          </IconButton.Outline>
          <IconButton.Fill
            className="gap-x-1 rounded-xl px-12 py-8"
            iconType="right-arrow"
            stroke="bg"
            onClick={() => setCarouselStep(prev => (prev !== 4 ? prev + 1 : 0))}
          >
            <Typography.P1 className="text-bg">다음</Typography.P1>
          </IconButton.Fill>
        </Container.FlexRow>
      </Container>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      {/* Label & Input & TextField test */}
      <h1 className="text-Head2">Label & Input Test</h1>
      <Container className="mt-1 w-full max-w-[30rem]">
        <Label htmlFor="name" className="mt-3">
          name
        </Label>
        <Input type="text" id="name" placeholder="이름을 입력하세요" />
        <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
        <h1 className="text-Head2">TextField Test</h1>
        {/* <TextField /> */}
        <FormProvider {...formValues}>
          <TextField
            labelName="name"
            name="name"
            containerStyle="mt-3"
            options={{ required: true, minLength: 2 }}
          />
        </FormProvider>
      </Container>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      {/* Alert & Confirm & Profile Modal test */}
      <h1 className="text-Head2">ModalTest</h1>
      <button
        className="mb-10"
        type="button"
        onClick={() => setAlertModal(alertModaContext)}
      >
        Alert modal 열기
      </button>
      <button
        type="button"
        onClick={() => setConfirmModal(confirmModalContext)}
      >
        Confirm modal 열기
      </button>
    </div>
  );
}
