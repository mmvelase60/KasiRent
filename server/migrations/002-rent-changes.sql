CREATE TABLE rent_changes (
  id text PRIMARY KEY,
  owner text NOT NULL REFERENCES accounts(id),
  tenancy_id text NOT NULL REFERENCES tenancies(id),
  effective_month text NOT NULL CHECK(effective_month ~ '^[0-9]{4}-(0[1-9]|1[0-2])$' AND effective_month >= '1900-01'),
  amount integer NOT NULL CHECK(amount > 0 AND amount <= 100000000),
  reason text NOT NULL CHECK(length(trim(reason)) BETWEEN 1 AND 200),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(tenancy_id,effective_month)
);
