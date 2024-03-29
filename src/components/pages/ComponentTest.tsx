import { useState } from 'react';

import IconButton from '@/components/molecules/IconButton';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import Icon from '@/components/atoms/Icon';
import Badge from '@/components/atoms/Badge';
import Divider from '@/components/atoms/Divider';
import Container from '@/components/atoms/Container';
import Dropdown from '@/components/molecules/Dropdown';
import { district, region } from '@/constants/regions';
import Img from '@/components/atoms/Img';
import DualInputRange, {
  InputRangeState,
} from '@/components/molecules/DualInputRange';
import InputRange from '@/components/atoms/InputRange';
import StepIndicator from '@/components/atoms/StepIndicator';

export default function ComponentTest() {
  const [dualRangeValue, setDualRangeValue] = useState<InputRangeState>({
    min: 0,
    max: 100,
  });

  const [rangeValue, setRangeValue] = useState<number>(0);

  return (
    <div className="flex flex-col p-8">
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
            icon={
              <Icon
                type="right-arrow"
                stroke="subColor1"
                className="group-hover:[&_path]:stroke-subColor2"
              />
            }
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
            icon={
              <Icon
                type="right-arrow"
                stroke="brown3"
                className="group-hover:[&_path]:stroke-subColor2"
              />
            }
          >
            <Typography.SpanMid2 className="text-brown group-hover:text-brown4">
              Button And Outline With Icon
            </Typography.SpanMid2>
          </BadgeButton.Outline>
          <BadgeButton.Outline>
            <Typography.Head3 className="text-brown group-hover:text-brown4">
              Button And Outline Without Icon
            </Typography.Head3>
          </BadgeButton.Outline>
          <Badge.Fill>
            <Typography.P1 className="text-brown4 group-hover:text-brown">
              None Button And Fill Without Icon
            </Typography.P1>
          </Badge.Fill>
          <Badge.Fill
            icon={
              <Icon
                type="right-arrow"
                stroke="point"
                className="group-hover:[&_path]:stroke-subColor2"
              />
            }
          >
            <Typography.P1 className="text-brown4 group-hover:text-brown">
              None Button And Fill With Icon
            </Typography.P1>
          </Badge.Fill>
          <Badge.Outline
            className="flex justify-between p-2"
            icon={
              <Icon
                type="right-arrow"
                stroke="point"
                className="group-hover:[&_path]:stroke-subColor2"
              />
            }
          >
            <Typography.Span1 className="text-center text-brown group-hover:text-brown4">
              None Button And Outline With Icon
            </Typography.Span1>
          </Badge.Outline>
          <Badge.Outline className="flex justify-center p-2">
            <Typography.Span2 className="text-center text-brown group-hover:text-brown4">
              None Button And Outline Without Icon
            </Typography.Span2>
          </Badge.Outline>
        </div>
      </div>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      {/* divider test */}
      <h1 className="my-12 text-Head1">Divider</h1>
      <div>
        <div className="flex">
          <span>something1</span>
          <Divider.Row />
          <span>something2</span>
        </div>
        <div className="flex-col">
          <span>span1</span>
          <Divider.Col type="thick" />
          <span>span2</span>
        </div>
      </div>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      {/* container test */}
      <h1 className="my-12 text-Head1">Container</h1>
      <h2 className="text-Head3">Container Grid</h2>
      <Container.Grid className="grid-cols-2 grid-rows-2 bg-brown2">
        <div>someting</div>
        <div>someting</div>
        <div>someting</div>
        <div>someting</div>
      </Container.Grid>
      <br />
      <Container.FlexRow className="gap-2 bg-subColor1">
        <div>someting</div>
        <div>someting</div>
      </Container.FlexRow>
      <br />
      <Container.FlexCol className="gap-3 bg-brown1">
        <div>someting</div>
        <div>someting</div>
        <div>someting</div>
      </Container.FlexCol>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      {/* dropdown test */}
      <h1 className="my-12 text-Head1">Dropdown</h1>
      <Container.FlexRow className="gap-3">
        <Dropdown className="max-w-28" contents={region} label="지역" />
        <Dropdown
          className="max-w-48"
          contents={district['서울']}
          label="시, 구"
        />
      </Container.FlexRow>
      <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
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
        <DualInputRange
          rangeValue={dualRangeValue}
          setRangeValue={setDualRangeValue}
          min={0}
          max={200}
          step={1}
        />
        <div style={{ marginTop: '1rem' }}>
          <span>{`min: ${dualRangeValue.min}\t`}</span>
          <span>{`max: ${dualRangeValue.max}`}</span>
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
      <StepIndicator totalStepCount={3} currentStep={1} direction="vertical" />
      <div className="mb-7" />
      <StepIndicator
        totalStepCount={3}
        currentStep={1}
        direction="horizontal"
      />
    </div>
  );
}
