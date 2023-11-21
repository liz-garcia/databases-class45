USE authors_researchPapers;

-- Query 1: Print names of all authors and their corresponding mentors
SELECT
  a.author_name AS 'Author Name',
  m.author_name AS 'Mentor Name'
FROM
  authors AS a
LEFT JOIN
  authors AS m ON a.mentor = m.author_id;

-- Query 2: Print all columns of authors and their published paper_title
SELECT
  a.*,
  rp.paper_title
FROM
  authors AS a
LEFT JOIN
  researchPapers AS rp ON a.author_id = rp.author_id;

