INSERT INTO folders (folder_name)
VALUES
('Made Up Words'), 
('Folder Names'), 
('Name of Folder'); 

INSERT INTO notes (id, note_name, content, modified, folder)
VALUES 
(1, 'dis is a note', 'lorem ipsum, yadda yadda', now(), 1 ),
(2,'dis is a note', 'lorem ipsum, words, words', now(), 2 ),
(3,'dis is a note', 'lorem ipsum, some more words here', now(), 3);


