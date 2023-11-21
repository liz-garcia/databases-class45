USE authors_researchPapers;

-- Create researchPapers table
CREATE TABLE researchPapers (
  paper_id INT PRIMARY KEY AUTO_INCREMENT,
  paper_title VARCHAR(255),
  conference VARCHAR(255),
  publish_date DATE
);

-- Add the author_id column
ALTER TABLE researchPapers
ADD COLUMN author_id INT;

-- Add foreign key constraint
ALTER TABLE researchPapers
ADD CONSTRAINT fk_author_id
FOREIGN KEY (author_id)
REFERENCES authors(author_id);

-- Alter tables to prepare for join operations
-- and aggregate functions queries
ALTER TABLE authors
ADD COLUMN paper_id INT;

ALTER TABLE authors
ADD CONSTRAINT fk_paper_id
FOREIGN KEY (paper_id)
REFERENCES researchPapers(paper_id);

-- Junction table for the many-to-many relationship
CREATE TABLE author_paper (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES researchPapers(paper_id)
);

ALTER TABLE researchPapers
ADD COLUMN number_of_authors INT;


