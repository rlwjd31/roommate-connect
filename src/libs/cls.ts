type PropsType = string | undefined | null | boolean;

const isTruthyValue = (value: PropsType): boolean => !!value;

const cls = (...classNames: PropsType[]) => {
  const filteredTruthyValue = classNames.filter(isTruthyValue);

  // remove tailwind duplicated value
  return [...new Set(filteredTruthyValue)].join(' ');
};

export default cls;
