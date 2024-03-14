export enum CreateFormFields {
  Name = 'name',
  Rounds = 'rounds',
}

export type CreateFormValue = {
  [CreateFormFields.Name]: string;
  [CreateFormFields.Rounds]: number;
};
