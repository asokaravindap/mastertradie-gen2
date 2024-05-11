import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

type CustomerTableProps = {
  signOut: () => void;
};

const SidePane: React.FC<CustomerTableProps> = ({ signOut }) => {
  const itemRenderer = (item: any) => (
    <div
      className="p-menuitem-content"
      style={{
        display: 'flex',
        justifyContent: item.isSpecial ? 'center' : 'left'
      }}
    >
      <a
        className="flex align-items-center p-menuitem-link"
        onClick={item.command}
        style={{ color: 'var(--text-color)' }}
      >
        <span className={item.icon} />
        <span className="mx-2" style={{ fontWeight: item.isSpecial ? 'bold' : 'normal' }}>
          {item.label}
        </span>
        {item.badge && <Badge className="ml-auto" value={item.badge} />}
      </a>
    </div>
  );

  let items = [
    {
      label: 'Dashboard',
      icon: PrimeIcons.TH_LARGE,
      command: () => {
        console.log('Dashboard');
      },
      isSpecial: true,
      template: itemRenderer
    },
    {
      separator: true
    },
    {
      label: 'Customers',
      items: [
        {
          label: 'View',
          icon: PrimeIcons.USERS,
          command: () => {
            console.log('New');
          },
          template: itemRenderer
        },
        {
          label: 'Add',
          icon: PrimeIcons.USER_PLUS,
          command: () => {
            console.log('Open');
          },
          template: itemRenderer
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Tags',
      items: [
        {
          label: 'View',
          icon: PrimeIcons.TAGS,
          command: () => {
            console.log('Undo');
          },
          template: itemRenderer
        },
        {
          label: 'Edit',
          icon: PrimeIcons.PENCIL,
          command: () => {
            console.log('Undo');
          },
          template: itemRenderer
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Emails',
      items: [
        {
          label: 'View',
          icon: PrimeIcons.ENVELOPE,
          command: () => {
            console.log('Undo');
          },
          template: itemRenderer
        },
        {
          label: 'Edit',
          icon: PrimeIcons.PENCIL,
          command: () => {
            console.log('Undo');
          },
          template: itemRenderer
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Reminders',
      items: [
        {
          label: 'View',
          icon: PrimeIcons.CALENDAR,
          command: () => {
            console.log('Undo');
          },
          badge: 2,
          template: itemRenderer
        },
        {
          label: 'Add',
          icon: PrimeIcons.CALENDAR_PLUS,
          command: () => {
            console.log('Undo');
          },
          template: itemRenderer
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Sign Out',
      icon: PrimeIcons.SIGN_OUT,
      command: () => {
        signOut();
      },
      isSpecial: true,
      template: itemRenderer
    }
  ];

  return <Menu model={items} className="w-full md:w-15rem" style={{ borderRadius: '10px' }} />;
};

export default SidePane;
