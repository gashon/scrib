import { FC, useCallback, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Button, Form, InputField } from '@scrib/ui';
import {
  LoginFormData,
  LoginFormSchema,
  emailLogin,
  getUser,
  signOut,
} from '@scrib/web/features/auth';
import { useRouter } from 'next/router';
import * as z from 'zod';

export enum SentStatus {
  NotSent,
  Sent,
  Error,
}

export const EmailLogin: FC = () => {
  const router = useRouter();
  const [sentStatus, setSentStatus] = useState<SentStatus>(SentStatus.NotSent);

  const onMagicLinkLogin = useCallback(
    async (values: z.infer<typeof LoginFormSchema>) => {
      return emailLogin({ email: values.email }, router.query);
    },
    [router.query],
  );

  const onEmailLogin = useCallback(
    async (values: z.infer<typeof LoginFormSchema>) => {
      const { status } = await onMagicLinkLogin(values);
      if (status !== 200) setSentStatus(SentStatus.Error);
      else setSentStatus(SentStatus.Sent);
    },
    [router.query, setSentStatus],
  );

  return (
    <>
      <Form<LoginFormData, typeof LoginFormSchema>
        schema={LoginFormSchema}
        onSubmit={onEmailLogin}
        className="align-center flex w-full flex-col justify-center"
      >
        {({ formState, register, getValues }) => (
          <>
            {sentStatus === SentStatus.Sent && (
              <p className="mt-3">
                We&apos;ve sent you a temporary login link. Please check your{' '}
                <span className="underline">
                  <a href={`mailto:${getValues().email}`}>email</a>
                </span>{' '}
                to log in.
              </p>
            )}
            <div
              className="mt-5 inline-flex w-full text-left"
              style={{ marginBottom: -5 }}
            >
              <InputField
                type="email"
                label="Email Address"
                error={formState.errors['email']}
                registration={register('email')}
                disabled={sentStatus === SentStatus.Sent}
              />
            </div>
            {sentStatus !== SentStatus.Sent && (
              <Button
                type="submit"
                variant="primary"
                loading={formState.isSubmitting}
                icon={<FiArrowRight strokeWidth={3} />}
              >
                Continue
              </Button>
            )}
          </>
        )}
      </Form>
    </>
  );
};
