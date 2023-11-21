USE authors_researchPapers;

-- Query 1: All research papers and the number of authors that wrote that paper
    -- SELECT rp.paper_title, COUNT(rp.author_id) AS author_count
    -- FROM research_Papers rp
    -- GROUP BY rp.paper_id;

-- Query 2: Sum of the research papers published by all female authors
    SELECT COUNT(rp.paper_id) AS total_papers
    FROM researchPapers rp
    JOIN authors a ON rp.author_id = a.author_id
    WHERE a.gender = 'female';

-- Query 3: Average h-index of all authors per university
    SELECT a.university, AVG(a.h_index) AS avg_h_index
    FROM authors a
    GROUP BY a.university;

-- Query 4: Sum of the research papers of the authors per university
    SELECT a.university, COUNT(rp.paper_id) AS total_papers
    FROM authors a
    LEFT JOIN researchPapers rp ON a.author_id = rp.author_id
    GROUP BY a.university;

-- Query 5: Minimum and maximum h-index of all authors per university
    SELECT a.university, MIN(a.h_index) AS min_h_index, MAX(a.h_index) AS max_h_index
    FROM authors a
    GROUP BY a.university;