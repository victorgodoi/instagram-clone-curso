// ✅ Código atualizado do story

import Header from './index';
import { useEffect, useState } from 'react';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    user: {
      description: 'Nome do usuário logado. Se for null, mostra o estado deslogado.',
      control: 'text',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
  },
};

const Template = (args) => {
  const [user, setUser] = useState(args.user);

  useEffect(() => {
    setUser(args.user);
  }, [args.user]);

  return <Header {...args} user={user} setUser={setUser} />;
};

export const Deslogada = Template.bind({});
Deslogada.args = {
  user: null,
};

export const Logada = Template.bind({});
Logada.args = {
  user: 'Usuário',
};
