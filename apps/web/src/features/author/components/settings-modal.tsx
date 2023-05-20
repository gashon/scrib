import { FC, useState } from 'react';
import { Form, InputField, FileInputField } from '@scrib/ui/form';
import { Button, Modal } from '@scrib/ui/components';
import { FiSettings } from 'react-icons/fi';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';
import { successNotification } from '@scrib/web/lib/notification';
import { uploadImage } from '@scrib/web/utils';
import { updateAuthorAttributes } from '@scrib/web/features/author';
import { settingsModalInfo$key } from '@scrib/web/__generated__/authorInfo.graphql';
import * as z from 'zod';

type SettingsModalProps = {
  user: settingsModalInfo$key;
};

type SettingsFormData = {
  first_name: string;
  last_name: string;
};

const SettingsFormSchema = z.object({
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
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
  const [avatar, setAvatar] = useState(data?.avatar);

  if (!data) return null;

  const onSubmit = (values: SettingsFormData) => {
    updateAuthorAttributes({
      first_name: values.first_name,
      last_name: values.last_name,
      avatar,
    });
    successNotification('Settings updated');
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
      modalClassName="sm:w-1/4"
    >
      <Form<SettingsFormData, typeof SettingsFormSchema>
        schema={SettingsFormSchema}
        onSubmit={onSubmit}
        className="align-center flex w-full flex-col justify-center"
      >
        {({ formState, register, getValues, setValue }) => (
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
            <FileInputField
              label="Avatar"
              error={formState.errors['avatar']}
              disabled={formState.isSubmitting}
              defaultValue={avatar}
              onFileChange={async (file) => {
                const { data } = await uploadImage('profile', file);
                setAvatar(data.url);
              }}
            />
            <Button
              type="submit"
              disabled={formState.isSubmitting}
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
