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

  const formData = [
    {
      key: 'name',
      value: name,
    },
    {
      key: 'email',
      value: email,
    },
    {
      key: 'phone',
      value: phone,
    },
    {
      key: 'city',
      value: city,
    },
    {
      key: 'street',
      value: street,
    },
    {
      key: 'suite',
      value: suite,
    },
  ];

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
        {formData.map(({ key, value }) => (
          <Input
            key={key}
            onChange={(e) => onChangeText(key, e)}
            placeholder={key}
            value={value}
          />
        ))}
      </form>
    </Modal>
  );
}
