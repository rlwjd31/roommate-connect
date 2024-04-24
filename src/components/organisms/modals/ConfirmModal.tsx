import { MouseEvent } from 'react';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';

export type ConfirmModalProps = {
  title: string;
  message: string;
  onClickCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickConfirm?: (e: MouseEvent<HTMLButtonElement>) => void;
  confirmButtonContent?: string;
  cancelButtonContent?: string;
};

// ! position: absolute로 설정하려 했지만 부모 요소 중 relative가 있어 정렬이 안 되는 문제 파악
// ! 따라서 position: fixed로 하면 body를 기준으로 하므로 fixed를 이용
export default function ConfirmModal({
  title,
  message,
  confirmButtonContent,
  cancelButtonContent,
  onClickConfirm,
  onClickCancel,
}: ConfirmModalProps) {
  return (
    <Container.FlexRow className="fixed left-0 top-0 z-50 h-[100vh] w-[100vw] items-center justify-center bg-[#6D6D6D]/50">
      <Container.FlexCol className="w-full max-w-96 gap-3 rounded-2xl bg-bg p-6 text-brown">
        <Container.FlexCol className="gap-6">
          <Typography.SubTitle3>{title}</Typography.SubTitle3>
          <Typography.P3>{message}</Typography.P3>
        </Container.FlexCol>
        <Container.FlexRow className="justify-end">
          <Button.Ghost
            onClick={onClickCancel}
            type="button"
            className="translate-y-[15px] px-5 py-4"
          >
            <Typography.P3 className="font-semibold">
              {cancelButtonContent}
            </Typography.P3>
          </Button.Ghost>
          <Button.Ghost
            onClick={onClickConfirm}
            type="button"
            className="translate-y-[15px] px-5 py-4"
          >
            <Typography.P3 className="font-semibold">
              {confirmButtonContent}
            </Typography.P3>
          </Button.Ghost>
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexRow>
  );
}

ConfirmModal.defaultProps = {
  onClickCancel: () => {},
  onClickConfirm: () => {},
  confirmButtonContent: '확인',
  cancelButtonContent: '취소',
};
