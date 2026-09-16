import React from 'react';
import {
  FormProvider,
  FieldValues,
  UseFormSetError,
  UseFormReturn,
} from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit: (dados: T, setError: UseFormSetError<T>) => Promise<void> | void;
  // onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}

export function Form<T extends FieldValues>({
  methods,
  onSubmit,
  children,
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((dados) =>
          onSubmit(dados, methods.setError),
        )}
      >
        {children}
      </form>
    </FormProvider>
  );
}
