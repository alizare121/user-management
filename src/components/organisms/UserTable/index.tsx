import { useState , useSelector } from '@utils';
import { Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { UserModal } from '@components';
import { UserType, AddressType } from '@types';

export function UserTable() {
  const users = useSelector((state: any) => state.users);
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRowClick = (user: UserType) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address: AddressType) => (
        <span>
          {address.city} - {address.street} - {address.suite}
        </span>
      ),
    },
    {
      title: 'Operation',
      dataIndex: 'Operation',
      key: 'Operation',
      render: (_: unknown, record: UserType) => (
        <EyeOutlined onClick={() => handleRowClick(record)} />
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={users as UserType[]} size='small' />
      <UserModal
        user={selectedUser}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
}
