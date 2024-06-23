import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react';
import type {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  ForwardedRef,
} from 'react';
import clsx from 'clsx';


export interface CodeInputForward {
  resetCode: () => void
}

interface CodeInputProps {
  charRegex?: RegExp;
  codeLength?: number;
  dataTest?: string;
  disabled?: boolean;
  onCodeEntered: (code: string) => void;
}

const CodeInput = forwardRef(({
  charRegex,
  codeLength = 6,
  dataTest,
  disabled,
  onCodeEntered,
}: CodeInputProps, ref: ForwardedRef<CodeInputForward>) => {
  const [code, setCode] = useState<string[]>(new Array(codeLength).fill(''));

  useImperativeHandle(ref, () => ({
    resetCode() {
      setCode(new Array(codeLength).fill(''));
    }
  }), []);

  const inputRef = useRef<HTMLInputElement[] | null[]>(
    new Array(codeLength).fill(null)
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value;
    if (val.length > 0 && (charRegex || /[0-9]/).test(val)) {
      code[idx] = val;
      setCode([...code]);
      inputRef.current[idx + 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData ? e.clipboardData.getData('Text') : ''
    if (clipboardData.length === codeLength) {
      const data = clipboardData.split('');
      setCode(data);
    }
  };

  const onBackspace = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      code[idx] = '';
      setCode([...code]);
      const prevInput = inputRef.current[idx - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  useEffect(() => {
    const codeString = code.join('');
    if (codeString.length === codeLength && !disabled) {
      onCodeEntered(codeString);
    }
  }, [code, disabled]);

  return (
    <div
      className={clsx(
        'code-input',
        disabled && 'code-input--disabled'
      )}
      data-test={dataTest}
    >
      {code.map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputRef.current[idx] = el)}
          maxLength={1}
          value={code[idx]}
          autoFocus={idx === 0}
          onChange={(e) => onChange(e, idx)}
          onPaste={onPaste}
          onKeyDown={(e) => onBackspace(e, idx)}
        />
      ))}
    </div>
  );
});

const _CodeInput = memo(CodeInput);

export {
  _CodeInput as CodeInput,
};
