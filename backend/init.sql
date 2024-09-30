CREATE DATABASE wedding;
CREATE TABLE visitor (
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    visitor_fname VARCHAR(20),
    visitor_lname VARCHAR(20),
    partner_fname VARCHAR(20),
    partner_lname VARCHAR(20),
    engaged_date DATE,
    wed_date DATE,
    wed_venue VARCHAR(30),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);
CREATE TABLE vendor (
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    busname VARCHAR(50) NOT NULL,
    phone bigint NOT NULL,
    category VARCHAR(20) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);
CREATE TABLE portfolio (
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    about VARCHAR(200) NOT NULL,
    pfp VARCHAR(40) NOT NULL,
    experience VARCHAR(50),
    website VARCHAR(40),
    instagram VARCHAR(40),
    facebook VARCHAR(40),
    twitter VARCHAR(40),
    tiktok VARCHAR(40),
    business_phone bigint NOT NULL,
    business_email VARCHAR(20) NOT NULL,
    CONSTRAINT FK_pid FOREIGN KEY (id) REFERENCES vendor(id),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);
CREATE TABLE review (
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    visitor_id VARCHAR(20) NOT NULL,
    vendor_id VARCHAR(20) NOT NULL,
    review_text VARCHAR(500),
    rating int NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT FK_visitorid FOREIGN KEY (visitor_id) REFERENCES visitor(ID),
    CONSTRAINT FK_vendorid FOREIGN KEY (vendor_id) REFERENCES vendor(ID)
);
INSERT INTO vendor (
        id,
        email,
        password,
        fname,
        lname,
        busname,
        phone,
        category,
        created_at,
        updated_at
    )
VALUES (
        '1',
        'vendor1@example.com',
        'password123',
        'Vendor',
        'One',
        'Business One',
        1234567890,
        'Photography',
        '2021-01-01',
        '2021-01-01'
    ),
    (
        '2',
        'vendor2@example.com',
        'password123',
        'Vendor',
        'Two',
        'Business Two',
        2345678901,
        'Jewelry',
        '2022-02-02',
        '2022-02-02'
    ),
    (
        '3',
        'vendor3@example.com',
        'password123',
        'Vendor',
        'Three',
        'Business Three',
        3456789012,
        'Florist',
        '2023-03-03',
        '2023-03-03'
    ),
    (
        '4',
        'vendor4@example.com',
        'password123',
        'Vendor',
        'Four',
        'Business Four',
        4567890123,
        'DJ',
        '2024-04-04',
        '2024-04-04'
    ),
    (
        '5',
        'vendor5@example.com',
        'password123',
        'Vendor',
        'Five',
        'Business Five',
        5678901234,
        'Venue',
        '2021-05-05',
        '2021-05-05'
    ),
    (
        '6',
        'vendor6@example.com',
        'password123',
        'Vendor',
        'Six',
        'Business Six',
        6789012345,
        'Photography',
        '2022-06-06',
        '2022-06-06'
    ),
    (
        '7',
        'vendor7@example.com',
        'password123',
        'Vendor',
        'Seven',
        'Business Seven',
        7890123456,
        'Wedding Cake',
        '2023-07-07',
        '2023-07-07'
    ),
    (
        '8',
        'vendor8@example.com',
        'password123',
        'Vendor',
        'Eight',
        'Business Eight',
        8901234567,
        'Florist',
        '2024-08-08',
        '2024-08-08'
    ),
    (
        '9',
        'vendor9@example.com',
        'password123',
        'Vendor',
        'Nine',
        'Business Nine',
        9012345678,
        'DJ',
        '2021-09-09',
        '2021-09-09'
    ),
    (
        '10',
        'vendor10@example.com',
        'password123',
        'Vendor',
        'Ten',
        'Business Ten',
        1234567890,
        'Venue',
        '2022-10-10',
        '2022-10-10'
    );
INSERT INTO location (id, address, city, latitude, longitude)
VALUES (
        '1',
        '123 Main Street',
        'Colombo',
        '6.927079',
        '79.861244'
    ),
    (
        '2',
        '456 Second Street',
        'Kurunegala',
        '7.486847',
        '80.362698'
    ),
    (
        '3',
        '789 Third Street',
        'Kandy',
        '7.290572',
        '80.633726'
    ),
    (
        '4',
        '101 Fourth Street',
        'Gampaha',
        '7.091456',
        '80.014367'
    ),
    (
        '5',
        '202 Fifth Street',
        'Colombo',
        '6.927079',
        '79.861244'
    ),
    (
        '6',
        '303 Sixth Street',
        'Kurunegala',
        '7.486847',
        '80.362698'
    ),
    (
        '7',
        '404 Seventh Street',
        'Kegalle',
        '7.250000',
        '80.350000'
    ),
    (
        '8',
        '505 Eighth Street',
        'Kegalle',
        '7.250000',
        '80.350000'
    ),
    (
        '9',
        '606 Ninth Street',
        'Kandy',
        '7.290572',
        '80.633726'
    ),
    (
        '10',
        '707 Tenth Street',
        'Colombo',
        '6.927079',
        '79.861244'
    );