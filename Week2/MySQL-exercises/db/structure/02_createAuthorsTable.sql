USE authors_researchPapers;

-- Create authors table
CREATE TABLE authors (
  author_id INT PRIMARY KEY,
  author_name VARCHAR(255),
  university VARCHAR(255),
  date_of_birth DATE,
  h_index INT,
  gender VARCHAR(10)
);

-- Add the mentor column
ALTER TABLE authors
ADD COLUMN mentor INT;

-- Add foreign key constraint
ALTER TABLE authors
ADD CONSTRAINT fk_mentor
FOREIGN KEY (mentor)
REFERENCES authors(author_id);
