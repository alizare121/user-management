import { UserType } from './User';

export type ModalState = {
  isModalVisible: boolean;
  user: UserType | null | undefined;
};

export type UserModalProps = {
  user: UserType | null | undefined;
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
};
