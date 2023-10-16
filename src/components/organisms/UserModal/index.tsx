import { Modal, Button, Input } from 'antd';
import { UserModalProps } from '@types';
import { updateUser, deleteUser } from '@store';
import { useEffect, useDispatch, useStates } from '@utils';

import './styles.css';

interface StateInterface {
  email?: string;
  name?: string;
  phone?: string;
  city?: string;
  street?: string;
  suite?: string;
}
const initialState: StateInterface = {
  email: '',
  name: '',
  phone: '',
  city: '',
  street: '',
  suite: '',
};

export function UserModal({
  user,
  isModalVisible,
  setIsModalVisible,
}: UserModalProps) {
  const dispatch = useDispatch();
  const [state, setState] = useStates(initialState);
  const { name, email, phone, city, street, suite } = state;

  useEffect(() => {
    setState({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      city: user?.address.city,
      street: user?.address.street,
      suite: user?.address.suite,
    });
  }, [user]);

  const handleUpdate = () => {
    const formData = {
      id: user?.id,
      name,
      phone,
      email,
      address: {
        city,
        street,
        suite,
      },
    };
    dispatch(updateUser(formData));
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    user?.id && dispatch(deleteUser(user.id));
    setIsModalVisible(false);
  };

  const onChangeText = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({
      [key]: event.target.value,
    });
  };

  return (
    <Modal
      title='User Details'
      open={isModalVisible}
      onOk={handleUpdate}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key='delete' type='primary' danger onClick={handleDelete}>
          Delete
        </Button>,
        <Button key='update' type='primary' onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <form>
        <Input
          placeholder='Name'
          value={name}
          onChange={(e) => onChangeText('name', e)}
        />
        <Input
          placeholder='Email'
          value={email}
          onChange={(e) => onChangeText('email', e)}
        />
        <Input
          placeholder='Phone'
          value={phone}
          onChange={(e) => onChangeText('phone', e)}
        />
        <Input
          placeholder='City'
          value={city}
          onChange={(e) => onChangeText('city', e)}
        />
        <Input
          placeholder='Street'
          value={street}
          onChange={(e) => onChangeText('street', e)}
        />
        <Input
          placeholder='Suite'
          value={suite}
          onChange={(e) => onChangeText('suite', e)}
        />
      </form>
    </Modal>
  );
}
