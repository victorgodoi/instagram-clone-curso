import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Clique aqui',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      description: 'Define o estilo visual do botão.',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'link'],
      table: {
        type: { summary: '"primary" | "secondary" | "link"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    children: {
      description: 'Texto exibido dentro do botão.',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '"Clique aqui"' },
      },
    },
  },
};

export const Primary ={
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
};

export const Link = {
  args: {
    variant: 'link',
    children: 'Botão Link',
  },
};
