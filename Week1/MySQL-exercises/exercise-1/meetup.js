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
const dropDatabase = "DROP DATABASE IF EXISTS meetup";
const createDatabase = "CREATE DATABASE IF NOT EXISTS meetup";
const useDatabase = "USE meetup";

// Create tables
const createInviteeTable = `CREATE TABLE IF NOT EXISTS Invitee(
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(255) NOT NULL,
    invited_by VARCHAR(255)
)`;

const createRoomTable = `CREATE TABLE IF NOT EXISTS Room(
    room_no INT PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    floor_number INT NOT NULL
)`;

const createMeetingTable = `CREATE TABLE IF NOT EXISTS Meeting(
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT NOT NULL,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
)`;

// Insert Data for Invitee, Room and Meeting tables
const insertInviteeData = [
  'INSERT INTO Invitee (invitee_name, invited_by) VALUES ("Name1", "Inviter1")',
  'INSERT INTO Invitee (invitee_name, invited_by) VALUES ("Name2", "Inviter2")',
  'INSERT INTO Invitee (invitee_name, invited_by) VALUES ("Name3", "Inviter3")',
  'INSERT INTO Invitee (invitee_name, invited_by) VALUES ("Name4", "Inviter4")',
  'INSERT INTO Invitee (invitee_name) VALUES ("Name5")',
];

const insertRoomData = [
  'INSERT INTO Room (room_no, room_name, floor_number) VALUES (101, "Room101", 1)',
  'INSERT INTO Room (room_no, room_name, floor_number) VALUES (102, "Room102", 1)',
  'INSERT INTO Room (room_no, room_name, floor_number) VALUES (103, "Room103", 1)',
  'INSERT INTO Room (room_no, room_name, floor_number) VALUES (201, "Room201", 2)',
  'INSERT INTO Room (room_no, room_name, floor_number) VALUES (202, "Room202", 2)',
];

const insertMeetingData = [
  'INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ("Meeting1", NOW(), NOW(), 101)',
  'INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ("Meeting2", NOW(), NOW(), 102)',
  'INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ("Meeting3", NOW(), NOW(), 103)',
  'INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ("Meeting4", NOW(), NOW(), 201)',
  'INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ("Meeting5", NOW(), NOW(), 202)',
];

// Insert Data Queries
const insertData = [
  ...insertInviteeData,
  ...insertRoomData,
  ...insertMeetingData,
];

// Meetup Queries Array
const meetupQueries = [
  dropDatabase,
  createDatabase,
  useDatabase,
  createInviteeTable,
  createRoomTable,
  createMeetingTable,
  ...insertData,
];

// Execute queries
meetupQueries.forEach((currentQuery) => {
  connection.query(currentQuery, (err) => {
    if (err) {
      console.log("Oops! Something went wrong.", err);
    } else {
      console.log("Query Success!");
    }
  });
});

// End the database connection
connection.end((err) => {
  if (err) throw err;
  console.log("Connection ended.");
});
