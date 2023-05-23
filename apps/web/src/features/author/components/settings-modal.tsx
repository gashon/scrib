import { FC, useState } from 'react';
import { Form, InputField, FileInputField } from '@scrib/ui/form';
import { Button, Modal } from '@scrib/ui/components';
import { FiSettings } from 'react-icons/fi';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';
import { successNotification } from '@scrib/web/lib/notification';
import { uploadImage } from '@scrib/web/utils';
import { updateAuthorAttributes } from '@scrib/web/features/author';
import { useLogout } from '@scrib/web/features/auth';
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
  const logout = useLogout();

  if (!data) return null;

  const onSubmit = async (values: SettingsFormData) => {
    try {
      await updateAuthorAttributes({
        first_name: values.first_name,
        last_name: values.last_name,
        avatar,
      });
      successNotification('Settings updated');
    } catch (err) {
      console.log(err);
    }
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
      modalClassName="w-1/2 lg:w-2/5"
      hasBackgroundSVG={false}
    >
      <Form<SettingsFormData, typeof SettingsFormSchema>
        schema={SettingsFormSchema}
        onSubmit={onSubmit}
        className="align-center flex w-full flex-col justify-center"
      >
        {({ formState, register, getValues, setValue }) => (
          <>
            <div className="w-full h-auto flex justify-center items-center">
              <div className="overflow-hidden rounded-full w-1/4">
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
              </div>
            </div>
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

            <div className="flex flex-row justify-between mt-4">
              <Button type="button" className="opacity-50" onClick={logout}>
                Logout
              </Button>
              <Button type="submit" disabled={formState.isSubmitting}>
                Save
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};
