import { useId } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  options: string[]
};

export default function AutoCompleteInput({ options, ...rest }: Props) {
  const id = useId();
  return (
    <>
      <input list={id} {...rest} className={"border px-3 py-2 rounded w-full " + (rest.className ?? '')} />
      <datalist id={id}>
        {options.map(o => <option key={o} value={o} />)}
      </datalist>
    </>
  );
}
