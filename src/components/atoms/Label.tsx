export type LabelProps = {
  htmlFor: string;
  text: string;
};

export default function Label(props: LabelProps) {
  const { htmlFor, text } = props;
  return (
    <label className="" htmlFor={htmlFor}>
      {text}
    </label>
  );
}
