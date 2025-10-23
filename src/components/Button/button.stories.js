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
      options: ['primary', 'secondary'],
      table: {
        type: { summary: '"primary" | "secondary"' },
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

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Botão Primário',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Botão Secundário',
};
