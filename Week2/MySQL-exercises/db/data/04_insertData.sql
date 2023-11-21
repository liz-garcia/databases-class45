USE authors_researchPapers;

-- Insert 7 male authors
INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
VALUES
('Male Author 1', 'University A', '1990-05-15', 0, 'male'),
('Male Author 2', 'University B', '1985-02-28', 1, 'male'),
('Male Author 3', 'University C', '1992-11-10', 1, 'male'),
('Male Author 4', 'University D', '1988-08-21', 1, 'male'),
('Male Author 5', 'University E', '1995-04-03', 1, 'male'),
('Male Author 6', 'University F', '1987-09-18', 2, 'male'),
('Male Author 7', 'University G', '1993-07-02', 3, 'male');

-- Insert 5 female authors
INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
VALUES
('Female Author 1', 'University A', '1991-08-25', 3, 'female'),
('Female Author 2', 'University B', '1986-03-14', 2, 'female'),
('Female Author 3', 'University C', '1993-12-05', 1, 'female'),
('Female Author 4', 'University D', '1989-10-17', 1, 'female'),
('Female Author 5', 'University E', '1996-05-01', 1, 'female');

-- Insert 3 extra authors
INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
VALUES
('Male Author 8', 'University A', '1990-05-15', 1, 'male', 7),
('Male Author 9', 'University B', '1985-02-28', 1, 'male', 8),
('Female Author 10', 'University C', '1992-11-10', 1, 'female', 9);

-- Insert all research papers
-- Research Papers with 1 author
INSERT INTO researchPapers (paper_title, conference, publish_date, number_of_authors)
VALUES
('Paper 1', 'Conference A', '2022-01-10', 2),
('Paper 2', 'Conference B', '2022-02-15', 3),
('Paper 3', 'Conference C', '2022-03-20', 3),
('Paper 4', 'Conference C', '2022-03-20', 1),
('Paper 5', 'Conference A', '2022-03-20', 1),
('Paper 6', 'Conference C', '2022-03-20', 1),
('Paper 7', 'Conference C', '2022-03-20', 1),
('Paper 8', 'Conference A', '2022-03-20', 1),
('Paper 9', 'Conference A', '2022-03-20', 1),
('Paper 10', 'Conference A', '2022-03-20', 1),
('Paper 11', 'Conference C', '2022-03-20', 1),
('Paper 12', 'Conference D', '2022-03-20', 1),
('Paper 13', 'Conference D', '2022-03-20', 1),
('Paper 14', 'Conference C', '2022-03-20', 1),
('Paper 15', 'Conference C', '2022-03-20', 1);

-- Inserting data into the junction table
INSERT INTO author_paper (paper_id, author_id) VALUES
(1, 7),
(1, 8),
(2, 6),
(2, 7),
(2, 8),
(3, 7),
(3, 8),
(3, 9),
(4, 6),
(5, 9),
(6, 2),
(7, 3),
(8, 4),
(9, 5),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15);
