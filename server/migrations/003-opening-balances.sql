CREATE TABLE opening_balances (
 id text PRIMARY KEY,
 owner text NOT NULL REFERENCES accounts(id),
 tenancy_id text NOT NULL REFERENCES tenancies(id),
 amount integer NOT NULL CHECK(amount <> 0 AND amount BETWEEN -100000000 AND 100000000),
 as_on date NOT NULL CHECK(extract(day from as_on)=1),
 reason text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 void_reason text,
 voided_at timestamptz,
 CHECK((void_reason IS NULL) = (voided_at IS NULL))
);
CREATE UNIQUE INDEX one_active_opening_balance ON opening_balances(tenancy_id) WHERE voided_at IS NULL;
