// Import 'mysql' package
import mysql from "mysql";

// Make a connection using login credentials
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.log("Connection error!", err);
  } else {
    console.log("Connection success!");
  }
});

// Create database 'meetup'
const dropDatabase = `DROP DATABASE IF EXISTS meetup;`;
const createDatabase = `CREATE DATABASE IF NOT EXISTS meetup;`;
const useDatabase = `USE meetup;`;

// Create tables
const createRoomTable = `CREATE TABLE IF NOT EXISTS Room(
  room_no INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(255) NOT NULL,
  floor_number INT NOT NULL
);
`;

const createMeetingTable = `CREATE TABLE IF NOT EXISTS Meeting(
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT NOT NULL,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  );
`;

const createInviteeTable = `CREATE TABLE IF NOT EXISTS Invitee(
  invitee_no INT AUTO_INCREMENT PRIMARY KEY,
  invitee_name VARCHAR(255) NOT NULL,
  invited_by VARCHAR(255),
  meeting_no INT,
  FOREIGN KEY (meeting_no) REFERENCES Meeting(meeting_no)
);
`;

// Insert Data for Invitee, Room and Meeting tables
const insertRoomData = `
  INSERT INTO Room (room_name, floor_number)
  VALUES ("Room1", 1), ("Room2", 1), ("Room3", 1), ("Room4", 2), ("Room5", 2);
`;

const insertMeetingData = `
  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
  VALUES ("Meeting1", NOW(), NOW(), 1), ("Meeting2", NOW(), NOW(), 2), ("Meeting3", NOW(), NOW(), 3), ("Meeting4", NOW(), NOW(), 4), ("Meeting5", NOW(), NOW(), 5);
  `;

const insertInviteeData = `
  INSERT INTO Invitee (invitee_name, invited_by, meeting_no) VALUES ("Name1", "Inviter1", 1),("Name2", "Inviter2", 2),("Name3", "Inviter3", 3), ("Name4", "Inviter4", 4),("Name5", NULL, 5);
`;

// Insert Data Queries
const insertData = [insertRoomData, insertMeetingData, insertInviteeData];

// Meetup Queries Array
const meetupQueries = [
  dropDatabase,
  createDatabase,
  useDatabase,
  createRoomTable,
  createMeetingTable,
  createInviteeTable,
  ...insertData,
];

// Execute queries
meetupQueries.forEach((currentQuery, index) => {
  connection.query(currentQuery, (err) => {
    if (err) {
      console.log("Oops! Something went wrong.", err);
      return;
    } else {
      console.log(`Query ${index + 1} Success!`);
    }
  });
});

// Show final results
const showResults =
  `SELECT
    Invitee.invitee_no,
    Invitee.invitee_name,
    Invitee.invited_by,
    Meeting.meeting_no,
    Room.room_no
  FROM Invitee
  LEFT JOIN Meeting ON Invitee.meeting_no = Meeting.meeting_no
  LEFT JOIN Room ON Meeting.room_no = Room.room_no`;

connection.query(showResults, (err, results) => {
  if (err) {
    console.log("Oops! Something went wrong.", err);
  } else {
    console.log("Results:");
    console.table(results);
  }
});

// End the database connection
connection.end((err) => {
  if (err) throw err;
  console.log("Connection ended.");
});
