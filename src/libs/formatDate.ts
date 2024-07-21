const formatDateByCountry = (
  date: Date,
  locale: Intl.LocalesArgument = 'ko-KR',
) =>
  new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

export { formatDateByCountry };
