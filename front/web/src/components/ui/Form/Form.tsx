import React from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  DefaultValues,
  Resolver,
  UseFormSetError,
} from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  onSubmit: (dados: T, setError: UseFormSetError<T>) => Promise<void> | void;
  // onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  resolver?: Resolver<T>;
  defaultValues?: DefaultValues<T>;
  className?: string;
}

export function Form<T extends FieldValues>({
  onSubmit,
  children,
  resolver,
  defaultValues,
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    resolver,
  });

  const handleSubmitWrapper = async (dados: T) => {
    await onSubmit(dados, methods.setError);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitWrapper)}>
        {children}
      </form>
    </FormProvider>
  );
}
