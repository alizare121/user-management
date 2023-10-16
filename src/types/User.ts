export type AddressType = {
  city?: string | undefined;
  street?: string | undefined;
  suite?: string | undefined;
};

export type UserType = {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: AddressType;
};
