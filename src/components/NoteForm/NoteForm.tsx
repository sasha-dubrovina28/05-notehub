import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FormikHelpers } from 'formik';

import type { NoteTag } from '../../types/note';
import { createNote } from '../../services/noteService';

import css from './NoteForm.module.css';

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onCancel: () => void;
}

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required(),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel(); // ✅ close modal after success
    },
  });

  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const handleSubmit = async (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    await createMutation.mutateAsync(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={css.form}>
          <Field name="title" placeholder="Title" />
          <ErrorMessage name="title" component="span" />

          <Field as="textarea" name="content" />

          <Field as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>

          <div className={css.actions}>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}