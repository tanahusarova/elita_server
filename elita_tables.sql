CREATE TABLE users(
	user_id INT GENERATED ALWAYS AS IDENTITY,
	nickname VARCHAR(20),
	mail VARCHAR(50),
	password VARCHAR(50),
    PRIMARY KEY(user_id)
	);

CREATE TABLE properties(
	poperty_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(20),
    PRIMARY KEY(property_id)
	);

CREATE TABLE types(
	type_id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(20),
	property_id INT,
    PRIMARY KEY(type_id),
    CONSTRAINT fk_property
       FOREIGN KEY(property_id) 
 	      REFERENCES properties(property_id)
		  ON UPDATE CASCADE ON DELETE SET NULL
	);

CREATE TABLE events(
	event_id INT GENERATED ALWAYS AS IDENTITY,
	type_id INT,
	name VARCHAR(50),
	from_time VARCHAR(30),
	to_time VARCHAR(30),
	date_time DATE;
	colour INT
    PRIMARY KEY(event_id),
    CONSTRAINT fk_type
       FOREIGN KEY(type_id) 
 	   		REFERENCES types(type_id)
			ON UPDATE CASCADE ON DELETE SET NULL
	
	);

CREATE TABLE observers(
	event_id INT,
	user_id INT,
	visible BOOLEAN,
    CONSTRAINT fk_event
       FOREIGN KEY(event_id) 
 	   		REFERENCES events(event_id)
			ON DELETE CASCADE,
    CONSTRAINT fk_user
       FOREIGN KEY(user_id) 
 	   		REFERENCES users(user_id)
			ON DELETE CASCADE
	
	);


CREATE TABLE participants(
	event_id INT,
	user_id INT,
    CONSTRAINT fk_event
       FOREIGN KEY(event_id) 
 	   		REFERENCES events(event_id)
			ON DELETE CASCADE,
    CONSTRAINT fk_user
       FOREIGN KEY(user_id) 
 	   		REFERENCES users(user_id)
			ON DELETE CASCADE
	);

CREATE TABLE comments(
    comment VARCHAR(80),
	event_id INT,
	user_id INT,
    CONSTRAINT fk_event
       FOREIGN KEY(event_id) 
 	   		REFERENCES events(event_id)
			ON DELETE CASCADE,
    CONSTRAINT fk_user
       FOREIGN KEY(user_id) 
 	   		REFERENCES users(user_id)
			ON DELETE CASCADE
	);
