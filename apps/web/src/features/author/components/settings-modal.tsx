import { FC, useCallback } from 'react';
import { Form, InputField } from '@scrib/ui/form';
import { Button, Modal } from '@scrib/ui/components';
import { FiSettings } from 'react-icons/fi';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';
import { successNotification } from '@scrib/web/lib/notification';
import { settingsModalInfo$key } from '@scrib/web/__generated__/authorInfo.graphql';
import * as z from 'zod';

type SettingsModalProps = {
  user: settingsModalInfo$key;
};

type SettingsFormData = {
  first_name: string;
  last_name: string;
  avatar: string;
};

const SettingsFormSchema = z.object({
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  avatar: z.string().nonempty(),
});

export const SettingsModal: FC<SettingsModalProps> = ({ user }) => {
  const data = useFragment(
    graphql`
      fragment settingsModalInfo on User {
        firstName
        lastName
        id
        avatar
      }
    `,
    user
  );

  if (!data) return null;

  const onSubmit = () => {
    console.log('submit');
    successNotification('Settings saved');
  };

  return (
    <Modal
      triggerButton={
        <div className="cursor-pointer">
          <FiSettings size={30} />
        </div>
      }
      title="Settings"
      ariaDescribedBy="settings-modal"
      ariaLabelledBy="settings-modal"
      modalClassName="w-1/4"
    >
      <Form<SettingsFormData, typeof SettingsFormSchema>
        schema={SettingsFormSchema}
        onSubmit={onSubmit}
        className="align-center flex w-full flex-col justify-center"
      >
        {({ formState, register, getValues }) => (
          <>
            <InputField
              label="First Name"
              type="text"
              registration={register('first_name')}
              error={formState.errors['first_name']}
              disabled={formState.isSubmitting}
              defaultValue={data.firstName}
            />
            <InputField
              label="Last Name"
              type="text"
              error={formState.errors['last_name']}
              registration={register('last_name')}
              disabled={formState.isSubmitting}
              defaultValue={data.lastName}
            />
            <InputField
              label="Avatar"
              type="text"
              error={formState.errors['avatar']}
              registration={register('avatar')}
              disabled={formState.isSubmitting}
              defaultValue={data.avatar}
            />
            <Button
              type="submit"
              disabled={!formState.isValid}
              className="mt-4"
            >
              Save
            </Button>
          </>
        )}
      </Form>
    </Modal>
  );
};
