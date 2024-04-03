type SignUpType = {
  type: number | undefined;
  rental_type: number | undefined;
  regions: string[];
  term: [number, number];
  deposit_price: [number, number];
  monthly_price: [number, number];
  smoking: false | undefined;
  pet: number | undefined;
  appeals: string[];
  gender: number | undefined;
  mates_number: number | undefined;
  mate_appeals: string[];
};
