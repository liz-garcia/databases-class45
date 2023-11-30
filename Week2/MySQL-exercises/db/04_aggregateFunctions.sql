USE authors_researchPapers;

-- All research papers and the number of authors that wrote that paper
SELECT
  rp.paper_id,
  rp.paper_title,
  COUNT(ap.author_id) AS number_of_authors
FROM
  researchPapers AS rp
LEFT JOIN
  author_paper AS ap ON rp.paper_id = ap.paper_id
GROUP BY
  rp.paper_id;



-- Sum of the research papers published by all female authors
SELECT
    COUNT(DISTINCT rp.paper_id) AS num_papers
FROM
    researchPapers rp
JOIN
    author_paper ap ON rp.paper_id = ap.paper_id
JOIN
    authors a ON ap.author_id = a.author_id
WHERE
    a.gender = 'female';


-- Average h-index of all authors per university
SELECT
    university,
    AVG(h_index) AS avg_h_index
FROM
    authors
GROUP BY
    university;


-- Sum of the research papers of the authors per university
SELECT
    university,
    COUNT(DISTINCT rp.paper_id) AS num_papers
FROM
    authors a
LEFT JOIN
    author_paper ap ON a.author_id = ap.author_id
LEFT JOIN
    researchPapers rp ON ap.paper_id = rp.paper_id
GROUP BY
    university;


-- Minimum and maximum h-index of all authors per university
SELECT
    university,
    MIN(h_index) AS min_h_index,
    MAX(h_index) AS max_h_index
FROM
    authors
GROUP BY
    university;
