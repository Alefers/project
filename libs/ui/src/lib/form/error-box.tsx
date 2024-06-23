import type { FC } from 'react';


interface ErrorBoxProps {
  errors: string | string[];
}

export const ErrorBox: FC<ErrorBoxProps> = (
  {
    errors,
  }
) => {
  return (
    <div className="error-box">
      {typeof errors === 'string' ? (
        <p>{errors}</p>
      ) : errors.map((error, eIdx) => (
        <p key={eIdx}>
          {error}
        </p>
      ))}
    </div>
  );
};
