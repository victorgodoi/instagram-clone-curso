import './notification.css';
import NotificationList from './index';
import { NotificationProvider } from '../../providers/NotificationProvider';
import { useNotification } from '../../hooks/useNotification';
import Button from '../Button';

export default {
  title: 'Components/Notification',
  component: NotificationList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Renderiza uma lista de notificações flutuantes (toasts) no canto superior direito da tela. ' +
          'Usado em conjunto com o `NotificationProvider` e o hook `useNotification()`.',
      },
    },
  },
  argTypes: {
    notifications: {
      description:
        'Array de objetos representando as notificações a serem exibidas. Cada notificação deve conter `id`, `type`, `title` e `description`.',
      control: { type: 'object' },
      table: {
        type: { summary: 'Array<Notification>' },
        defaultValue: { summary: '[]' },
      },
    },
    onRemove: {
      description:
        'Função chamada ao clicar no botão de fechar (×) de uma notificação. Recebe o `id` da notificação a ser removida.',
      control: false,
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <NotificationProvider>
        <div style={{ minHeight: '200px', padding: '2rem' }}>
          <Story />
        </div>
      </NotificationProvider>
    ),
  ],
};

// === PLAYGROUND INTERATIVO ===
const DemoNotifications = () => {
  const { notify } = useNotification();

  const triggerNotification = (type) => {
    const titles = {
      success: 'Sucesso!',
      error: 'Erro!',
      info: 'Informação',
    };

    const descriptions = {
      success: 'A operação foi concluída com êxito.',
      error: 'Algo deu errado. Tente novamente.',
      info: 'Aqui está uma mensagem informativa.',
    };

    notify({
      type,
      title: titles[type],
      description: descriptions[type],
      duration: 4000,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button onClick={() => triggerNotification('success')}>Notificar Sucesso</Button>
      <Button onClick={() => triggerNotification('error')}>Notificar Erro</Button>
      <Button onClick={() => triggerNotification('info')}>Notificar Info</Button>
    </div>
  );
};

export const Playground = {
  render: () => <DemoNotifications />,
  parameters: {
    docs: {
      description: {
        story:
          'Story interativa que permite disparar notificações reais usando o contexto `NotificationProvider` e o hook `useNotification()`.',
      },
    },
  },
};

// === EXEMPLOS ESTÁTICOS ===
export const StaticExamples = {
  render: () => (
    <NotificationList
      notifications={[
        { id: '1', type: 'success', title: 'Tudo certo!', description: 'Operação realizada com sucesso.' },
        { id: '2', type: 'error', title: 'Falha!', description: 'Não foi possível completar a ação.' },
        { id: '3', type: 'info', title: 'Atenção', description: 'Confira os detalhes no painel.' },
      ]}
      onRemove={() => {}}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Exemplo estático mostrando as três variações de notificação (`success`, `error` e `info`). ' +
          'Útil para testes visuais e regressão com Chromatic.',
      },
    },
  },
};

// === STORY COM CONTROLES (args) ===
const Template = (args) => (
  <NotificationList
    notifications={[
      {
        id: '1',
        type: args.type,
        title: args.title,
        description: args.description,
      },
    ]}
    onRemove={() => {}}
  />
);

export const WithControls = Template.bind({});
WithControls.args = {
  type: 'success',
  title: 'Mensagem de exemplo',
  description: 'Esta é uma notificação configurável via painel.',
};

WithControls.argTypes = {
  type: {
    description: 'Define o tipo de notificação (controla o estilo visual).',
    control: {
      type: 'select',
    },
    options: ['success', 'error', 'info'],
    table: {
      type: { summary: '"success" | "error" | "info"' },
      defaultValue: { summary: '"success"' },
    },
  },
  title: {
    description: 'Título exibido na notificação.',
    control: 'text',
    table: {
      type: { summary: 'string' },
    },
  },
  description: {
    description: 'Texto descritivo abaixo do título.',
    control: 'text',
    table: {
      type: { summary: 'string' },
    },
  },
};

WithControls.parameters = {
  docs: {
    description: {
      story:
        'Permite alterar o tipo (`success`, `error`, `info`), o título e a descrição da notificação em tempo real usando os controles do Storybook.',
    },
  },
};
